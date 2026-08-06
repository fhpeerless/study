import json
import os
import base64
from datetime import datetime

SECRET_KEY = "XtwaStudy2026Secret"

def load_config(config_path):
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def xor_encrypt(data, key):
    """XOR加密/解密"""
    result = []
    for i, char in enumerate(data):
        result.append(chr(ord(char) ^ ord(key[i % len(key)])))
    return ''.join(result)

def encode_url(url):
    """对URL进行XOR加密后再Base64编码"""
    if not url or url == '#':
        return url
    encrypted = xor_encrypt(url, SECRET_KEY)
    encoded = base64.b64encode(encrypted.encode('utf-8')).decode('utf-8')
    return f"enc:{encoded}"

def generate_css(style):
    return f'''
        html {{
            width: 100vw;
            height: 100vh;
        }}
        body {{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: {style['body_bg']};
            color: {style['body_color']};
        }}
        .download-container {{
            width: 92%;
            height: 92%;
            max-width: {style['container_max_width']};
            margin: 1vh auto;
            padding: 40px 20px;
        }}
        .top-category-nav {{
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
            justify-content: center;
        }}
        .top-category-btn {{
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background-color: {style['card_bg']};
            color: {style['text_secondary']};
            border: 2px solid transparent;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
        }}
        .top-category-btn:hover {{
            background-color: {style['card_hover_bg']};
            color: {style['text_primary']};
            border-color: {style['primary_color']};
        }}
        .top-category-btn.active {{
            background-color: {style['primary_color']};
            color: {style['text_primary']};
            border-color: {style['primary_color']};
        }}
        .top-category-btn i {{
            font-size: 18px;
        }}
        .download-header {{
            text-align: left;
            margin-bottom: 30px;
        }}
        .download-header h1 {{
            font-size: 28px;
            color: {style['text_primary']};
            margin-bottom: 10px;
        }}
        .download-header p {{
            color: {style['text_secondary']};
            font-size: 14px;
        }}
        .category-tabs {{
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }}
        .category-tab {{
            padding: 8px 20px;
            background-color: {style['card_bg']};
            color: {style['text_secondary']};
            border: none;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
        }}
        .category-tab:hover {{
            background-color: {style['card_hover_bg']};
            color: {style['text_primary']};
        }}
        .category-tab.active {{
            background-color: {style['primary_color']};
            color: {style['text_primary']};
        }}
        .subcategory-nav {{
            display: flex;
            gap: 8px;
            margin-bottom: 25px;
            flex-wrap: wrap;
            padding: 15px;
            background-color: {style['card_bg']};
            border-radius: 10px;
        }}
        .subcategory-nav-title {{
            font-size: 14px;
            color: {style['text_secondary']};
            margin-right: 10px;
            display: flex;
            align-items: center;
        }}
        .subcategory-nav-link {{
            padding: 6px 14px;
            background-color: {style['card_hover_bg']};
            color: {style['text_secondary']};
            text-decoration: none;
            border-radius: 15px;
            font-size: 13px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 5px;
        }}
        .subcategory-nav-link:hover {{
            background-color: {style['primary_color']};
            color: {style['text_primary']};
        }}
        .subcategory-nav-link i {{
            font-size: 12px;
        }}
        .category-section {{
            margin-bottom: 40px;
        }}
        .category-title {{
            font-size: 20px;
            color: {style['text_primary']};
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid {style['primary_color']};
            display: flex;
            align-items: center;
            gap: 10px;
        }}
        .category-title i {{
            color: {style['primary_color']};
        }}
        .subcategory-section {{
            margin-bottom: 30px;
            margin-left: 15px;
            scroll-margin-top: 100px;
        }}
        .subcategory-title {{
            font-size: 16px;
            color: {style['version_color']};
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid {style['card_hover_bg']};
            display: flex;
            align-items: center;
            gap: 8px;
        }}
        .subcategory-title i {{
            color: {style['version_color']};
            font-size: 14px;
        }}
        .download-list {{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }}
        .download-item {{
            background-color: {style['card_bg']};
            border-radius: {style['card_radius']};
            padding: 24px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: all 0.3s;
        }}
        .download-item:hover {{
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }}
        .download-item-header {{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
        }}
        .download-item-info {{
            flex: 1;
        }}
        .download-item-title {{
            font-size: 18px;
            font-weight: 600;
            color: {style['text_primary']};
            margin-bottom: 8px;
        }}
        .download-item-meta {{
            display: flex;
            gap: 20px;
            font-size: 13px;
            color: {style['text_secondary']};
        }}
        .download-item-meta span {{
            display: flex;
            align-items: center;
            gap: 5px;
        }}
        .download-item-meta i {{
            color: {style['version_color']};
        }}
        .download-item-version {{
            display: inline-block;
            padding: 4px 10px;
            background-color: {style['version_bg']};
            color: {style['version_color']};
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }}
        .download-item-desc {{
            font-size: 14px;
            color: {style['text_desc']};
            line-height: 1.6;
            margin-bottom: 16px;
        }}
        .download-item-actions {{
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }}
        .download-btn {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background-color: {style['primary_color']};
            color: {style['text_primary']};
            border: none;
            border-radius: {style['btn_radius']};
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
        }}
        .download-btn:hover {{
            background-color: {style['primary_hover']};
        }}
        .download-btn.purchase {{
            background-color: {style['purchase_color']};
        }}
        .download-btn.purchase:hover {{
            background-color: {style['purchase_hover']};
        }}
        .download-btn.secondary {{
            background-color: #95a5a6;
        }}
        .download-btn.secondary:hover {{
            background-color: #7f8c8d;
        }}
        .back-link {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: {style['version_color']};
            text-decoration: none;
            font-size: 14px;
            margin-bottom: 20px;
        }}
        .back-link:hover {{
            color: {style['primary_color']};
        }}
        .no-files {{
            text-align: center;
            padding: 60px 20px;
            color: #7f8c8d;
        }}
        .no-files i {{
            font-size: 48px;
            margin-bottom: 16px;
            color: #4a4a6a;
        }}
        .password-modal {{
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }}
        .password-modal.show {{
            display: flex;
        }}
        .password-modal-content {{
            background-color: #2d2d44;
            padding: 30px;
            border-radius: 16px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        }}
        .password-modal-title {{
            font-size: 20px;
            color: #ffffff;
            margin-bottom: 20px;
        }}
        .password-modal-title i {{
            color: #4dabf5;
            margin-right: 8px;
        }}
        .password-input {{
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #3a3a56;
            border-radius: 8px;
            background-color: #1e1e2e;
            color: #ffffff;
            font-size: 18px;
            text-align: center;
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-bottom: 15px;
        }}
        .password-input:focus {{
            outline: none;
            border-color: #3498db;
        }}
        .password-input.error {{
            border-color: #e74c3c;
            animation: shake 0.3s;
        }}
        @keyframes shake {{
            0%, 100% {{ transform: translateX(0); }}
            25% {{ transform: translateX(-5px); }}
            75% {{ transform: translateX(5px); }}
        }}
        .password-error {{
            color: #e74c3c;
            font-size: 13px;
            margin-bottom: 15px;
            display: none;
        }}
        .password-error.show {{
            display: block;
        }}
        .password-modal-actions {{
            display: flex;
            gap: 10px;
            justify-content: center;
        }}
        .password-modal-btn {{
            padding: 10px 24px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
        }}
        .password-modal-btn.confirm {{
            background-color: #3498db;
            color: #ffffff;
        }}
        .password-modal-btn.confirm:hover {{
            background-color: #2980b9;
        }}
        .password-modal-btn.cancel {{
            background-color: #3a3a56;
            color: #a0a0a0;
        }}
        .password-modal-btn.cancel:hover {{
            background-color: #4a4a6a;
        }}
        @media (max-width: 768px) {{
            .download-item-header {{
                flex-direction: column;
                gap: 12px;
            }}
            .download-item-meta {{
                flex-wrap: wrap;
                gap: 10px;
            }}
            .download-item-actions {{
                flex-wrap: wrap;
            }}
            .subcategory-section {{
                margin-left: 0;
            }}
            .subcategory-nav {{
                padding: 10px;
            }}
            .subcategory-nav-title {{
                width: 100%;
                margin-bottom: 8px;
            }}
            .top-category-nav {{
                gap: 10px;
            }}
            .top-category-btn {{
                padding: 10px 18px;
                font-size: 14px;
            }}
        }}
    '''

def generate_top_category_nav(top_categories, default_top_category):
    if not top_categories:
        return ''
    buttons = []
    for top_cat in top_categories:
        active = ' active' if top_cat['id'] == default_top_category else ''
        buttons.append(f'                <button class="top-category-btn{active}" data-top-category="{top_cat["id"]}"><i class="fa {top_cat["icon"]}"></i> {top_cat["name"]}</button>')
    return '\n'.join(buttons)

def generate_category_tabs(top_categories, default_top_category):
    tabs = []
    for top_cat in top_categories:
        for i, cat in enumerate(top_cat.get('categories', [])):
            active = ' active' if top_cat['id'] == default_top_category and i == 0 else ''
            tabs.append(f'                <button class="category-tab{active}" data-category="{cat["id"]}" data-top-category="{top_cat["id"]}">{cat["name"]}</button>')
    return '\n'.join(tabs)

def generate_subcategory_nav(top_categories):
    navs = []
    for top_cat in top_categories:
        for cat in top_cat.get('categories', []):
            files = cat.get('files', {})
            links = []
            for subcat_id, subcat_files in files.items():
                if subcat_files:
                    subcat_name = subcat_files[0].get('subcategory_name', subcat_files[0]['title'])
                    links.append(f'                <a href="#subcat-{cat["id"]}-{subcat_id}" class="subcategory-nav-link"><i class="fa fa-file-o"></i> {subcat_name}</a>')
            
            links_html = '\n'.join(links)
            navs.append(f'''
            <div class="subcategory-nav" data-category="{cat['id']}" data-top-category="{top_cat['id']}">
                <span class="subcategory-nav-title"><i class="fa fa-list"></i> 快速导航：</span>
{links_html}
            </div>
''')
    return '\n'.join(navs)

def generate_file_item(file_info):
    purchase_btn = ''
    if file_info.get('purchase_url'):
        purchase_text = file_info.get('purchase_text', '购买')
        purchase_btn = f'''
                            <a href="{file_info['purchase_url']}" class="download-btn purchase"><i class="fa fa-shopping-cart"></i> {purchase_text}</a>'''
    
    download_text = file_info.get('download_text', '立即下载')
    password_page = file_info.get('password', '')
    encoded_url = encode_url(file_info['download_url'])
    
    return f'''
                    <div class="download-item">
                        <div class="download-item-header">
                            <div class="download-item-info">
                                <div class="download-item-title">{file_info['title']}</div>
                                <div class="download-item-meta">
                                    <span><i class="fa fa-calendar"></i> 更新时间：{file_info['update_time']}</span>
                                    <span><i class="fa fa-file"></i> 大小：{file_info['size']}</span>
                                </div>
                            </div>
                            <span class="download-item-version">{file_info['version']}</span>
                        </div>
                        <div class="download-item-desc">
                            {file_info['description']}
                        </div>
                        <div class="download-item-actions">
                            <button class="download-btn" data-url="{encoded_url}" data-password="{password_page}"><i class="fa fa-download"></i> {download_text}</button>{purchase_btn}
                        </div>
                    </div>
'''

def generate_subcategory_section(cat_id, subcat_id, subcat_name, files):
    files_html = '\n'.join([generate_file_item(f) for f in files])
    return f'''
                <div class="subcategory-section" id="subcat-{cat_id}-{subcat_id}">
                    <h3 class="subcategory-title"><i class="fa fa-folder-o"></i> {subcat_name}</h3>
                    {files_html}
                </div>
'''

def generate_category_sections(top_categories, default_top_category):
    sections = []
    for top_cat in top_categories:
        for cat in top_cat.get('categories', []):
            subcat_html_parts = []
            files = cat.get('files', {})
            
            for subcat_id, subcat_files in files.items():
                if subcat_files:
                    subcat_name = subcat_files[0].get('subcategory_name', subcat_files[0]['title'])
                    subcat_html_parts.append(generate_subcategory_section(cat['id'], subcat_id, subcat_name, subcat_files))
            
            subcat_html = '\n'.join(subcat_html_parts)
            sections.append(f'''
                <div class="category-section" data-category="{cat['id']}" data-top-category="{top_cat['id']}">
                    <h2 class="category-title"><i class="fa {cat['icon']}"></i> {cat['title']}</h2>
                    {subcat_html}
                </div>
''')
    return '\n'.join(sections)

def generate_html(config):
    page = config['page']
    style = config['style']
    top_categories = config.get('top_categories', [])
    
    default_top_category = top_categories[0]['id'] if top_categories else ''
    default_category = top_categories[0]['categories'][0]['id'] if top_categories and top_categories[0].get('categories') else ''
    
    css = generate_css(style)
    top_cat_nav = generate_top_category_nav(top_categories, default_top_category)
    tabs = generate_category_tabs(top_categories, default_top_category)
    subcat_nav = generate_subcategory_nav(top_categories)
    sections = generate_category_sections(top_categories, default_top_category)
    
    header_desc = page.get('header_desc', [])
    if isinstance(header_desc, str):
        header_desc = [header_desc]
    header_desc_html = '\n'.join([f'                <p>{desc}</p>' for desc in header_desc])
    
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{page['title']}</title>
    <link rel="stylesheet" href="./css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <style>{css}
    </style>
</head>
<body class="dark-mode">
    <div class="note-container">
        <header class="note-header">
            <div class="theme-toggle">
                <div class="header-content">
                    <a href="index.html" class="back-link"><i class="fa fa-arrow-left"></i> 返回首页</a>
                    <h1><i class="fa fa-download"></i> 下载中心</h1>
                    <button id="themeBtn"><i class="fa fa-sun-o"></i></button>
                </div>
            </div>
        </header>

        <main class="download-container">
            <div class="top-category-nav">
{top_cat_nav}
            </div>

            <div class="download-header">
                <h1>{page['header_title']}</h1>
{header_desc_html}
            </div>

            <div class="category-tabs">
{tabs}
            </div>

{subcat_nav}

            <div class="download-list" id="downloadList">
{sections}
            </div>
        </main>

        <footer class="note-footer">
            <p>{page['footer_text']}<span id="footerCountdown"></span></p>
        </footer>
    </div>

    <div class="password-modal" id="passwordModal">
        <div class="password-modal-content">
            <h3 class="password-modal-title"><i class="fa fa-lock"></i> 请输入密码</h3>
            <input type="text" class="password-input" id="passwordInput" maxlength="6" placeholder="请输入6位数字密码">
            <div class="password-error" id="passwordError">密码错误，请重新输入</div>
            <div class="password-modal-actions">
                <button class="password-modal-btn cancel" id="cancelBtn">取消</button>
                <button class="password-modal-btn confirm" id="confirmBtn">确认下载</button>
            </div>
        </div>
    </div>

    <script>
        const themeBtn = document.getElementById('themeBtn');
        const body = document.body;
        
        if (localStorage.getItem('darkMode') === 'false') {{
            body.classList.remove('dark-mode');
            themeBtn.innerHTML = '<i class="fa fa-moon-o"></i>';
        }}
        
        themeBtn.addEventListener('click', function() {{
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            themeBtn.innerHTML = isDark ? '<i class="fa fa-sun-o"></i>' : '<i class="fa fa-moon-o"></i>';
        }});

        document.querySelectorAll('.top-category-btn').forEach(btn => {{
            btn.addEventListener('click', function() {{
                document.querySelectorAll('.top-category-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const topCategoryId = this.dataset.topCategory;
                
                document.querySelectorAll('.category-tab').forEach(tab => {{
                    if (tab.dataset.topCategory === topCategoryId) {{
                        tab.style.display = 'block';
                    }} else {{
                        tab.style.display = 'none';
                        tab.classList.remove('active');
                    }}
                }});
                
                const firstTab = document.querySelector('.category-tab[data-top-category="' + topCategoryId + '"]');
                if (firstTab) {{
                    firstTab.classList.add('active');
                    const firstCategory = firstTab.dataset.category;
                    
                    document.querySelectorAll('.category-section').forEach(section => {{
                        if (section.dataset.category === firstCategory) {{
                            section.style.display = 'block';
                        }} else {{
                            section.style.display = 'none';
                        }}
                    }});
                    
                    document.querySelectorAll('.subcategory-nav').forEach(nav => {{
                        if (nav.dataset.category === firstCategory) {{
                            nav.style.display = 'flex';
                        }} else {{
                            nav.style.display = 'none';
                        }}
                    }});
                }}
            }});
        }});

        document.querySelectorAll('.category-tab').forEach(tab => {{
            tab.addEventListener('click', function() {{
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.dataset.category;
                const sections = document.querySelectorAll('.category-section');
                const navs = document.querySelectorAll('.subcategory-nav');
                
                sections.forEach(section => {{
                    if (section.dataset.category === category) {{
                        section.style.display = 'block';
                    }} else {{
                        section.style.display = 'none';
                    }}
                }});
                
                navs.forEach(nav => {{
                    if (nav.dataset.category === category) {{
                        nav.style.display = 'flex';
                    }} else {{
                        nav.style.display = 'none';
                    }}
                }});
            }});
        }});

        document.querySelectorAll('.category-section').forEach(section => {{
            if (section.dataset.category === '{default_category}') {{
                section.style.display = 'block';
            }} else {{
                section.style.display = 'none';
            }}
        }});
        
        document.querySelectorAll('.subcategory-nav').forEach(nav => {{
            if (nav.dataset.category === '{default_category}') {{
                nav.style.display = 'flex';
            }} else {{
                nav.style.display = 'none';
            }}
        }});
        
        document.querySelectorAll('.category-tab').forEach(tab => {{
            if (tab.dataset.topCategory === '{default_top_category}') {{
                tab.style.display = 'block';
            }} else {{
                tab.style.display = 'none';
            }}
        }});

        let currentDownloadUrl = '';
        let passwordConfig = {{}};
        let currentPasswordPageId = '';
        
        const passwordModal = document.getElementById('passwordModal');
        const passwordInput = document.getElementById('passwordInput');
        const passwordError = document.getElementById('passwordError');
        const confirmBtn = document.getElementById('confirmBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        
        const SECRET_KEY = "XtwaStudy2026Secret";
        
        function xorDecrypt(data, key) {{
            let result = '';
            for (let i = 0; i < data.length; i++) {{
                result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }}
            return result;
        }}
        
        function decodeUrl(encoded) {{
            if (!encoded || encoded === '#') return encoded;
            if (encoded.startsWith('enc:')) {{
                try {{
                    const base64Decoded = atob(encoded.substring(4));
                    return xorDecrypt(base64Decoded, SECRET_KEY);
                }} catch (e) {{
                    return encoded;
                }}
            }}
            return encoded;
        }}
        
        async function loadPasswordConfig() {{
            try {{
                const response = await fetch('./config/password_config.json?t=' + Date.now());
                const config = await response.json();
                passwordConfig = config.password_pages || {{}};
            }} catch (error) {{
                console.error('Failed to load password config:', error);
            }}
        }}
        
        loadPasswordConfig();
        
        function getPasswordForPage(pageId) {{
            if (passwordConfig[pageId]) {{
                return passwordConfig[pageId].current_number || '';
            }}
            if (passwordConfig['default']) {{
                return passwordConfig['default'].current_number || '';
            }}
            return '';
        }}
        
        function getPasswordPageName(pageId) {{
            if (passwordConfig[pageId]) {{
                return passwordConfig[pageId].name || '密码页面';
            }}
            if (passwordConfig['default']) {{
                return passwordConfig['default'].name || '默认密码';
            }}
            return '密码页面';
        }}
        
        document.querySelectorAll('.download-btn[data-url]').forEach(btn => {{
            btn.addEventListener('click', function(e) {{
                e.preventDefault();
                currentDownloadUrl = this.dataset.url;
                const passwordPageId = this.dataset.password || '';
                
                if (passwordPageId && passwordPageId !== 'false') {{
                    currentPasswordPageId = passwordPageId;
                    const subcategorySection = this.closest('.subcategory-section');
                    let subcategoryName = '密码';
                    if (subcategorySection) {{
                        const subcategoryTitle = subcategorySection.querySelector('.subcategory-title');
                        if (subcategoryTitle) {{
                            subcategoryName = subcategoryTitle.textContent.trim();
                        }}
                    }}
                    document.querySelector('.password-modal-title').innerHTML = `<i class="fa fa-folder-o"></i> 请输入${{subcategoryName}}密码`;
                    passwordModal.classList.add('show');
                    passwordInput.value = '';
                    passwordError.classList.remove('show');
                    passwordInput.classList.remove('error');
                    passwordInput.focus();
                }} else {{
                    const decodedUrl = decodeUrl(currentDownloadUrl);
                    if (decodedUrl && decodedUrl !== '#') {{
                        window.open(decodedUrl, '_blank');
                    }} else {{
                        alert('下载链接未配置');
                    }}
                }}
            }});
        }});
        
        cancelBtn.addEventListener('click', function() {{
            passwordModal.classList.remove('show');
            currentDownloadUrl = '';
        }});
        
        passwordModal.addEventListener('click', function(e) {{
            if (e.target === passwordModal) {{
                passwordModal.classList.remove('show');
                currentDownloadUrl = '';
            }}
        }});
        
        function verifyPassword(input, pageId) {{
            const correctPassword = getPasswordForPage(pageId);
            return input === correctPassword;
        }}
        
        confirmBtn.addEventListener('click', function() {{
            const inputPassword = passwordInput.value.trim();
            
            if (verifyPassword(inputPassword, currentPasswordPageId)) {{
                passwordModal.classList.remove('show');
                const decodedUrl = decodeUrl(currentDownloadUrl);
                if (decodedUrl && decodedUrl !== '#') {{
                    window.open(decodedUrl, '_blank');
                }} else {{
                    alert('下载链接未配置');
                }}
            }} else {{
                passwordError.classList.add('show');
                passwordInput.classList.add('error');
                setTimeout(() => {{
                    passwordInput.classList.remove('error');
                }}, 300);
            }}
        }});
        
        passwordInput.addEventListener('keypress', function(e) {{
            if (e.key === 'Enter') {{
                confirmBtn.click();
            }}
        }});
        
        passwordInput.addEventListener('input', function() {{
            passwordError.classList.remove('show');
        }});
    </script>
    <script src="./js/countdown.js"></script>
</body>
</html>
'''

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    config_path = os.path.join(project_root, 'config', 'download_config.json')
    output_path = os.path.join(project_root, 'download.html')
    
    config = load_config(config_path)
    html_content = generate_html(config)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Generated download.html at {output_path}")
    print(f"Generated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == '__main__':
    main()
