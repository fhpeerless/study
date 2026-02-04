// 在app.js顶部添加版本号生成函数


const subjectChapters = {
    bookmap: 7,
    police考试:12,
    css: 20,
    html: 20,
    python: 7,
    english: 7,  
    politics101: 7  
};


// 替换原有的固定版本号

// 新增：笔记文件缓存版本号（更新笔记后，修改此版本号即可触发全量刷新）
const NOTE_CACHE_VERSION = "v20251111"; // 格式：v+日期/迭代号，如 v20251031、v3

// 错误处理：捕获并记录未处理的错误
window.addEventListener('error', function(event) {
    console.error('全局错误捕获:', event.error);
    console.error('错误信息:', event.message);
    console.error('错误堆栈:', event.error ? event.error.stack : '无堆栈信息');
});

// DOM 元素
const chapterList = document.getElementById('chapterList');
const notePlaceholder = document.getElementById('notePlaceholder');
const noteContentArea = document.getElementById('noteContentArea');
const themeBtn = document.getElementById('themeBtn');
// 当前选中的学科和章节
// let currentSubject = 'htmlcssjs';
// let currentChapter = null;


// 当前选中的学科和章节
// 原代码：let currentSubject = 'htmlcssjs';
let currentSubject = ''; // 先初始化为空，后续设置为第一个学科
let currentChapter = null;

// 初始化页面
// 初始化页面
function init() {
    // 1. 动态生成学科按钮（内部已绑定事件，无需重复绑定）
    generateSubjectButtons();
    // 2. 加载默认学科（改为第一个学科）
    // 原代码：loadChapters('htmlcssjs');
    const firstSubject = Object.keys(subjectChapters)[0]; // 获取第一个学科
    currentSubject = firstSubject; // 设置当前学科为第一个
    loadChapters(currentSubject); // 加载第一个学科的章节
    // 3. 绑定主题切换事件
    themeBtn.addEventListener('click', toggleTheme);
    // 4. 检查本地存储的主题设置
    checkThemePreference();
    // 5. 初始化侧边导航栏
    initSidebar();
}

// 初始化侧边导航栏
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    
    // 显示侧边栏
    function showSidebar() {
        sidebar.classList.add('show');
        sidebarOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    // 隐藏侧边栏
    function hideSidebar() {
        sidebar.classList.remove('show');
        sidebarOverlay.classList.remove('show');
        document.body.style.overflow = ''; // 恢复背景滚动
    }
    
    // 绑定事件
    sidebarToggleBtn.addEventListener('click', showSidebar);
    sidebarCloseBtn.addEventListener('click', hideSidebar);
    sidebarOverlay.addEventListener('click', hideSidebar);
    
    // 按ESC键隐藏侧边栏
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('show')) {
            hideSidebar();
        }
    });
}

// 动态生成学科按钮（含点击事件绑定，避免重复）
function generateSubjectButtons() {
    const buttonContainer = document.getElementById('dynamicSubjectButtons');
    buttonContainer.innerHTML = ''; // 清空原有按钮

    // 获取所有学科并按顺序排列
    const subjects = Object.keys(subjectChapters);
    // 遍历学科章节映射生成按钮
    subjects.forEach(subject => {
        const btn = document.createElement('button');
        btn.className = 'subject-btn';
        btn.dataset.subject = subject;
        btn.textContent = subject.toUpperCase();
        // 设置默认激活状态（改为第一个学科）
        // 原代码：if (subject === 'htmlcssjs') btn.classList.add('active');
        if (subject === subjects[0]) btn.classList.add('active'); // 第一个学科默认激活

        // 按钮点击事件（保持不变）
        btn.addEventListener('click', () => {
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSubject = subject;
            currentChapter = null;
            loadChapters(subject);
            notePlaceholder.style.display = 'flex';
            noteContentArea.style.display = 'none';
        });

        buttonContainer.appendChild(btn);
    });
}

// 加载章节列表
function loadChapters(subject) {
    // 清空章节列表
    chapterList.innerHTML = '';
    // 获取章节数量
    const chapterCount = subjectChapters[subject] || 0;
    // 生成章节列表项
    for (let i = 1; i <= chapterCount; i++) {
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        chapterItem.dataset.chapter = i;
        chapterItem.dataset.subject = subject;
        // 临时标题（加载完成后替换）
        chapterItem.textContent = `${i}. 加载中...`;
        // 预加载章节标题
        fetchChapterTitle(subject, i, chapterItem);
        // 章节点击事件
        chapterItem.addEventListener('click', () => {
            // 切换章节激活状态
            document.querySelectorAll('.chapter-item').forEach(item => item.classList.remove('active'));
            chapterItem.classList.add('active');
            // 加载并显示笔记
            loadAndShowNote(subject, i);
        });
        chapterList.appendChild(chapterItem);
    }
}

// 预加载章节标题（更新章节列表显示）
// 预加载章节标题（更新：显示笔记数量）
// 修改为从章节标题文件加载标题
function fetchChapterTitle(subject, chapter, element) {
    // 导入该学科的章节标题文件
    import(`../notes/${subject}/chapters.js?v=${NOTE_CACHE_VERSION}`)
        .then(module => {
            const chapterTitles = module.default; // 获取章节标题数组
            // 获取对应章节的标题（章节号从1开始，数组索引从0开始）
            const title = chapterTitles[chapter - 1] || `第${chapter}章`;
            // 同时加载该章节的笔记数量
            import(`../notes/${subject}/chapter${chapter}.js?v=${NOTE_CACHE_VERSION}`)
                .then(noteModule => {
                    const notes = noteModule.default;
                    // element.textContent = `${chapter}. - ${title}      ${notes.length}篇`;
                    element.textContent = `${chapter}. - ${title}     `;
                })
                .catch(() => {
                   //  element.textContent = `${chapter}. - ${title}      0篇`;
                    element.textContent = `${chapter}. - ${title} `;
                });
        })
        .catch(error => {
            console.error(`加载${subject}章节标题文件失败:`, error);
            element.textContent = `${chapter}. 章节标题加载失败`;
            element.style.color = '#e74c3c';
        });
}

// 加载并显示笔记内容
// 加载并显示笔记内容（更新：支持多笔记渲染）
function loadAndShowNote(subject, chapter) {
    notePlaceholder.style.display = 'none';
    noteContentArea.style.display = 'block';
    noteContentArea.innerHTML = '<div class="loading"><i class="fa fa-spinner fa-spin"></i> 加载中...</div>';

    import(`../notes/${subject}/chapter${chapter}.js?v=${NOTE_CACHE_VERSION}`)
        .then(module => {
            const notes = module.default; // 笔记数组
            if (!Array.isArray(notes) || notes.length === 0) {
                throw new Error("该章节无有效笔记");
            }
            showMultipleNotes(notes); // 调用新的多笔记渲染函数
        })
        .catch(error => {
            console.error(`加载章节 ${chapter} 失败:`, error);
            noteContentArea.innerHTML = `
                <div class="error">
                    <i class="fa fa-exclamation-triangle"></i>
                    <p>章节加载失败，请检查文件路径</p>
                    <p style="font-size:12px;margin-top:10px;">错误信息: ${error.message}</p>
                </div>
            `;
        });
}

// 在处理笔记内容时，对<style>标签进行作用域转换
function scopedStyle(content, scopedClass) {
    // 匹配<style>标签内容（简单处理，复杂场景可使用DOM解析）
    return content.replace(/<style>([\s\S]*?)<\/style>/g, (match, css) => {
        // 给CSS选择器添加作用域前缀（处理常见选择器场景）
        const scopedCss = css
            // 处理元素选择器（如 p -> .note-scoped-0 p）
            .replace(/([^\n{}#.]+)(?=\s*\{)/g, `.${scopedClass} $1`)
            // 处理类选择器（如 .nimei -> .note-scoped-0 .nimei）
            .replace(/(\.)([a-zA-Z0-9_-]+)(?=\s*\{)/g, `.${scopedClass} $&`)
            // 处理ID选择器（如 #test -> .note-scoped-0 #test）
            .replace(/(#)([a-zA-Z0-9_-]+)(?=\s*\{)/g, `.${scopedClass} $&`);
        return `<style>${scopedCss}</style>`;
    });
}

// 初始化markdown-it实例
const md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true
});

// 修改markdown-it的链接渲染规则，让所有链接在新窗口中打开
const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    // 为所有链接添加target="_blank"和rel="noopener noreferrer"属性
    let aIndex = tokens[idx].attrIndex('target');
    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']);
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank';
    }
    
    // 添加安全属性
    aIndex = tokens[idx].attrIndex('rel');
    if (aIndex < 0) {
        tokens[idx].attrPush(['rel', 'noopener noreferrer']);
    } else {
        tokens[idx].attrs[aIndex][1] = 'noopener noreferrer';
    }
    
    // 调用默认渲染器
    return defaultRender(tokens, idx, options, env, self);
};

// 修改markdown-it的图片渲染规则，支持自定义宽度和高度
const defaultImageRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};

md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const titleIndex = token.attrIndex('title');
    
    if (titleIndex >= 0) {
        const title = token.attrs[titleIndex][1];
        const widthMatch = title.match(/width=(\d+)/);
        const heightMatch = title.match(/height=(\d+)/);
        
        if (widthMatch) {
            token.attrPush(['width', widthMatch[1]]);
        }
        if (heightMatch) {
            token.attrPush(['height', heightMatch[1]]);
        }
        // 如果title是尺寸信息，可以选择不移除title属性，因为可能还有其他用途
    }
    
    // 添加懒加载
    if (token.attrIndex('loading') < 0) {
        token.attrPush(['loading', 'lazy']);
    }
    
    // 调用默认渲染器
    return defaultImageRender(tokens, idx, options, env, self);
};

// 添加代码块复制功能的CSS样式
const copyButtonStyle = `
<style>
    /* 代码块复制按钮样式 */
    .code-block-container {
        position: relative;
        margin: 1em 0;
        border: 1px solid #FFA500;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    /* 代码高亮样式 */
    .code-block-container pre {
        background-color: #f5f5f5 !important;
        margin: 0 !important;
        padding: 15px !important;
        overflow-x: auto;
    }
    
    .code-block-container code {
        background-color: transparent !important;
        font-family: 'Courier New', Courier, monospace;
        font-size: 13px;
        line-height: 1.5;
    }
    
    /* 语法高亮颜色 */
    .code-block-container code .keyword {
        color: #0000FF;
    }
    
    .code-block-container code .string {
        color: #008000;
    }
    
    .code-block-container code .comment {
        color: #808080;
        font-style: italic;
    }
    
    .code-block-container code .number {
        color: #FF0000;
    }
    
    .code-block-container code .function {
        color: #000080;
    }
    
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #800020;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .copy-button:hover {
        background: #660015;
        transform: translateY(-1px);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }
    
    .copy-button:active {
        transform: translateY(0);
    }
    
    .copy-button.copied {
        background: #FF4500;
        content: '已复制!';
    }
    
    /* 移除文本背景色，但排除复制按钮 */
    .note-content-area *:not(.copy-button) {
        background-color: transparent !important;
        background-image: none !important;
    }
    
    /* 特别针对加粗文本 */
    .note-content-area strong,
    .note-content-area b {
        background-color: transparent !important;
        background-image: none !important;
        padding: 0 !important;
    }
    
    /* 确保复制按钮背景色正常显示 */
    .copy-button {
        background: #800020 !important;
    }
    
    .copy-button:hover {
        background: #660015 !important;
    }
    
    .copy-button.copied {
        background: #FF4500 !important;
    }
    
    /* 深色模式下的复制按钮 */
    body.dark-mode .copy-button {
        background: #8B0000 !important;
    }
    
    body.dark-mode .copy-button:hover {
        background: #660000 !important;
    }
    
    body.dark-mode .copy-button.copied {
        background: #FF6347 !important;
    }
    
    /* 适配深色模式 */
    body.dark-mode .code-block-container {
        border-color: #FF8C00;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    body.dark-mode .code-block-container pre {
        background-color: #1e1e1e !important;
    }
    
    body.dark-mode .code-block-container code {
        color: #d4d4d4;
    }
    
    body.dark-mode .code-block-container code .keyword {
        color: #569cd6;
    }
    
    body.dark-mode .code-block-container code .string {
        color: #ce9178;
    }
    
    body.dark-mode .code-block-container code .comment {
        color: #6a9955;
    }
    
    body.dark-mode .code-block-container code .number {
        color: #b5cea8;
    }
    
    body.dark-mode .code-block-container code .function {
        color: #dcdcaa;
    }
    
    body.dark-mode .copy-button {
        background: #8B0000;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    body.dark-mode .copy-button:hover {
        background: #660000;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }
    
    body.dark-mode .copy-button.copied {
        background: #FF6347;
    }
</style>`;

// 添加复制按钮样式到页面
document.head.insertAdjacentHTML('beforeend', copyButtonStyle);

// 添加复制功能的JavaScript逻辑
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('copy-button')) {
        const codeBlock = e.target.closest('.code-block-container').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalText = e.target.textContent;
            e.target.textContent = '已复制!';
            e.target.classList.add('copied');
            
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);
        });
    }
});

// 处理markdown中的copy标记，为代码块添加复制功能
function processCopyTags(content) {
    // 匹配带有copy标记的代码块，修复正则表达式
    const copyTagRegex = /```(\w+)\s+copy\s*\n([\s\S]*?)\s*```/g;
    
    return content.replace(copyTagRegex, (match, lang, code) => {
        // 对代码内容进行HTML转义，确保所有代码都显示为纯文本
        const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        // 返回带有复制按钮的代码块HTML
        return `<div class="code-block-container">
    <button class="copy-button">复制</button>
    <pre><code class="language-${lang}">${escapedCode}</code></pre>
</div>`;
    });
}

// 解析HTML单页引入语法，格式：{{html:path/to/file.html,width:100%,height:500px}}
function parseHtmlImport(content) {
    // 修复正则表达式：确保能正确匹配模板字符串中的HTML引入语法
    // 分两步处理：先匹配整个{{html:...}}块，再提取参数
    const htmlImportRegex = /\{\{\s*html\s*:\s*([^,}]+)(?:\s*,\s*width\s*:\s*([^,}]+))?(?:\s*,\s*height\s*:\s*([^,}]+))?\s*\}\}/g;
    return content.replace(htmlImportRegex, (match, filePath, width, height) => {
        const defaultWidth = width ? width.trim() : '100%';
        const defaultHeight = height ? height.trim() : '600px';
        // 移除../前缀，使路径相对于服务器根目录
        const correctedPath = filePath.trim().replace(/^\.\.\//g, '');
        return `<iframe src="${correctedPath}" style="width: ${defaultWidth}; height: ${defaultHeight}; border: none;" frameborder="0" allowfullscreen="true"></iframe>`;
    });
}

// 新增：渲染多篇笔记（每篇笔记保留原有样式，加分隔线）
// 渲染多篇笔记（第3步：调用scopedStyle）
function showMultipleNotes(notes) {

    // 1. 生成目录HTML
    let tocHtml = `
        <div class="notes-toc">
            <h3 class="toc-title">目录<span class="toc-hint">（点击目录项可跳转到对应笔记位置）</span></h3>
            <ul class="toc-list">
    `;
    // 遍历笔记生成目录项（同时记录锚点ID）
    notes.forEach((note, index) => {
        const noteId = `note-${index}`; // 每篇笔记的唯一锚点ID
        tocHtml += `
            <li class="toc-item">
                <a href="#${noteId}" class="toc-link">${index + 1}. ${note.title}</a>
            </li>
        `;
    });
    tocHtml += `
            </ul>
        </div>
    `;

    // 2. 生成笔记内容HTML（在原有基础上添加锚点ID）
    let allNotesHtml = '';
    notes.forEach((note, index) => {
        const scopedClass = `note-scoped-${index}`;
        const noteId = `note-${index}`; // 与目录锚点对应
        let noteHtml = `
            ${index > 0 ? '<div class="note-separator"></div>' : ''}
            <!-- 添加锚点ID，用于目录跳转 -->
            <div id="${noteId}" class="single-note ${scopedClass}"> 
                <h2 class="note-title">${index + 1}. ${note.title}</h2>
                <div class="note-meta">
                    <i class="fa fa-clock-o"></i>
                    <span>${note.timestamp}</span>
                </div>
                <div class="note-body">
        `;

        // 处理笔记内容：只支持contentmd格式
        if (note.contentmd) {
            // 处理contentmd：markdown格式
            let mdContent = note.contentmd;
            // 1. 处理代码块的copy标记
            mdContent = processCopyTags(mdContent);
            // 2. 解析HTML单页引入
            mdContent = parseHtmlImport(mdContent);
            // 3. 再将markdown转换为HTML
            let htmlContent = md.render(mdContent);
            const scopedContent = scopedStyle(htmlContent, scopedClass);
            noteHtml += scopedContent;
        }



        // 处理嵌入内容
        if (note.embed && note.embed.trim() !== '') {
            noteHtml += `<div class="note-embed">${note.embed}</div>`;
        }

        noteHtml += `
                </div>
            </div>
        `;
        allNotesHtml += noteHtml; // 拼接单篇笔记到总HTML
    });

    // 3. 合并目录和笔记内容，渲染到页面
    noteContentArea.innerHTML = tocHtml + allNotesHtml;
}

//--------------- 目录滚动高亮功能
const tocLinks = document.querySelectorAll('.toc-link');
const sections = document.querySelectorAll('.single-note');

function highlightTocOnScroll() {
    let scrollPosition = window.scrollY + 100; // 偏移100px提前高亮

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const tocLink = tocLinks[index];

        // 判断当前滚动位置是否在当前章节范围内
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            tocLinks.forEach(link => link.classList.remove('active'));
            tocLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightTocOnScroll);


// 渲染笔记内容到页面
function showNote(note) {
    // 构建笔记HTML结构
    let contentHtml = `
        <h2 class="note-title">${note.title}</h2>
        <div class="note-meta">
            <i class="fa fa-clock-o"></i>
            <span>${note.timestamp}</span>
        </div>
        <div class="note-body">
    `;

    // 处理内容：支持content和contentmd两种格式
    if (note.contentmd) {
        // 处理contentmd：markdown格式
        let mdContent = note.contentmd;
        // 1. 处理代码块的copy标记
        mdContent = processCopyTags(mdContent);
        // 2. 先解析HTML单页引入
        mdContent = parseHtmlImport(mdContent);
        // 3. 再将markdown转换为HTML
        contentHtml += md.render(mdContent);
    } else if (note.content) {
        // 原有content格式处理
        if (Array.isArray(note.content)) {
            note.content.forEach(content => contentHtml += `<p>${content}</p>`);
        } else {
            contentHtml += `<p>${content}</p>`;
        }
    }



    // 处理嵌入内容（如视频）
    if (note.embed && note.embed.trim() !== '') {
        contentHtml += `<div class="note-embed">${note.embed}</div>`;
    }

    contentHtml += '</div>';
    noteContentArea.innerHTML = contentHtml;
}

// 主题切换（明暗模式）
function toggleTheme() {
  // 先检查当前是否为暗黑模式（切换前的状态）
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  // 切换主题类（如果是暗黑模式则移除，反之添加）
  document.body.classList.toggle('dark-mode');
  
  // 切换后的状态（与切换前相反）
  const isDarkAfterToggle = !isDarkMode;
  
  // 更新按钮图标（暗黑模式显示太阳，亮色模式显示月亮）
  themeBtn.innerHTML = isDarkAfterToggle ? '<i class="fa fa-sun-o"></i>' : '<i class="fa fa-moon-o"></i>';
  
  // 保存切换后的主题到本地存储
  localStorage.setItem('theme', isDarkAfterToggle ? 'dark' : 'light');
}

// 检查本地主题偏好（初始化时生效）
function checkThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  // 检测系统是否偏好暗黑模式
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 逻辑优先级：本地存储 > 系统偏好 > 默认暗黑
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.innerHTML = '<i class="fa fa-sun-o"></i>';
  } else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    themeBtn.innerHTML = '<i class="fa fa-moon-o"></i>';
  } else {
    // 没有本地存储时，使用系统偏好（如果系统偏好暗黑则启用，否则仍默认暗黑）
    if (prefersDark) {
      document.body.classList.add('dark-mode');
      themeBtn.innerHTML = '<i class="fa fa-sun-o"></i>';
    } else {
      // 系统偏好亮色时，仍默认启用暗黑（保持需求中的默认暗黑）
      document.body.classList.add('dark-mode');
      themeBtn.innerHTML = '<i class="fa fa-sun-o"></i>';
    }
    // 保存当前模式到本地存储
    localStorage.setItem('theme', 'dark');
  }
}

// 添加加载/错误状态样式（避免CSS依赖）
const style = document.createElement('style');
style.textContent = `
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 300px;
        color: #7f8c8d;
    }
    .loading i {
        font-size: 40px;
        margin-right: 15px;
        animation: spin 1s linear infinite;
    }
    .error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 300px;
        color: #e74c3c;
        text-align: center;
        padding: 0 20px;
    }
    .error i {
        font-size: 40px;
        margin-bottom: 15px;
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
     /* 新增：多篇笔记分隔线 */
    .note-separator {
        height: 1px;
        width: 100%;
        margin: 30px 0;
        background-color: #e0e0e0;
    }
    body.dark-mode .note-separator {
        background-color: #333;
    }

    /* 新增：单篇笔记间距优化 */
    .single-note {
        margin-bottom: 20px;
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化

document.addEventListener('DOMContentLoaded', init);



















