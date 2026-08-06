import json
import random
import os
from datetime import datetime

def load_config(config_path):
    if os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {'password_pages': {}, 'timezone': 'Asia/Shanghai'}

def save_config(config, config_path):
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=4)

def generate_password(page_config):
    chars = page_config.get('password_chars', ['w', 'a', 'n', 'g', 'd'])
    length = page_config.get('password_length', 6)
    
    password = ''.join(random.choice(chars) for _ in range(length))
    
    char_mapping = page_config.get('char_mapping', {'w': '1', 'a': '2', 'n': '3', 'g': '4', 'd': '5'})
    number = ''.join(char_mapping.get(c, c) for c in password)
    
    return password, number

def generate_password_page_html(page_id, page_config):
    name = page_config.get('name', '下载密码')
    
    html_template = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{name} - 智能笔记系统</title>
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <style>
        body {{
            background-color: #1e1e2e;
            color: #e0e0e0;
        }}
        .password-container {{
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }}
        .password-card {{
            background-color: #2d2d44;
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            text-align: center;
        }}
        .password-title {{
            font-size: 24px;
            color: #ffffff;
            margin-bottom: 10px;
        }}
        .password-subtitle {{
            font-size: 14px;
            color: #a0a0a0;
            margin-bottom: 30px;
        }}
        .time-display {{
            font-size: 48px;
            font-weight: bold;
            color: #4dabf5;
            margin-bottom: 10px;
            font-family: 'Consolas', monospace;
        }}
        .time-label {{
            font-size: 14px;
            color: #a0a0a0;
            margin-bottom: 40px;
        }}
        .password-display {{
            background-color: #343458;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
        }}
        .password-label {{
            font-size: 14px;
            color: #a0a0a0;
            margin-bottom: 15px;
        }}
        .password-value {{
            font-size: 48px;
            font-weight: bold;
            color: #e74c3c;
            letter-spacing: 12px;
            font-family: 'Consolas', monospace;
        }}
        .back-link {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #4dabf5;
            text-decoration: none;
            font-size: 14px;
            margin-top: 30px;
        }}
        .back-link:hover {{
            color: #3498db;
        }}
        .refresh-info {{
            font-size: 12px;
            color: #7f8c8d;
            margin-top: 20px;
        }}
        @media (max-width: 480px) {{
            .password-card {{
                padding: 25px;
            }}
            .time-display {{
                font-size: 36px;
            }}
            .password-value {{
                font-size: 36px;
                letter-spacing: 6px;
            }}
        }}
    </style>
</head>
<body class="dark-mode">
    <div class="password-container">
        <div class="password-card">
            <h1 class="password-title"><i class="fa fa-key"></i> {name}</h1>
            <p class="password-subtitle">在下载中心输入此密码即可下载文件</p>
            
            <div class="time-display" id="timeDisplay">--:--:--</div>
            <div class="time-label">北京时间 (UTC+8)</div>
            
            <div class="password-display">
                <div class="password-label">当前密码</div>
                <div class="password-value" id="passwordDisplay">------</div>
            </div>
            
            <div class="refresh-info">
                <i class="fa fa-refresh"></i> 密码每天 6:00, 9:00, 12:00, 15:00, 18:00 自动更新
            </div>
            
            <a href="../download.html" class="back-link"><i class="fa fa-arrow-left"></i> 返回下载中心</a>
        </div>
    </div>

    <script>
        const PAGE_ID = '{page_id}';
        
        function updateBeijingTime() {{
            const now = new Date();
            const beijingOffset = 8 * 60;
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const beijingTime = new Date(utc + beijingOffset * 60000);
            
            const hours = String(beijingTime.getHours()).padStart(2, '0');
            const minutes = String(beijingTime.getMinutes()).padStart(2, '0');
            const seconds = String(beijingTime.getSeconds()).padStart(2, '0');
            
            document.getElementById('timeDisplay').textContent = `${{hours}}:${{minutes}}:${{seconds}}`;
        }}

        async function loadPassword() {{
            try {{
                const response = await fetch('../config/password_config.json?t=' + Date.now());
                const config = await response.json();
                const pageConfig = config.password_pages[PAGE_ID];
                
                if (pageConfig && pageConfig.current_number) {{
                    document.getElementById('passwordDisplay').textContent = pageConfig.current_number;
                    document.querySelector('.password-title').innerHTML = `<i class="fa fa-key"></i> ${{pageConfig.name || '下载密码'}}`;
                }}
            }} catch (error) {{
                console.error('Failed to load password:', error);
                document.getElementById('passwordDisplay').textContent = '加载中...';
            }}
        }}

        updateBeijingTime();
        setInterval(updateBeijingTime, 1000);
        
        loadPassword();
        setInterval(loadPassword, 60000);
    </script>
    <script src="../js/countdown.js"></script>
</body>
</html>
'''
    return html_template

def update_all_passwords(config, project_root):
    password_pages = config.get('password_pages', {})
    mima_dir = os.path.join(project_root, 'mima')
    
    if not os.path.exists(mima_dir):
        os.makedirs(mima_dir)
    
    print("Updating all password pages...")
    
    for page_id, page_config in password_pages.items():
        password, number = generate_password(page_config)
        page_config['current_password'] = password
        page_config['current_number'] = number
        page_config['last_updated'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        page_url = f"mima/pwd_{page_id}.html"
        page_config['page_url'] = page_url
        page_config['id'] = page_id
        
        html_content = generate_password_page_html(page_id, page_config)
        html_path = os.path.join(mima_dir, f"pwd_{page_id}.html")
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"  [{page_id}] {page_config.get('name', page_id)}: {password} -> {number}")
        print(f"    Generated page: {page_url}")
    
    config['password_pages'] = password_pages
    return config

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    config_path = os.path.join(project_root, 'config', 'password_config.json')
    
    config = load_config(config_path)
    config = update_all_passwords(config, project_root)
    save_config(config, config_path)
    
    print("\nAll passwords updated successfully!")
    print(f"Config file: {config_path}")

if __name__ == '__main__':
    main()
