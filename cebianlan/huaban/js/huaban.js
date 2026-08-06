const styleConfig = {"body_bg": "#2c2c2c", "body_color": "#e0e0e0", "card_bg": "#3d3d3d", "card_hover_bg": "#4a4a4a", "primary_color": "#8b7355", "primary_hover": "#6b5344", "root_node_color": "#d4a574", "leaf_node_color": "#90ee90", "text_primary": "#ffffff", "text_secondary": "#a0a0a0", "container_max_width": "1200px", "card_radius": "12px", "btn_radius": "8px", "node_radius": "40px", "node_font_size": "14px", "link_color": "#7c7c94", "link_width": "2px"};

let categories = [];
let currentCategoryPath = [];
let currentQuestions = [];
let currentQuestionIndex = 0;

let questions = [];

let currentTool = 'chalk';
let currentColor = '#ffffff';
let drawingCanvas, drawingCtx;
let lastX = 0, lastY = 0;
let points = [];

let pages = [null];
let currentPageIndex = 0;

function initDrawingCanvas() {
    drawingCanvas = document.getElementById('drawingCanvas');
    drawingCtx = drawingCanvas.getContext('2d');
    
    const container = document.querySelector('.tree-visualization');
    drawingCanvas.width = container.clientWidth;
    drawingCanvas.height = container.clientHeight;
    
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';
}

function saveCurrentPage() {
    if (!drawingCanvas || !drawingCtx) return;
    pages[currentPageIndex] = drawingCtx.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height);
}

function loadPage(index) {
    if (!drawingCanvas || !drawingCtx) return;
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    if (pages[index]) {
        drawingCtx.putImageData(pages[index], 0, 0);
    }
}

function updatePageUI() {
    const pageCounter = document.getElementById('pageCounter');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const deleteBtn = document.getElementById('deletePageBtn');
    
    pageCounter.textContent = `${currentPageIndex + 1} / ${pages.length}`;
    prevBtn.disabled = currentPageIndex <= 0;
    nextBtn.disabled = currentPageIndex >= pages.length - 1;
    deleteBtn.disabled = pages.length <= 1;
}

function switchToPage(index) {
    if (index < 0 || index >= pages.length) return;
    saveCurrentPage();
    currentPageIndex = index;
    loadPage(currentPageIndex);
    updatePageUI();
}

function addPage() {
    saveCurrentPage();
    currentPageIndex++;
    pages.splice(currentPageIndex, 0, null);
    loadPage(currentPageIndex);
    updatePageUI();
}

function deletePage() {
    if (pages.length <= 1) return;
    pages.splice(currentPageIndex, 1);
    if (currentPageIndex >= pages.length) {
        currentPageIndex = pages.length - 1;
    }
    loadPage(currentPageIndex);
    updatePageUI();
}

function prevPage() {
    if (currentPageIndex > 0) {
        switchToPage(currentPageIndex - 1);
    }
}

function nextPage() {
    if (currentPageIndex < pages.length - 1) {
        switchToPage(currentPageIndex + 1);
    }
}

function updateToolStatus() {
    const toolIcon = document.getElementById('toolIcon');
    const toolName = document.getElementById('toolName');
    
    if (currentTool === 'chalk') {
        toolIcon.className = 'fa fa-paint-brush';
        toolIcon.style.color = currentColor;
        toolName.textContent = '当前工具：粉笔';
    } else {
        toolIcon.className = 'fa fa-eraser';
        toolIcon.style.color = '#5d6d7e';
        toolName.textContent = '当前工具：板擦';
    }
}

function setChalkMode() {
    currentTool = 'chalk';
    
    const drawBtn = document.getElementById('drawBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    
    drawBtn.classList.add('active');
    eraserBtn.classList.remove('active');
    
    drawingCanvas.style.cursor = 'crosshair';
    
    updateToolStatus();
}

function setEraserMode() {
    currentTool = 'eraser';
    
    const drawBtn = document.getElementById('drawBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    
    drawBtn.classList.remove('active');
    eraserBtn.classList.add('active');
    
    drawingCanvas.style.cursor = 'cell';
    
    updateToolStatus();
}

function clearDrawing() {
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    pages[currentPageIndex] = null;
}

function toggleSunlight() {
    const btn = document.getElementById('sunlightBtn');
    const sunlightEffect = document.querySelector('.sunlight-effect');
    const shadowBeam = document.querySelector('.shadow-beam');
    
    btn.classList.toggle('active');
    const isActive = btn.classList.contains('active');
    
    if (isActive) {
        sunlightEffect.classList.remove('hidden');
        shadowBeam.classList.remove('hidden');
    } else {
        sunlightEffect.classList.add('hidden');
        shadowBeam.classList.add('hidden');
    }
}

function drawChalkLine(x1, y1, x2, y2, color) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const steps = Math.max(Math.ceil(distance / 2), 1);
    
    for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        
        drawChalkDot(x, y, color);
    }
}

function drawChalkDot(x, y, color) {
    const radius = 2;
    const density = 0.4;
    
    for (let i = 0; i < 8; i++) {
        const offsetX = (Math.random() - 0.5) * radius * 2;
        const offsetY = (Math.random() - 0.5) * radius * 2;
        const dotRadius = Math.random() * 1.5 + 0.5;
        
        if (Math.random() < density) {
            drawingCtx.beginPath();
            drawingCtx.arc(x + offsetX, y + offsetY, dotRadius, 0, Math.PI * 2);
            drawingCtx.fillStyle = color;
            drawingCtx.globalAlpha = Math.random() * 0.5 + 0.3;
            drawingCtx.fill();
        }
    }
    drawingCtx.globalAlpha = 1;
}

function erase(x, y) {
    const eraserSize = 30;
    drawingCtx.save();
    drawingCtx.beginPath();
    drawingCtx.arc(x, y, eraserSize, 0, Math.PI * 2);
    drawingCtx.clip();
    drawingCtx.clearRect(x - eraserSize, y - eraserSize, eraserSize * 2, eraserSize * 2);
    drawingCtx.restore();
}

function handleDrawingStart(e) {
    if (e.button !== 0) return;
    
    e.preventDefault();
    const rect = drawingCanvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    points = [{x: lastX, y: lastY}];
    
    if (currentTool === 'chalk') {
        drawChalkDot(lastX, lastY, currentColor);
    }
}

function handleDrawingMove(e) {
    if (e.buttons !== 1) return;
    
    e.preventDefault();
    const rect = drawingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (currentTool === 'chalk') {
        drawChalkLine(lastX, lastY, x, y, currentColor);
    } else {
        erase(x, y);
    }
    
    lastX = x;
    lastY = y;
}

function handleDrawingEnd(e) {
    points = [];
}

function selectColor(color, element) {
    currentColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    updateToolStatus();
}

async function loadCategories() {
    try {
        const response = await fetch('categories.json');
        if (!response.ok) {
            throw new Error('无法加载分类配置文件');
        }
        const config = await response.json();
        categories = config.categories || [];
        
        initCategorySelectors();
    } catch (error) {
        console.error('加载分类失败:', error);
        document.getElementById('categoryBreadcrumb').innerHTML = '<span class="breadcrumb-current">加载分类失败</span>';
    }
}

function initCategorySelectors() {
    const level1Select = document.getElementById('level1Select');
    level1Select.innerHTML = '<option value="">选择一级分类</option>';
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        option.dataset.path = cat.path;
        level1Select.appendChild(option);
    });
    
    level1Select.addEventListener('change', function() {
        onLevel1Change(this.value);
    });
    document.getElementById('level2Select').addEventListener('change', function() {
        onLevel2Change(this.value);
    });
    document.getElementById('level3Select').addEventListener('change', function() {
        onLevel3Change(this.value);
    });
    document.getElementById('level4Select').addEventListener('change', function() {
        onLevel4Change(this.value);
    });
}

function onLevel1Change(categoryId) {
    const level2Select = document.getElementById('level2Select');
    const level3Select = document.getElementById('level3Select');
    const level4Select = document.getElementById('level4Select');
    
    level2Select.innerHTML = '<option value="">选择二级分类</option>';
    level3Select.innerHTML = '<option value="">选择三级分类</option>';
    level4Select.innerHTML = '<option value="">选择四级分类</option>';
    level3Select.disabled = true;
    level4Select.disabled = true;
    
    if (!categoryId) {
        level2Select.disabled = true;
        currentCategoryPath = [];
        updateBreadcrumb();
        clearQuestions();
        return;
    }
    
    const category = categories.find(c => c.id === categoryId);
    if (category && category.children) {
        level2Select.disabled = false;
        category.children.forEach(child => {
            const option = document.createElement('option');
            option.value = child.id;
            option.textContent = child.name;
            option.dataset.path = child.path;
            level2Select.appendChild(option);
        });
    }
    
    currentCategoryPath = [category];
    updateBreadcrumb();
    clearQuestions();
}

function onLevel2Change(categoryId) {
    const level1Id = document.getElementById('level1Select').value;
    const level3Select = document.getElementById('level3Select');
    const level4Select = document.getElementById('level4Select');
    
    level3Select.innerHTML = '<option value="">选择三级分类</option>';
    level4Select.innerHTML = '<option value="">选择四级分类</option>';
    level4Select.disabled = true;
    
    if (!categoryId) {
        level3Select.disabled = true;
        const level1Cat = categories.find(c => c.id === level1Id);
        currentCategoryPath = [level1Cat];
        updateBreadcrumb();
        clearQuestions();
        return;
    }
    
    const level1Cat = categories.find(c => c.id === level1Id);
    const level2Cat = level1Cat?.children?.find(c => c.id === categoryId);
    
    if (level2Cat && level2Cat.children) {
        level3Select.disabled = false;
        level2Cat.children.forEach(child => {
            const option = document.createElement('option');
            option.value = child.id;
            option.textContent = child.name;
            option.dataset.path = child.path;
            level3Select.appendChild(option);
        });
    }
    
    currentCategoryPath = [level1Cat, level2Cat];
    updateBreadcrumb();
    clearQuestions();
}

function onLevel3Change(categoryId) {
    const level1Id = document.getElementById('level1Select').value;
    const level2Id = document.getElementById('level2Select').value;
    const level4Select = document.getElementById('level4Select');
    
    level4Select.innerHTML = '<option value="">选择四级分类</option>';
    
    if (!categoryId) {
        level4Select.disabled = true;
        const level1Cat = categories.find(c => c.id === level1Id);
        const level2Cat = level1Cat?.children?.find(c => c.id === level2Id);
        currentCategoryPath = [level1Cat, level2Cat];
        updateBreadcrumb();
        clearQuestions();
        return;
    }
    
    const level1Cat = categories.find(c => c.id === level1Id);
    const level2Cat = level1Cat?.children?.find(c => c.id === level2Id);
    const level3Cat = level2Cat?.children?.find(c => c.id === categoryId);
    
    if (level3Cat && level3Cat.children) {
        level4Select.disabled = false;
        level3Cat.children.forEach(child => {
            const option = document.createElement('option');
            option.value = child.id;
            option.textContent = child.name;
            option.dataset.path = child.path;
            level4Select.appendChild(option);
        });
    }
    
    currentCategoryPath = [level1Cat, level2Cat, level3Cat];
    updateBreadcrumb();
    clearQuestions();
}

async function onLevel4Change(categoryId) {
    const level1Id = document.getElementById('level1Select').value;
    const level2Id = document.getElementById('level2Select').value;
    const level3Id = document.getElementById('level3Select').value;
    
    if (!categoryId) {
        const level1Cat = categories.find(c => c.id === level1Id);
        const level2Cat = level1Cat?.children?.find(c => c.id === level2Id);
        const level3Cat = level2Cat?.children?.find(c => c.id === level3Id);
        currentCategoryPath = [level1Cat, level2Cat, level3Cat];
        updateBreadcrumb();
        clearQuestions();
        return;
    }
    
    const level1Cat = categories.find(c => c.id === level1Id);
    const level2Cat = level1Cat?.children?.find(c => c.id === level2Id);
    const level3Cat = level2Cat?.children?.find(c => c.id === level3Id);
    const level4Cat = level3Cat?.children?.find(c => c.id === categoryId);
    
    currentCategoryPath = [level1Cat, level2Cat, level3Cat, level4Cat];
    updateBreadcrumb();
    
    if (level4Cat) {
        await loadQuestionsFromCategory(level4Cat);
    }
}

function updateBreadcrumb() {
    const breadcrumb = document.getElementById('categoryBreadcrumb');
    
    if (currentCategoryPath.length === 0) {
        breadcrumb.innerHTML = '<span class="breadcrumb-current">请选择分类</span>';
        return;
    }
    
    let html = '';
    currentCategoryPath.forEach((cat, index) => {
        if (index > 0) {
            html += '<span class="breadcrumb-separator">›</span>';
        }
        if (index === currentCategoryPath.length - 1) {
            html += `<span class="breadcrumb-current">${cat.name}</span>`;
        } else {
            html += `<span class="breadcrumb-link" onclick="navigateToLevel(${index})">${cat.name}</span>`;
        }
    });
    
    breadcrumb.innerHTML = html;
}

function navigateToLevel(level) {
    const selects = [
        document.getElementById('level1Select'),
        document.getElementById('level2Select'),
        document.getElementById('level3Select'),
        document.getElementById('level4Select')
    ];
    
    for (let i = level + 1; i < selects.length; i++) {
        selects[i].value = '';
        selects[i].disabled = true;
    }
    
    currentCategoryPath = currentCategoryPath.slice(0, level + 1);
    updateBreadcrumb();
    clearQuestions();
}

async function loadQuestionsFromCategory(category) {
    if (category.questions && category.questions.length > 0) {
        currentQuestions = category.questions;
        currentQuestionIndex = 0;
        displayQuestion(0);
    } else if (category.path) {
        try {
            const response = await fetch(category.path + '/config.json');
            if (!response.ok) {
                throw new Error('无法加载问题文件');
            }
            const config = await response.json();
            currentQuestions = config.questions || [];
            currentQuestionIndex = 0;
            
            if (currentQuestions.length > 0) {
                displayQuestion(0);
            } else {
                showNoQuestions();
            }
        } catch (error) {
            console.error('加载问题失败:', error);
            showNoQuestions();
        }
    } else {
        showNoQuestions();
    }
}

function clearQuestions() {
    currentQuestions = [];
    document.getElementById('questionTitle').textContent = '请选择四级分类';
    document.getElementById('questionText').textContent = '请先在上方选择完整的四级分类，然后查看问题。';
    document.getElementById('questionText').style.display = 'block';
    document.getElementById('questionImageContainer').style.display = 'none';
    document.getElementById('questionCounter').textContent = '0 / 0';
    updateNavButtons();
}

function showNoQuestions() {
    document.getElementById('questionTitle').textContent = '暂无问题';
    document.getElementById('questionText').textContent = '该分类下暂无问题。';
    document.getElementById('questionText').style.display = 'block';
    document.getElementById('questionImageContainer').style.display = 'none';
    document.getElementById('questionCounter').textContent = '0 / 0';
    updateNavButtons();
}

async function loadQuestions() {
    await loadCategories();
}

function displayQuestion(index) {
    if (index < 0 || index >= currentQuestions.length) return;
    
    currentQuestionIndex = index;
    const question = currentQuestions[index];
    
    document.getElementById('questionTitle').textContent = question.title;
    document.getElementById('questionCounter').textContent = `${index + 1} / ${currentQuestions.length}`;
    
    const questionText = document.getElementById('questionText');
    const questionImageContainer = document.getElementById('questionImageContainer');
    
    if (question.content && question.content.trim()) {
        questionText.textContent = question.content;
        questionText.style.display = 'block';
    } else {
        questionText.style.display = 'none';
    }
    
    questionImageContainer.innerHTML = '';
    
    const images = question.images || (question.image ? [question.image] : []);
    const validImages = images.filter(img => img && img.trim());
    
    if (validImages.length > 0) {
        if (validImages.length === 1) {
            questionImageContainer.className = 'question-image-container single';
        } else {
            questionImageContainer.className = 'question-image-container multiple';
        }
        
        validImages.forEach((imgSrc, imgIndex) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'question-image-wrapper';
            
            const img = document.createElement('img');
            img.className = 'question-image';
            img.src = imgSrc;
            img.alt = question.title + ' 图片' + (validImages.length > 1 ? ' ' + (imgIndex + 1) : '');
            img.onerror = function() {
                wrapper.style.display = 'none';
            };
            img.addEventListener('click', function() {
                openImageModal(imgSrc);
            });
            
            wrapper.appendChild(img);
            questionImageContainer.appendChild(wrapper);
        });
        
        questionImageContainer.style.display = 'flex';
    } else {
        questionImageContainer.style.display = 'none';
    }
    
    updateNavButtons();
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    
    prevBtn.disabled = currentQuestionIndex <= 0;
    nextBtn.disabled = currentQuestionIndex >= currentQuestions.length - 1;
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        displayQuestion(currentQuestionIndex - 1);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        displayQuestion(currentQuestionIndex + 1);
    }
}

function openImageModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = imgSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
    initDrawingCanvas();
    setChalkMode();
    loadQuestions();
    clearQuestions();
    
    document.getElementById('drawBtn').addEventListener('click', setChalkMode);
    document.getElementById('eraserBtn').addEventListener('click', setEraserMode);
    document.getElementById('clearBtn').addEventListener('click', clearDrawing);
    document.getElementById('sunlightBtn').addEventListener('click', toggleSunlight);
    document.getElementById('prevQuestion').addEventListener('click', prevQuestion);
    document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
    
    document.getElementById('addPageBtn').addEventListener('click', addPage);
    document.getElementById('prevPageBtn').addEventListener('click', prevPage);
    document.getElementById('nextPageBtn').addEventListener('click', nextPage);
    document.getElementById('deletePageBtn').addEventListener('click', deletePage);
    updatePageUI();
    
    document.getElementById('modalClose').addEventListener('click', closeImageModal);
    document.getElementById('imageModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeImageModal();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
    
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectColor(this.dataset.color, this);
        });
    });
    
    drawingCanvas.addEventListener('mousedown', handleDrawingStart);
    drawingCanvas.addEventListener('mousemove', handleDrawingMove);
    drawingCanvas.addEventListener('mouseup', handleDrawingEnd);
    drawingCanvas.addEventListener('mouseleave', handleDrawingEnd);
    
    drawingCanvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        
        const touch = e.touches[0];
        const rect = drawingCanvas.getBoundingClientRect();
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
        points = [{x: lastX, y: lastY}];
        
        if (currentTool === 'chalk') {
            drawChalkDot(lastX, lastY, currentColor);
        }
    });
    
    drawingCanvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        
        const touch = e.touches[0];
        const rect = drawingCanvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        if (currentTool === 'chalk') {
            drawChalkLine(lastX, lastY, x, y, currentColor);
        } else {
            erase(x, y);
        }
        
        lastX = x;
        lastY = y;
    });
    
    drawingCanvas.addEventListener('touchend', function(e) {
        points = [];
    });
    
    window.addEventListener('resize', function() {
        saveCurrentPage();
        const savedPages = pages.slice();
        initDrawingCanvas();
        pages = savedPages;
        loadPage(currentPageIndex);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            const key = e.key.toLowerCase();
            
            if (key === 'm') {
                e.preventDefault();
                e.stopPropagation();
                setEraserMode();
            } else if (key === 'q') {
                e.preventDefault();
                e.stopPropagation();
                setChalkMode();
            } else if (e.key === 'Delete') {
                e.preventDefault();
                e.stopPropagation();
                clearDrawing();
            } else if (key === 'arrowleft') {
                e.preventDefault();
                e.stopPropagation();
                prevPage();
            } else if (key === 'arrowright') {
                e.preventDefault();
                e.stopPropagation();
                nextPage();
            } else if (key === 'n') {
                e.preventDefault();
                e.stopPropagation();
                addPage();
            }
        }
    }, true);
});
