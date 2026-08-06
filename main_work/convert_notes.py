import json
import os
import re
import sys

def read_config(config_path):
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_js_notes(js_content):
    notes = []
    pattern = r'export\s+const\s+(\w+)\s*=\s*\{[^}]*title:\s*["\']([^"\']*)["\'][^}]*contentmd:\s*`([^`]*)`[^}]*\}'
    matches = re.findall(pattern, js_content, re.DOTALL)
    
    for match in matches:
        var_name, title, content = match
        notes.append({
            'var_name': var_name,
            'title': title,
            'content': content
        })
    
    return notes

def generate_html(notes, config_item, global_config=None):
    if global_config is None:
        global_config = {}
    
    watermark_text = global_config.get('watermark_text', 'study.xtwa.org')
    watermark_opacity = global_config.get('watermark_opacity', 0.15)
    
    if watermark_opacity > 1:
        watermark_opacity = watermark_opacity / 100
    
    bg_opacity = min(watermark_opacity * 0.5, 0.15)
    
    toc_items = []
    note_sections = []
    js_vars = []
    
    for idx, note in enumerate(notes):
        note_id = f"note{idx}"
        toc_items.append(f'<li><a href="#{note_id}">{idx}. {note["title"]}</a></li>')
        note_sections.append(f'''        <div id="{note_id}" class="note-section">
            <h2 class="note-title">{idx}. {note["title"]}</h2>
            <div class="note-body" id="{note_id}-content"></div>
        </div>''')
        js_vars.append(f'        const {note["var_name"]} = `\n{note["content"]}\n`;')
    
    js_renders = []
    for idx, note in enumerate(notes):
        js_renders.append(f"        document.getElementById('note{idx}-content').innerHTML = md.render({note['var_name']});")
    
    watermark_escaped = watermark_text.replace("'", "&apos;").replace("<", "&lt;").replace(">", "&gt;")
    
    html_template = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{config_item.get("title", "笔记")}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.8;
            padding: 20px;
        }}
        
        .container {{
            max-width: 900px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            position: relative;
        }}
        
        .header {{
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #3498db;
        }}
        
        .header h1 {{
            color: #2c3e50;
            font-size: 28px;
            margin-bottom: 10px;
        }}
        
        .header .subtitle {{
            color: #7f8c8d;
            font-size: 14px;
        }}
        
        .note-section {{
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid #e0e0e0;
        }}
        
        .note-section:last-child {{
            border-bottom: none;
            margin-bottom: 0;
        }}
        
        .note-title {{
            color: #1E90FF;
            font-size: 24px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #9b59b6;
            display: inline-block;
        }}
        
        .note-body h1 {{
            color: #1E90FF;
            font-size: 26px;
            margin: 25px 0 15px;
            padding-bottom: 10px;
            border-bottom: 3px solid #9b59b6;
            display: block;
        }}
        
        .note-body h2 {{
            color: #2ecc71;
            font-size: 22px;
            margin: 20px 0 12px;
            padding-bottom: 8px;
            border-bottom: 3px solid #9b59b6;
            display: block;
        }}
        
        .note-body h3 {{
            color: #333;
            font-size: 18px;
            margin: 18px 0 10px;
            border-bottom: 3px solid #9b59b6;
            display: block;
        }}
        
        .note-body p {{
            margin-bottom: 15px;
        }}
        
        .note-body ul, .note-body ol {{
            margin: 15px 0;
            padding-left: 25px;
        }}
        
        .note-body li {{
            margin-bottom: 8px;
            color: #8B4513;
        }}
        
        .note-body table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 14px;
        }}
        
        .note-body th, .note-body td {{
            border: 1px solid #666;
            padding: 10px 12px;
            text-align: left;
        }}
        
        .note-body th {{
            background-color: #3498db;
            color: #fff;
            font-weight: 600;
        }}
        
        .note-body tr:nth-child(even) {{
            background-color: #f8f9fa;
        }}
        
        .note-body blockquote {{
            border-left: 4px solid #3498db;
            padding: 15px 20px;
            margin: 20px 0;
            background-color: #f8f9fa;
            color: #555;
        }}
        
        .note-body blockquote p {{
            margin-bottom: 8px;
        }}
        
        .note-body blockquote p:last-child {{
            margin-bottom: 0;
        }}
        
        .note-body strong {{
            color: #e74c3c;
            font-weight: 600;
        }}
        
        .note-body code {{
            background-color: #f1f1f1;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Consolas', monospace;
            font-size: 14px;
        }}
        
        .note-body pre {{
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            overflow-x: auto;
            font-family: 'Consolas', monospace;
            font-size: 13px;
        }}
        
        .note-body pre code {{
            background-color: transparent;
            padding: 0;
        }}
        
        .toc {{
            background-color: #eef5fb;
            border: 1px solid #d0e3f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }}
        
        .toc h3 {{
            color: #2c3e50;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }}
        
        .toc h3::before {{
            content: "\\1F4DA";
            margin-right: 8px;
        }}
        
        .toc ul {{
            list-style: none;
            padding: 0;
        }}
        
        .toc li {{
            margin: 8px 0;
        }}
        
        .toc a {{
            color: #34495e;
            text-decoration: none;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
            transition: all 0.2s;
        }}
        
        .toc a:hover {{
            color: #2980b9;
            background-color: #d0e3f0;
        }}
        
        .watermark {{
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 14px;
            color: rgba(0, 0, 0, {watermark_opacity});
            font-weight: 500;
            letter-spacing: 1px;
            pointer-events: none;
            z-index: 1000;
        }}
        
        .container::before {{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
            background-repeat: repeat;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Ctext x='20' y='100' fill='rgba(0,0,0,{bg_opacity})' font-size='18' font-family='Arial,sans-serif' transform='rotate(-20 150 100)'%3E{watermark_escaped}%3C/text%3E%3C/svg%3E");
            -webkit-background-size: 300px 200px;
            background-size: 300px 200px;
        }}
        
        .back-link {{
            display: inline-block;
            margin-bottom: 20px;
            color: #3498db;
            text-decoration: none;
            font-size: 14px;
        }}
        
        .back-link:hover {{
            text-decoration: underline;
        }}
        
        @media (max-width: 768px) {{
            body {{
                padding: 10px;
            }}
            
            .container {{
                padding: 20px;
            }}
            
            .note-body h1 {{
                font-size: 22px;
            }}
            
            .note-body h2 {{
                font-size: 18px;
            }}
            
            .note-body h3 {{
                font-size: 16px;
            }}
            
            .note-body table {{
                font-size: 12px;
            }}
            
            .note-body th, .note-body td {{
                padding: 8px;
            }}
            
            .watermark {{
                font-size: 12px;
                opacity: 0.3;
            }}
            
            .container::before {{
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Ctext x='20' y='100' fill='rgba(0,0,0,{min(bg_opacity * 2, 0.15):.2f})' font-size='18' font-family='Arial,sans-serif' transform='rotate(-20 150 100)'%3E{watermark_escaped}%3C/text%3E%3C/svg%3E");
            }}
        }}
        
        @media print {{
            body {{
                background-color: #fff;
                padding: 0;
            }}
            
            .container {{
                box-shadow: none;
                max-width: 100%;
                padding: 0;
            }}
            
            .watermark {{
                position: fixed;
                bottom: 20px;
                right: 20px;
                font-size: 14px;
                color: rgba(0, 0, 0, {watermark_opacity});
                font-weight: 500;
                letter-spacing: 1px;
                pointer-events: none;
                z-index: 1000;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }}
            
            .container::before {{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 1;
                background-repeat: repeat;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Ctext x='20' y='100' fill='rgba(0,0,0,{bg_opacity})' font-size='18' font-family='Arial,sans-serif' transform='rotate(-20 150 100)'%3E{watermark_escaped}%3C/text%3E%3C/svg%3E");
                -webkit-background-size: 300px 200px;
                background-size: 300px 200px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }}
            
            .back-link {{
                display: none;
            }}
            
            .toc {{
                page-break-after: always;
            }}
            
            .note-section {{
                page-break-inside: avoid;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{config_item.get("header_title", "笔记")}</h1>
            <div class="subtitle">{config_item.get("subtitle", "study.xtwa.org 智能笔记系统")}</div>
        </div>
        
        <a href="https://study.xtwa.org/" class="back-link">进入笔记网首页</a>
        
        <div class="toc">
            <h3>目录</h3>
            <ul>
{chr(10).join("                " + item for item in toc_items)}
            </ul>
        </div>
        
{chr(10).join(note_sections)}
    </div>
    
    <div class="watermark">{watermark_text}</div>
    
    <script src="https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it-texmath/texmath.min.js"></script>
    <script>
{chr(10).join(js_vars)}

        // 初始化markdown-it
        const md = window.markdownit({{
            html: true,
            linkify: true,
            typographer: true
        }});

        // 启用KaTeX数学公式支持
        if (window.texmath && window.katex) {{
            md.use(window.texmath, {{
                engine: window.katex,
                delimiters: 'dollars',
                katexOptions: {{
                    throwOnError: false,
                    errorColor: '#cc0000'
                }}
            }});
        }}

        // 渲染笔记内容
{chr(10).join(js_renders)}

        // 目录点击平滑滚动
        document.querySelectorAll('.toc a').forEach(link => {{
            link.addEventListener('click', function(e) {{
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {{
                    targetElement.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
                }}
            }});
        }});
    </script>
</body>
</html>'''
    
    return html_template

def convert_note(input_path, output_path, config_item, base_dir, global_config=None):
    input_full = os.path.join(base_dir, input_path)
    output_full = os.path.join(base_dir, output_path)
    
    if not os.path.exists(input_full):
        print(f"警告: 输入文件不存在: {input_full}")
        return False
    
    with open(input_full, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    notes = parse_js_notes(js_content)
    
    if not notes:
        print(f"警告: 未从文件中解析到笔记内容: {input_full}")
        return False
    
    html_content = generate_html(notes, config_item, global_config)
    
    output_dir = os.path.dirname(output_full)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    with open(output_full, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"转换成功: {input_path} -> {output_path}")
    return True

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    config_path = os.path.join(project_root, 'config', 'convert_config.json')
    
    if not os.path.exists(config_path):
        print(f"错误: 配置文件不存在: {config_path}")
        sys.exit(1)
    
    config = read_config(config_path)
    
    global_config = config.get('global', {})
    
    success_count = 0
    fail_count = 0
    
    for note_config in config.get('notes', []):
        input_path = note_config.get('input')
        output_path = note_config.get('output')
        
        if not input_path or not output_path:
            print(f"警告: 配置项缺少input或output路径")
            fail_count += 1
            continue
        
        if convert_note(input_path, output_path, note_config, project_root, global_config):
            success_count += 1
        else:
            fail_count += 1
    
    print(f"\n转换完成: 成功 {success_count} 个, 失败 {fail_count} 个")

if __name__ == '__main__':
    main()
