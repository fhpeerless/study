import re
import os
import json
import argparse
from datetime import datetime
from urllib.parse import quote

def load_config(config_path):
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_md_to_notes(md_content, split_level=1):
    notes = []
    lines = md_content.split('\n')
    
    current_note = None
    pending_content = []
    deferred_content = []
    note_index = 0
    parent_titles = {}
    parent_first_note_used = {}
    
    heading_pattern = re.compile(r'^(#{1,6})\s+(.+)$')
    
    for line in lines:
        match = heading_pattern.match(line)
        
        if match:
            level = len(match.group(1))
            title = match.group(2).strip()
            
            if level == split_level:
                deferred_content.append(line)
                
                note_title = title
                for lvl in range(1, split_level):
                    if lvl in parent_titles:
                        parent_key = f"level_{lvl}"
                        if parent_key not in parent_first_note_used:
                            note_title = parent_titles[lvl]
                            parent_first_note_used[parent_key] = True
                        break
                
                if current_note is None:
                    current_note = {
                        'title': note_title,
                        'content_lines': pending_content.copy() + deferred_content.copy()
                    }
                    pending_content = []
                    deferred_content = []
                else:
                    current_note['content'] = '\n'.join(current_note['content_lines']).strip()
                    notes.append(current_note)
                    note_index += 1
                    current_note = {
                        'title': note_title,
                        'content_lines': deferred_content.copy()
                    }
                    deferred_content = []
            
            elif level < split_level:
                parent_titles[level] = title
                for lvl in list(parent_titles.keys()):
                    if lvl > level:
                        del parent_titles[lvl]
                parent_key = f"level_{level}"
                if parent_key in parent_first_note_used:
                    del parent_first_note_used[parent_key]
                for lvl in range(level + 1, split_level):
                    child_key = f"level_{lvl}"
                    if child_key in parent_first_note_used:
                        del parent_first_note_used[child_key]
                if current_note is None:
                    pending_content.append(line)
                else:
                    deferred_content.append(line)
            
            else:
                if current_note is None:
                    pending_content.append(line)
                else:
                    current_note['content_lines'].append(line)
        
        else:
            if deferred_content:
                deferred_content.append(line)
            elif current_note is None:
                pending_content.append(line)
            else:
                current_note['content_lines'].append(line)
    
    if current_note is not None:
        if deferred_content:
            current_note['content_lines'].extend(deferred_content)
            deferred_content = []
        current_note['content'] = '\n'.join(current_note['content_lines']).strip()
        notes.append(current_note)
    elif pending_content or deferred_content:
        notes.append({
            'title': '',
            'content': '\n'.join(pending_content + deferred_content).strip()
        })
    
    return notes

def escape_js_string(text):
    text = text.replace('\\', '\\\\')
    text = text.replace('`', '\\`')
    text = text.replace('$', '\\$')
    return text

def generate_js_notes(notes, output_path, options=None):
    if options is None:
        options = {}
    
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
    shuiyin = options.get('shuiyin', 'open')
    shuiyin_text = options.get('shuiyin_text', 'study.xtwa.org')
    
    js_lines = []
    var_names = []
    
    for i, note in enumerate(notes):
        var_name = f'note{i}'
        var_names.append(var_name)
        title = note['title'].replace('"', '\\"')
        content = escape_js_string(note['content'])
        
        js_lines.append(f"export const {var_name} = {{")
        js_lines.append(f'    title: "{title}",')
        js_lines.append(f'    shuiyin:"{shuiyin}",')
        js_lines.append(f'    shuiyin_text:"{shuiyin_text}",')
        js_lines.append(f'    contentmd:`')
        js_lines.append(content)
        js_lines.append('`,')
        js_lines.append(f'    timestamp: "{timestamp}",')
        js_lines.append('    embed: ""')
        js_lines.append('};')
        js_lines.append('')
    
    js_lines.append(f"export default [{', '.join(var_names)}];")
    
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(js_lines))
    
    return output_path

def process_task(task, project_root):
    input_path = os.path.normpath(os.path.join(project_root, task['input'].lstrip('./')))
    output_path = os.path.normpath(os.path.join(project_root, task['output'].lstrip('./')))
    split_level = task.get('split_level', 1)
    options = task.get('options', {})
    
    print(f'正在处理: {task.get("name", input_path)}')
    print(f'  输入: {input_path}')
    print(f'  输出: {output_path}')
    print(f'  分割级别: {split_level}级标题')
    
    with open(input_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    notes = parse_md_to_notes(md_content, split_level)
    print(f'  找到 {len(notes)} 篇笔记')
    
    for note in notes:
        print(f'    - {note["title"]}')
    
    generate_js_notes(notes, output_path, options)
    print(f'  JS笔记生成完成!')
    
    return {'input': input_path, 'output': output_path, 'notes_count': len(notes)}

def process_config(config_path):
    config = load_config(config_path)
    config_dir = os.path.dirname(config_path)
    project_root = os.path.dirname(config_dir)
    
    results = []
    for task in config.get('tasks', []):
        result = process_task(task, project_root)
        results.append(result)
    
    config['last_updated'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=4)
    
    print(f'\n共处理 {len(results)} 个任务')
    return results

def main():
    parser = argparse.ArgumentParser(description='将Markdown文件转换为JS笔记格式')
    parser.add_argument('input', nargs='?', help='输入的Markdown文件路径（可选，不指定则读取配置文件）')
    parser.add_argument('-o', '--output', help='输出的JS文件路径（可选）')
    parser.add_argument('-l', '--level', type=int, default=1, help='按几级标题分割笔记（默认：1）')
    parser.add_argument('-c', '--config', default='./config/md_to_js_config.json', help='配置文件路径')
    parser.add_argument('--name', help='任务名称（可选）')
    
    args = parser.parse_args()
    
    if args.input:
        input_path = args.input
        
        if args.output:
            output_path = args.output
        else:
            base_name = os.path.splitext(os.path.basename(input_path))[0]
            output_dir = os.path.dirname(input_path)
            output_path = os.path.join(output_dir, f'{base_name}.js')
        
        print(f'正在解析Markdown文件: {input_path}')
        
        with open(input_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        notes = parse_md_to_notes(md_content, args.level)
        print(f'找到 {len(notes)} 篇笔记')
        
        for note in notes:
            print(f'  - {note["title"]}')
        
        print(f'正在生成JS笔记: {output_path}')
        generate_js_notes(notes, output_path)
        print('JS笔记生成完成！')
    else:
        config_path = args.config
        print(f'使用配置文件: {config_path}')
        process_config(config_path)

if __name__ == '__main__':
    main()
