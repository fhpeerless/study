import re
import os
import json
import argparse
from datetime import datetime

def load_config(config_path):
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_js_notes(js_file_path):
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    notes = []
    
    pattern = r'export\s+const\s+(\w+)\s*=\s*\{[\s\S]*?title:\s*["\']([^"\']+)["\'][\s\S]*?contentmd:\s*`([\s\S]*?)`\s*,?\s*timestamp:'
    matches = re.findall(pattern, content)
    
    for match in matches:
        var_name, title, contentmd = match
        notes.append({
            'var_name': var_name,
            'title': title,
            'content': contentmd.strip()
        })
    
    return notes

MAX_CONTENT_LINES = 12

def parse_markdown_to_slides(markdown_content, title):
    slides = []
    
    lines = markdown_content.split('\n')
    current_slide = {'title': '', 'content': [], 'type': 'content'}
    current_h2 = ''
    current_h3 = ''
    
    for line in lines:
        stripped = line.strip()
        
        if stripped.startswith('# ') and not stripped.startswith('## '):
            if current_slide['content'] or current_slide['title']:
                for split_slide in split_slide_by_length(current_slide):
                    slides.append(split_slide)
            current_slide = {'title': stripped[2:], 'content': [], 'type': 'section'}
            
        elif stripped.startswith('## '):
            if current_slide['content'] or current_slide['title']:
                for split_slide in split_slide_by_length(current_slide):
                    slides.append(split_slide)
            current_slide = {'title': stripped[3:], 'content': [], 'type': 'subsection', 'parent': current_h2}
            current_h2 = stripped[3:]
            
        elif stripped.startswith('### '):
            if current_slide['content'] or current_slide['title']:
                for split_slide in split_slide_by_length(current_slide):
                    slides.append(split_slide)
            current_slide = {'title': stripped[4:], 'content': [], 'type': 'subsubsection', 'parent': current_h2}
            current_h3 = stripped[4:]
            
        elif stripped.startswith('---'):
            if current_slide['content'] or current_slide['title']:
                for split_slide in split_slide_by_length(current_slide):
                    slides.append(split_slide)
            current_slide = {'title': '', 'content': [], 'type': 'content'}
            
        else:
            current_slide['content'].append(line)
    
    if current_slide['content'] or current_slide['title']:
        for split_slide in split_slide_by_length(current_slide):
            slides.append(split_slide)
    
    return slides

def split_slide_by_length(slide):
    content = slide['content']
    if len(content) <= MAX_CONTENT_LINES:
        return [slide]
    
    result = []
    title = slide['title']
    slide_type = slide['type']
    
    chunks = []
    current_chunk = []
    
    in_table = False
    table_lines = []
    in_blockquote = False
    blockquote_lines = []
    
    for line in content:
        stripped = line.strip()
        
        if stripped.startswith('|') and '|' in stripped[1:]:
            if not in_table:
                in_table = True
                table_lines = []
            table_lines.append(line)
        else:
            if in_table:
                if len(current_chunk) + len(table_lines) > MAX_CONTENT_LINES and current_chunk:
                    chunks.append(current_chunk)
                    current_chunk = []
                current_chunk.extend(table_lines)
                table_lines = []
                in_table = False
            
            if stripped.startswith('>'):
                if not in_blockquote:
                    in_blockquote = True
                    blockquote_lines = []
                blockquote_lines.append(line)
            else:
                if in_blockquote:
                    if len(current_chunk) + len(blockquote_lines) > MAX_CONTENT_LINES and current_chunk:
                        chunks.append(current_chunk)
                        current_chunk = []
                    current_chunk.extend(blockquote_lines)
                    blockquote_lines = []
                    in_blockquote = False
                
                if stripped:
                    if len(current_chunk) >= MAX_CONTENT_LINES:
                        chunks.append(current_chunk)
                        current_chunk = []
                    current_chunk.append(line)
    
    if table_lines:
        current_chunk.extend(table_lines)
    if blockquote_lines:
        current_chunk.extend(blockquote_lines)
    if current_chunk:
        chunks.append(current_chunk)
    
    for i, chunk in enumerate(chunks):
        new_slide = {
            'title': title if i == 0 else '',
            'content': chunk,
            'type': slide_type
        }
        if i > 0:
            new_slide['continued'] = True
        result.append(new_slide)
    
    return result

def format_content(lines):
    result = []
    in_table = False
    table_lines = []
    in_blockquote = False
    blockquote_lines = []
    
    for line in lines:
        stripped = line.strip()
        
        if stripped.startswith('|') and '|' in stripped[1:]:
            if not in_table:
                in_table = True
                table_lines = []
            table_lines.append(stripped)
        else:
            if in_table:
                result.append(format_table(table_lines))
                table_lines = []
                in_table = False
            
            if stripped.startswith('>'):
                if not in_blockquote:
                    in_blockquote = True
                    blockquote_lines = []
                blockquote_lines.append(stripped[1:].strip())
            else:
                if in_blockquote:
                    result.append(format_blockquote(blockquote_lines))
                    blockquote_lines = []
                    in_blockquote = False
                
                if stripped:
                    result.append(format_line(stripped))
    
    if in_table:
        result.append(format_table(table_lines))
    if in_blockquote:
        result.append(format_blockquote(blockquote_lines))
    
    return '\n'.join(result)

def format_table(lines):
    if len(lines) < 2:
        return ''
    
    html = ['<table class="small-table">']
    
    for i, line in enumerate(lines):
        cells = [c.strip() for c in line.split('|')[1:-1]]
        if i == 0:
            html.append('<tr>' + ''.join(f'<th>{process_inline(c)}</th>' for c in cells) + '</tr>')
        elif not all(c.replace('-', '').replace(':', '') == '' for c in cells):
            html.append('<tr>' + ''.join(f'<td>{process_inline(c)}</td>' for c in cells) + '</tr>')
    
    html.append('</table>')
    return '\n'.join(html)

def format_blockquote(lines):
    content = '<br>'.join(process_inline(line) for line in lines if line)
    return f'<div class="example-box">{content}</div>'

def format_line(line):
    if line.startswith('- ') or line.startswith('* '):
        content = process_inline(line[2:])
        return f'<li>{content}</li>'
    elif re.match(r'^\d+\.\s', line):
        content = process_inline(re.sub(r'^\d+\.\s', '', line))
        return f'<li>{content}</li>'
    elif line.startswith('**') and line.endswith('**'):
        content = process_inline(line[2:-2])
        return f'<div class="key-point"><strong>{content}</strong></div>'
    else:
        content = process_inline(line)
        if content:
            return f'<p>{content}</p>'
        return ''

def process_inline(text):
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\$\$(.+?)\$\$', r'\\[\1\\]', text, flags=re.DOTALL)
    text = re.sub(r'\$(.+?)\$', r'\\(\1\\)', text, flags=re.DOTALL)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    text = text.replace('\\\\', '\\')
    return text

def generate_ppt_html(notes, output_path, title_prefix="资料分析知识点", style=None):
    if style is None:
        style = {
            'theme': 'black',
            'width': 1200,
            'height': 700,
            'transition': 'slide',
            'background_transition': 'fade'
        }
    
    slides_html = []
    
    slides_html.append('''
            <section class="title-slide">
                <section>
                    <h1>''' + title_prefix + '''</h1>
                    <p>公务员考试 · 行测专项</p>
                    <p style="margin-top: 40px; color: #4dabf5;">study.xtwa.org</p>
                    <p style="margin-top: 30px; font-size: 0.8em; color: #7f8c8d;">按 ↓/→ 开始浏览笔记</p>
                </section>
                <section>
                    <h2>目录</h2>
                    <p style="font-size: 0.9em; color: #a0a0a0; margin-bottom: 20px;">按 ↓/→ 浏览 | 按 ↑/← 返回</p>
                    <ul>''')
    
    for i, note in enumerate(notes):
        slides_html.append(f'                        <li>{note["title"]}</li>')
    
    slides_html.append('''                    </ul>
                </section>
            </section>''')
    
    for note in notes:
        parsed_slides = parse_markdown_to_slides(note['content'], note['title'])
        
        note_slides = []
        
        note_slides.append(f'''
                <section class="section-title">
                    <h2>{note["title"]}</h2>
                    <p style="font-size: 0.8em; color: #a0a0a0; margin-top: 20px;">按 ↓ 查看详细内容</p>
                </section>''')
        
        for slide in parsed_slides:
            slide_content = format_content(slide['content'])
            continued_label = '<div class="continued-label">(续)</div>' if slide.get('continued') else ''
            
            if slide['type'] == 'section':
                note_slides.append(f'''
                <section>
                    {continued_label}
                    <h2>{slide["title"]}</h2>
                    {slide_content}
                </section>''')
            elif slide['type'] == 'subsection':
                note_slides.append(f'''
                <section>
                    {continued_label}
                    <h3>{slide["title"]}</h3>
                    {slide_content}
                </section>''')
            elif slide['type'] == 'subsubsection':
                note_slides.append(f'''
                <section>
                    {continued_label}
                    <h4>{slide["title"]}</h4>
                    {slide_content}
                </section>''')
            else:
                if slide['title']:
                    note_slides.append(f'''
                <section>
                    {continued_label}
                    <h3>{slide["title"]}</h3>
                    {slide_content}
                </section>''')
                elif slide_content.strip():
                    note_slides.append(f'''
                <section>
                    {continued_label}
                    {slide_content}
                </section>''')
        
        slides_html.append('''
            <section>''' + '\n'.join(note_slides) + '''
            </section>''')
    
    slides_html.append('''
            <section class="title-slide center-content">
                <section>
                    <h1>谢谢观看</h1>
                    <p style="margin-top: 40px;">祝您考试顺利上岸！</p>
                    <p style="color: #4dabf5;">study.xtwa.org</p>
                </section>
            </section>''')
    
    html_template = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>''' + title_prefix + ''' - PPT</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/''' + style.get('theme', 'black') + '''.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <style>
        *, *::before, *::after {
            box-sizing: border-box;
        }
        html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
        }
        .reveal {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            width: 100%;
            height: 100%;
        }
        .reveal .slides {
            width: 100%;
            height: 100%;
        }
        .reveal h1, .reveal h2, .reveal h3, .reveal h4 {
            color: #4dabf5;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            margin-top: 0;
            margin-bottom: 1vh;
            line-height: 1.2;
        }
        .reveal h1 { font-size: 3.5vh; margin-bottom: 1.5vh; }
        .reveal h2 { font-size: 2.8vh; color: #e74c3c; margin-bottom: 1vh; }
        .reveal h3 { font-size: 2.3vh; color: #2ecc71; margin-bottom: 0.8vh; }
        .reveal h4 { font-size: 2vh; color: #f39c12; margin-bottom: 0.6vh; }
        .reveal .slides section { 
            text-align: left; 
            height: 100%; 
            width: 100%;
            max-width: 100%;
            max-height: 100%;
            box-sizing: border-box;
            padding: 2.5vh 3vw;
            margin: 0;
            overflow: hidden;
        }
        .reveal .slides section > *:first-child { margin-top: 0; }
        .reveal .slides section > *:last-child { margin-bottom: 0; }
        .reveal .continued-label {
            font-size: 1.2vh;
            color: #7f8c8d;
            text-align: right;
            margin-bottom: 0.5vh;
            line-height: 1;
        }
        .reveal table {
            margin: 0.8vh 0;
            border-collapse: collapse;
            font-size: 1.5vh;
            width: auto;
            max-width: 95%;
            display: table;
        }
        .reveal th {
            background-color: #3498db;
            color: white;
            padding: 0.6vh 1vw;
            line-height: 1.3;
        }
        .reveal td {
            background-color: #2d2d44;
            padding: 0.5vh 0.8vw;
            border: 1px solid #3a3a56;
            line-height: 1.3;
        }
        .reveal tr:nth-child(even) td { background-color: #252540; }
        .reveal ul, .reveal ol { 
            margin-left: 2.5vw; 
            margin-top: 0.5vh; 
            margin-bottom: 0.5vh; 
            padding-left: 0;
        }
        .reveal li { 
            margin: 0.3vh 0; 
            color: #e0e0e0; 
            line-height: 1.3; 
            font-size: 1.8vh; 
        }
        .reveal strong { color: #e74c3c; }
        .reveal p { 
            margin: 0.5vh 0; 
            line-height: 1.4; 
            font-size: 1.8vh; 
        }
        .reveal .formula-box {
            background-color: #2d2d44;
            padding: 0.8vh 1.5vw;
            border-radius: 0.5vh;
            margin: 0.6vh 0;
            border-left: 0.3vw solid #3498db;
        }
        .reveal .key-point {
            background-color: #343458;
            padding: 0.6vh 1.2vw;
            border-radius: 0.4vh;
            margin: 0.5vh 0;
            border-left: 0.3vw solid #e74c3c;
            font-size: 1.7vh;
            line-height: 1.3;
        }
        .reveal .example-box {
            background-color: #1e3a1e;
            padding: 0.6vh 1.2vw;
            border-radius: 0.4vh;
            margin: 0.5vh 0;
            border-left: 0.3vw solid #2ecc71;
            font-size: 1.7vh;
            line-height: 1.3;
        }
        .reveal .title-slide h1 { font-size: 4vh; margin-bottom: 1.5vh; }
        .reveal .title-slide p { font-size: 2vh; color: #a0a0a0; margin: 0.5vh 0; line-height: 1.3; }
        .reveal .section-title { text-align: center; }
        .reveal .section-title h2 { font-size: 3.5vh; color: #4dabf5; }
        .reveal .formula { color: #4dabf5; font-family: serif; }
        .reveal .highlight { color: #f1c40f; font-weight: bold; }
        .reveal .small-table { font-size: 1.3vh; }
        .reveal .small-table th { padding: 0.4vh 0.6vw; }
        .reveal .small-table td { padding: 0.3vh 0.5vw; }
        .reveal .center-content { text-align: center; }
        .reveal code { 
            background-color: #343458; 
            padding: 0.2vh 0.5vw; 
            border-radius: 0.2vh; 
            font-size: 1.6vh; 
        }
        .reveal .katex { font-size: 1.8vh; line-height: 1.4; }
        .reveal .katex-display { 
            font-size: 2vh; 
            margin: 0.6vh 0; 
            overflow: hidden;
            max-width: 100%;
        }
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
''' + '\n'.join(slides_html) + '''
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            slideNumber: 'c/t',
            showSlideNumber: 'all',
            transition: 'slide',
            backgroundTransition: 'fade',
            width: ''' + str(style.get('width', 1200)) + ''',
            height: ''' + str(style.get('height', 700)) + ''',
            controls: true,
            controlsTutorial: true,
            controlsLayout: 'edges',
            controlsBackArrows: 'visible',
            overview: true,
            center: false,
            touch: true,
            loop: false,
            rtl: false,
            shuffle: false,
            fragments: true,
            embedded: false,
            help: true,
            showNotes: false,
            autoPlayMedia: null,
            autoSlide: 0,
            mouseWheel: true,
            hideInactiveCursor: true,
            hideCursorTime: 3000,
            navigationMode: 'default',
            keyboard: {
                'ArrowRight': function() { Reveal.right(); },
                'ArrowLeft': function() { Reveal.left(); },
                'ArrowDown': function() { Reveal.down(); },
                'ArrowUp': function() { Reveal.up(); },
                'Space': function() { Reveal.down(); },
                'Shift Space': function() { Reveal.up(); }
            }
        }).then(function() {
            var slides = document.querySelectorAll('.reveal .slides section');
            slides.forEach(function(slide) {
                renderMathInElement(slide, {
                    delimiters: [
                        {left: String.raw`\[`, right: String.raw`\]`, display: true},
                        {left: String.raw`\(`, right: String.raw`\)`, display: false}
                    ],
                    throwOnError: false
                });
            });
        });
        
        Reveal.on('slidechanged', function(event) {
            renderMathInElement(event.currentSlide, {
                delimiters: [
                    {left: String.raw`\[`, right: String.raw`\]`, display: true},
                    {left: String.raw`\(`, right: String.raw`\)`, display: false}
                ],
                throwOnError: false
            });
        });
    </script>
</body>
</html>'''
    
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    return output_path

def process_config(config_path):
    config = load_config(config_path)
    base_dir = os.path.dirname(config_path)
    project_root = base_dir

    results = []
    for task in config.get('ppt_tasks', []):
        input_path = os.path.normpath(os.path.join(project_root, task['input']))
        output_path = os.path.normpath(os.path.join(project_root, task['output']))
        title = task.get('title', '资料分析知识点')
        
        print(f'正在处理: {task["name"]}')
        print(f'  输入: {input_path}')
        print(f'  输出: {output_path}')
        
        notes = parse_js_notes(input_path)
        print(f'  找到 {len(notes)} 篇笔记')
        
        for note in notes:
            print(f'    - {note["title"]}')
        
        generate_ppt_html(notes, output_path, title, config.get('style'))
        print(f'  PPT生成完成!')
        results.append({'name': task['name'], 'input': input_path, 'output': output_path, 'notes_count': len(notes)})
    
    config['last_updated'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=4)
    
    return results

def main():
    parser = argparse.ArgumentParser(description='将笔记JS文件转换为PPT')
    parser.add_argument('input', nargs='?', help='输入的JS笔记文件路径（可选，不指定则读取配置文件）')
    parser.add_argument('-o', '--output', help='输出的HTML文件路径（可选）')
    parser.add_argument('-t', '--title', default='资料分析知识点', help='PPT标题（默认：资料分析知识点）')
    parser.add_argument('-c', '--config', default=None, help='配置文件路径')
    
    args = parser.parse_args()
    
    if args.input:
        input_path = args.input
        
        if args.output:
            output_path = args.output
        else:
            base_name = os.path.splitext(os.path.basename(input_path))[0]
            output_dir = os.path.dirname(input_path)
            output_path = os.path.join(output_dir, f'{base_name}_ppt.html')
        
        print(f'正在解析笔记文件: {input_path}')
        notes = parse_js_notes(input_path)
        print(f'找到 {len(notes)} 篇笔记')
        
        for note in notes:
            print(f'  - {note["title"]}')
        
        print(f'正在生成PPT: {output_path}')
        generate_ppt_html(notes, output_path, args.title)
        print('PPT生成完成！')
    else:
        if args.config is None:
            script_dir = os.path.dirname(os.path.abspath(__file__))
            args.config = os.path.join(script_dir, 'ppt_config.json')
        config_path = args.config
        print(f'使用配置文件: {config_path}')
        results = process_config(config_path)
        print(f'\n共处理 {len(results)} 个任务')
        for r in results:
            print(f'  {r["name"]}: {r["notes_count"]} 篇笔记 -> {r["output"]}')

if __name__ == '__main__':
    main()
