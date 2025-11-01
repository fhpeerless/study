// 学科章节映射
// 学科章节映射
const subjectChapters = {
    htmlcssjs: 12,  
    css: 1,    
    javascript: 1,  
    python: 1   
};
// 新增：笔记文件缓存版本号（更新笔记后，修改此版本号即可触发全量刷新）
const NOTE_CACHE_VERSION = "v20251031"; // 格式：v+日期/迭代号，如 v20251031、v3



// DOM 元素
const chapterList = document.getElementById('chapterList');
const notePlaceholder = document.getElementById('notePlaceholder');
const noteContentArea = document.getElementById('noteContentArea');
const themeBtn = document.getElementById('themeBtn');
// 当前选中的学科和章节
let currentSubject = 'html';
let currentChapter = null;

// 初始化页面
function init() {
    // 1. 动态生成学科按钮（内部已绑定事件，无需重复绑定）
    generateSubjectButtons();
    // 2. 加载默认学科（HTML）的章节
    loadChapters('html');
    // 3. 绑定主题切换事件
    themeBtn.addEventListener('click', toggleTheme);
    // 4. 检查本地存储的主题设置
    checkThemePreference();
}

// 动态生成学科按钮（含点击事件绑定，避免重复）
function generateSubjectButtons() {
    const buttonContainer = document.getElementById('dynamicSubjectButtons');
    buttonContainer.innerHTML = ''; // 清空原有按钮

    // 遍历学科章节映射生成按钮
    Object.keys(subjectChapters).forEach(subject => {
        const btn = document.createElement('button');
        btn.className = 'subject-btn';
        btn.dataset.subject = subject;
        btn.textContent = subject.toUpperCase();
        // 设置默认激活状态（首次加载HTML学科）
        if (subject === 'html') btn.classList.add('active');

        // 按钮点击事件（仅绑定一次）
        btn.addEventListener('click', () => {
            // 切换所有按钮激活状态
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // 更新当前学科并加载章节
            currentSubject = subject;
            currentChapter = null;
            loadChapters(subject);
            // 显示占位符，隐藏笔记内容
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
function fetchChapterTitle(subject, chapter, element) {
    import(`../notes/${subject}/chapter${chapter}.js`)
        .then(module => {
            const notes = module.default; // 现在获取的是笔记数组
            // 显示「第X章（N篇笔记）」，若有第一篇笔记则拼接标题
            const firstNoteTitle = notes[0]?.title || "笔记集合";
           // element.textContent = `${chapter}. /* 第${chapter}章（${notes.length}篇笔记） */- ${firstNoteTitle}`;
            element.textContent = `${chapter}. - ${firstNoteTitle}`;
        })
        .catch(error => {
            console.error(`加载章节 ${chapter} 标题失败:`, error);
            element.textContent = `${chapter}. 章节加载失败`;
            element.style.color = '#e74c3c';
        });
}

// 加载并显示笔记内容
// 加载并显示笔记内容（更新：支持多笔记渲染）
function loadAndShowNote(subject, chapter) {
    notePlaceholder.style.display = 'none';
    noteContentArea.style.display = 'block';
    noteContentArea.innerHTML = '<div class="loading"><i class="fa fa-spinner fa-spin"></i> 加载中...</div>';

    import(`../notes/${subject}/chapter${chapter}.js`)
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

// 新增：渲染多篇笔记（每篇笔记保留原有样式，加分隔线）
function showMultipleNotes(notes) {
    let allNotesHtml = ''; // 汇总所有笔记的HTML

    notes.forEach((note, index) => {
        // 单篇笔记的HTML结构（复用原showNote逻辑，加索引区分）
        let noteHtml = `
            <!-- 笔记分隔线（除第一篇外添加） -->
            ${index > 0 ? '<div class="note-separator"></div>' : ''}
            <div class="single-note">
                <h2 class="note-title">${index + 1}. ${note.title}</h2> <!-- 加笔记序号 -->
                <div class="note-meta">
                    <i class="fa fa-clock-o"></i>
                    <span>${note.timestamp}</span>
                </div>
                <div class="note-body">
        `;

        // 处理笔记内容（字符串/数组）
        if (Array.isArray(note.content)) {
            note.content.forEach(content => noteHtml += `<p>${content}</p>`);
        } else {
            noteHtml += `<p>${note.content}</p>`;
        }

        // 处理图片
        if (note.images && note.images.length > 0) {
            noteHtml += '<div class="note-images">';
            note.images.forEach((imageUrl, imgIdx) => {
                noteHtml += `
                    <div class="note-image">
                        <img src="${imageUrl}" alt="笔记${index + 1}图片${imgIdx + 1}" loading="lazy" 
                             onerror="this.src='https://picsum.photos/400/300';this.alt='图片加载失败'">
                    </div>
                `;
            });
            noteHtml += '</div>';
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

    // 渲染所有笔记到页面
    noteContentArea.innerHTML = allNotesHtml;
}

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

    // 处理内容（支持字符串/数组格式）
    if (Array.isArray(note.content)) {
        note.content.forEach(content => contentHtml += `<p>${content}</p>`);
    } else {
        contentHtml += `<p>${note.content}</p>`;
    }

    // 处理图片（支持多张图片）
    if (note.images && note.images.length > 0) {
        contentHtml += '<div class="note-images">';
        note.images.forEach((imageUrl, idx) => {
            contentHtml += `
                <div class="note-image">
                    <img src="${imageUrl}" alt="笔记图片${idx+1}" loading="lazy" 
                         onerror="this.src='https://picsum.photos/400/300';this.alt='图片加载失败'">
                </div>
            `;
        });
        contentHtml += '</div>';
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
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    // 更新主题图标
    themeBtn.innerHTML = isDarkMode ? '<i class="fa fa-sun-o"></i>' : '<i class="fa fa-moon-o"></i>';
    // 保存主题偏好到本地存储
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// 检查本地主题偏好（初始化时生效）
function checkThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeBtn.innerHTML = '<i class="fa fa-sun-o"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeBtn.innerHTML = '<i class="fa fa-moon-o"></i>';
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
