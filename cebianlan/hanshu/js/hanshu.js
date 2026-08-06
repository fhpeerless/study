const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dfe6e9', '#fd79a8', '#a29bfe', '#6c5ce7', '#00b894',
    '#e17055', '#74b9ff', '#55efc4', '#fab1a0', '#81ecec'
];

let functions = [];
let colorIndex = 0;
let svg, g, xAxis, yAxis, xScale, yScale, zoom;
let currentTransform = null;
let snapEnabled = false;
let snapPointGroup = null;
let currentEquationType = 'expression';

let currentXRange = [-10, 10];
let currentYRange = [-10, 10];

function getNextColor() {
    const color = colors[colorIndex % colors.length];
    colorIndex++;
    return color;
}

const MathFuncs = {
    csc: x => 1 / Math.sin(x),
    sec: x => 1 / Math.cos(x),
    cot: x => 1 / Math.tan(x),
    acsc: x => Math.asin(1 / x),
    asec: x => Math.acos(1 / x),
    acot: x => Math.PI / 2 - Math.atan(x),
    arccsc: x => Math.asin(1 / x),
    arcsec: x => Math.acos(1 / x),
    arccot: x => Math.PI / 2 - Math.atan(x),
    sign: x => (x > 0 ? 1 : (x < 0 ? -1 : 0)),
    sinc: x => (x === 0 ? 1 : Math.sin(x) / x),
    heaviside: x => (x < 0 ? 0 : 1),
    step: x => (x < 0 ? 0 : 1),
    rect: x => (Math.abs(x) <= 0.5 ? 1 : 0),
    tri: x => (Math.abs(x) < 1 ? 1 - Math.abs(x) : 0),
    frac: x => x - Math.floor(x),
    sgn: x => (x > 0 ? 1 : (x < 0 ? -1 : 0)),
    csch: x => 1 / Math.sinh(x),
    sech: x => 1 / Math.cosh(x),
    coth: x => 1 / Math.tanh(x),
    acsch: x => (x > 0 ? Math.asinh(1 / x) : -Math.asinh(-1 / x)),
    asech: x => Math.acosh(1 / x),
    acoth: x => 0.5 * Math.log((x + 1) / (x - 1)),
    ln: x => Math.log(x),
    lg: x => Math.log10(x),
    log2: x => Math.log2(x)
};

function parseExpression(expr) {
    expr = expr.trim();
    
    expr = expr.replace(/\^/g, '**');
    
    expr = expr.replace(/(\d)([a-zA-Z])/g, '$1*$2');
    expr = expr.replace(/([a-zA-Z])(\d)/g, '$1*$2');
    expr = expr.replace(/\)(\d)/g, ')*$1');
    expr = expr.replace(/(\d)\(/g, '$1*(');
    expr = expr.replace(/\)([a-zA-Z])/g, ')*$1');
    expr = expr.replace(/([a-zA-Z])\(/g, '$1(');
    
    expr = expr.replace(/\bsin\b/g, 'Math.sin');
    expr = expr.replace(/\bcos\b/g, 'Math.cos');
    expr = expr.replace(/\btan\b/g, 'Math.tan');
    expr = expr.replace(/\bcsc\b/g, 'MathFuncs.csc');
    expr = expr.replace(/\bsec\b/g, 'MathFuncs.sec');
    expr = expr.replace(/\bcot\b/g, 'MathFuncs.cot');
    expr = expr.replace(/\basin\b/g, 'Math.asin');
    expr = expr.replace(/\bacos\b/g, 'Math.acos');
    expr = expr.replace(/\batan\b/g, 'Math.atan');
    expr = expr.replace(/\bacsc\b/g, 'MathFuncs.acsc');
    expr = expr.replace(/\basec\b/g, 'MathFuncs.asec');
    expr = expr.replace(/\bacot\b/g, 'MathFuncs.acot');
    expr = expr.replace(/\barcsin\b/g, 'Math.asin');
    expr = expr.replace(/\barccos\b/g, 'Math.acos');
    expr = expr.replace(/\barctan\b/g, 'Math.atan');
    expr = expr.replace(/\barccsc\b/g, 'MathFuncs.arccsc');
    expr = expr.replace(/\barcsec\b/g, 'MathFuncs.arcsec');
    expr = expr.replace(/\barccot\b/g, 'MathFuncs.arccot');
    expr = expr.replace(/\bsinh\b/g, 'Math.sinh');
    expr = expr.replace(/\bcosh\b/g, 'Math.cosh');
    expr = expr.replace(/\btanh\b/g, 'Math.tanh');
    expr = expr.replace(/\bcsch\b/g, 'MathFuncs.csch');
    expr = expr.replace(/\bsech\b/g, 'MathFuncs.sech');
    expr = expr.replace(/\bcoth\b/g, 'MathFuncs.coth');
    expr = expr.replace(/\basinh\b/g, 'Math.asinh');
    expr = expr.replace(/\bacosh\b/g, 'Math.acosh');
    expr = expr.replace(/\batanh\b/g, 'Math.atanh');
    expr = expr.replace(/\bacsch\b/g, 'MathFuncs.acsch');
    expr = expr.replace(/\basech\b/g, 'MathFuncs.asech');
    expr = expr.replace(/\bacoth\b/g, 'MathFuncs.acoth');
    expr = expr.replace(/\bsign\b/g, 'MathFuncs.sign');
    expr = expr.replace(/\bsgn\b/g, 'MathFuncs.sgn');
    expr = expr.replace(/\bsinc\b/g, 'MathFuncs.sinc');
    expr = expr.replace(/\bheaviside\b/g, 'MathFuncs.heaviside');
    expr = expr.replace(/\bstep\b/g, 'MathFuncs.step');
    expr = expr.replace(/\brect\b/g, 'MathFuncs.rect');
    expr = expr.replace(/\btri\b/g, 'MathFuncs.tri');
    expr = expr.replace(/\bfrac\b/g, 'MathFuncs.frac');
    expr = expr.replace(/\blog10\b/g, 'Math.log10');
    expr = expr.replace(/\blog2\b/g, 'Math.log2');
    expr = expr.replace(/\blg\b/g, 'MathFuncs.lg');
    expr = expr.replace(/\blog\b/g, 'Math.log');
    expr = expr.replace(/\bln\b/g, 'MathFuncs.ln');
    expr = expr.replace(/\bexp\b/g, 'Math.exp');
    expr = expr.replace(/\bsqrt\b/g, 'Math.sqrt');
    expr = expr.replace(/\babs\b/g, 'Math.abs');
    expr = expr.replace(/\bfloor\b/g, 'Math.floor');
    expr = expr.replace(/\bceil\b/g, 'Math.ceil');
    expr = expr.replace(/\bround\b/g, 'Math.round');
    expr = expr.replace(/\bpow\b/g, 'Math.pow');
    expr = expr.replace(/\bpi\b/g, 'Math.PI');
    expr = expr.replace(/\be\b/g, 'Math.E');
    
    return expr;
}

function evaluateFunction(parsedExpr, x) {
    try {
        const result = eval(parsedExpr);
        if (typeof result === 'number' && isFinite(result)) {
            return result;
        }
        return null;
    } catch (e) {
        return null;
    }
}

function generateData(expr, xMin, xMax, sampleCount) {
    const parsedExpr = parseExpression(expr);
    const data = [];
    const step = (xMax - xMin) / sampleCount;
    
    for (let i = 0; i <= sampleCount; i++) {
        const x = xMin + i * step;
        const y = evaluateFunction(parsedExpr, x);
        data.push({ x, y });
    }
    
    return data;
}

function initGraph() {
    const container = document.getElementById('graph');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    d3.select('#graph').selectAll('*').remove();
    
    svg = d3.select('#graph')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#0f0f1a');
    
    g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const yRangeVal = currentYRange[1] - currentYRange[0];
    const aspectRatio = innerWidth / innerHeight;
    const xRangeVal = yRangeVal * aspectRatio;
    const xCenter = (currentXRange[0] + currentXRange[1]) / 2;
    
    xScale = d3.scaleLinear()
        .domain([xCenter - xRangeVal / 2, xCenter + xRangeVal / 2])
        .range([0, innerWidth]);
    
    yScale = d3.scaleLinear()
        .domain(currentYRange)
        .range([innerHeight, 0]);
    
    const gridGroup = g.append('g').attr('class', 'grid');
    
    const xGrid = gridGroup.append('g')
        .attr('class', 'grid x-grid');
    
    const yGrid = gridGroup.append('g')
        .attr('class', 'grid y-grid');
    
    xAxis = g.append('g')
        .attr('class', 'axis x-axis');
    
    yAxis = g.append('g')
        .attr('class', 'axis y-axis');
    
    const clipId = 'graph-clip';
    svg.append('defs')
        .append('clipPath')
        .attr('id', clipId)
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', innerWidth)
        .attr('height', innerHeight);
    
    g.append('g')
        .attr('class', 'function-lines')
        .attr('clip-path', `url(#${clipId})`);
    
    snapPointGroup = g.append('g')
        .attr('class', 'snap-point-group')
        .style('pointer-events', 'none');
    
    snapPointGroup.append('circle')
        .attr('class', 'snap-point')
        .style('display', 'none');
    
    zoom = d3.zoom()
        .scaleExtent([0.1, 100])
        .on('zoom', (event) => {
            currentTransform = event.transform;
            updateAxes();
            drawAllFunctions();
        });
    
    svg.call(zoom);
    
    currentTransform = d3.zoomIdentity;
    
    svg.on('dblclick', () => {
        resetView();
    });
    
    svg.on('mousemove', (event) => {
        const [px, py] = d3.pointer(event);
        const transform = currentTransform || d3.zoomIdentity;
        const newXScale = transform.rescaleX(xScale);
        const newYScale = transform.rescaleY(yScale);
        const x = newXScale.invert(px - margin.left);
        const y = newYScale.invert(py - margin.top);
        
        if (snapEnabled) {
            const snapX = Math.round(x);
            const snapY = Math.round(y);
            
            updateSnapPoint(snapX, snapY, newXScale, newYScale, margin);
            
            document.getElementById('coordDisplay').textContent = `坐标: (${snapX}, ${snapY})`;
        } else {
            hideSnapPoint();
            document.getElementById('coordDisplay').textContent = `坐标: (${x.toFixed(3)}, ${y.toFixed(3)})`;
        }
    });
    
    svg.on('mouseleave', () => {
        hideSnapPoint();
    });
    
    updateAxes();
}

function updateAxes() {
    const container = document.getElementById('graph');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const transform = currentTransform || d3.zoomIdentity;
    const newXScale = transform.rescaleX(xScale);
    const newYScale = transform.rescaleY(yScale);
    
    const xDomain = newXScale.domain();
    const yDomain = newYScale.domain();
    
    const xTickValues = [];
    const xStart = Math.ceil(xDomain[0]);
    const xEnd = Math.floor(xDomain[1]);
    for (let i = xStart; i <= xEnd; i++) {
        xTickValues.push(i);
    }
    
    const yTickValues = [];
    const yStart = Math.ceil(yDomain[0]);
    const yEnd = Math.floor(yDomain[1]);
    for (let i = yStart; i <= yEnd; i++) {
        yTickValues.push(i);
    }
    
    const xOrigin = newYScale(0);
    const yOrigin = newXScale(0);
    
    const xAxisGen = d3.axisBottom(newXScale)
        .tickValues(xTickValues)
        .tickSize(6);
    
    const yAxisGen = d3.axisLeft(newYScale)
        .tickValues(yTickValues)
        .tickSize(6);
    
    const xGridGen = d3.axisBottom(newXScale)
        .tickValues(xTickValues)
        .tickSize(-innerHeight)
        .tickFormat('');
    
    const yGridGen = d3.axisLeft(newYScale)
        .tickValues(yTickValues)
        .tickSize(-innerWidth)
        .tickFormat('');
    
    g.select('.x-axis')
        .attr('transform', `translate(0,${Math.max(0, Math.min(innerHeight, xOrigin))})`)
        .call(xAxisGen);
    
    g.select('.y-axis')
        .attr('transform', `translate(${Math.max(0, Math.min(innerWidth, yOrigin))},0)`)
        .call(yAxisGen);
    
    g.select('.x-grid')
        .attr('transform', `translate(0,0)`)
        .call(xGridGen);
    
    g.select('.y-grid')
        .attr('transform', `translate(0,0)`)
        .call(yGridGen);
    
    g.selectAll('.axis text')
        .attr('fill', '#aaa')
        .style('font-size', '12px');
    
    g.selectAll('.axis path, .axis line')
        .attr('stroke', '#555');
    
    g.selectAll('.grid line')
        .attr('stroke', '#333')
        .attr('stroke-opacity', 0.6);
    
    g.selectAll('.grid path')
        .attr('stroke', 'none');
}

function drawAllFunctions() {
    const container = document.getElementById('graph');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const transform = currentTransform || d3.zoomIdentity;
    const newXScale = transform.rescaleX(xScale);
    const newYScale = transform.rescaleY(yScale);
    
    const xDomain = newXScale.domain();
    const yDomain = newYScale.domain();
    const sampleCount = parseInt(document.getElementById('sampleCount').value) || 500;
    
    const functionLines = g.select('.function-lines');
    functionLines.selectAll('.function-line').remove();
    functionLines.selectAll('.implicit-line').remove();
    
    functions.forEach((func, index) => {
        if (func.type === 'expression' || !func.type) {
            const data = generateData(func.expr, xDomain[0], xDomain[1], sampleCount);
            
            const line = d3.line()
                .x(d => newXScale(d.x))
                .y(d => newYScale(d.y))
                .defined(d => {
                    if (d.y === null || !isFinite(d.y)) return false;
                    return d.y >= yDomain[0] && d.y <= yDomain[1];
                })
                .curve(d3.curveMonotoneX);
            
            functionLines.append('path')
                .datum(data)
                .attr('class', 'function-line')
                .attr('d', line)
                .attr('stroke', func.color)
                .attr('stroke-width', 2.5);
        } else if (func.type === 'polar') {
            const data = generatePolarData(func.rExpr, func.thetaMin, func.thetaMax, sampleCount);
            
            const line = d3.line()
                .x(d => newXScale(d.x))
                .y(d => newYScale(d.y))
                .defined(d => {
                    if (!isFinite(d.x) || !isFinite(d.y)) return false;
                    return d.x >= xDomain[0] && d.x <= xDomain[1] && d.y >= yDomain[0] && d.y <= yDomain[1];
                })
                .curve(d3.curveCardinal.tension(0.5));
            
            functionLines.append('path')
                .datum(data)
                .attr('class', 'function-line')
                .attr('d', line)
                .attr('stroke', func.color)
                .attr('stroke-width', 2.5)
                .attr('fill', 'none');
        } else if (func.type === 'parametric') {
            const data = generateParametricData(func.xExpr, func.yExpr, func.tMin, func.tMax, sampleCount);
            
            const line = d3.line()
                .x(d => newXScale(d.x))
                .y(d => newYScale(d.y))
                .defined(d => {
                    if (!isFinite(d.x) || !isFinite(d.y)) return false;
                    return d.x >= xDomain[0] && d.x <= xDomain[1] && d.y >= yDomain[0] && d.y <= yDomain[1];
                })
                .curve(d3.curveCardinal.tension(0.5));
            
            functionLines.append('path')
                .datum(data)
                .attr('class', 'function-line')
                .attr('d', line)
                .attr('stroke', func.color)
                .attr('stroke-width', 2.5)
                .attr('fill', 'none');
        } else if (func.type === 'implicit') {
            const contours = generateImplicitData(func.eqExpr, xDomain[0], xDomain[1], yDomain[0], yDomain[1], 100);
            
            contours.forEach(contour => {
                functionLines.append('line')
                    .attr('class', 'implicit-line')
                    .attr('x1', newXScale(contour[0].x))
                    .attr('y1', newYScale(contour[0].y))
                    .attr('x2', newXScale(contour[1].x))
                    .attr('y2', newYScale(contour[1].y))
                    .attr('stroke', func.color)
                    .attr('stroke-width', 1.5);
            });
        }
    });
}

function addFunction(expr) {
    if (!expr || expr.trim() === '') {
        showError('请输入函数表达式');
        return false;
    }
    
    try {
        const parsedExpr = parseExpression(expr);
        const testResult = evaluateFunction(parsedExpr, 1);
        
        const func = {
            id: Date.now(),
            type: 'expression',
            expr: expr.trim(),
            color: getNextColor()
        };
        
        functions.push(func);
        updateFunctionList();
        drawAllFunctions();
        return true;
    } catch (e) {
        showError('无效的函数表达式: ' + e.message);
        return false;
    }
}

function removeFunction(id) {
    functions = functions.filter(f => f.id !== id);
    updateFunctionList();
    drawAllFunctions();
}

function updateFunctionList() {
    const listContainer = document.getElementById('functionList');
    
    if (functions.length === 0) {
        listContainer.innerHTML = '<span style="color: #666; font-size: 14px;">暂无函数，请添加</span>';
        return;
    }
    
    listContainer.innerHTML = functions.map(func => {
        let displayExpr = '';
        let typeLabel = '';
        
        switch(func.type) {
            case 'expression':
            default:
                displayExpr = `y = ${func.expr}`;
                typeLabel = '表达式';
                break;
            case 'polar':
                displayExpr = func.expr;
                typeLabel = '极坐标';
                break;
            case 'parametric':
                displayExpr = func.expr;
                typeLabel = '参数';
                break;
            case 'implicit':
                displayExpr = func.expr;
                typeLabel = '隐式';
                break;
        }
        
        return `
            <div class="function-item" data-id="${func.id}">
                <span class="function-type">${typeLabel}</span>
                <span class="function-color" style="background-color: ${func.color}"></span>
                <span class="function-expr">${displayExpr}</span>
                <button class="function-remove" onclick="removeFunction(${func.id})">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `;
    }).join('');
}

function showError(message) {
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        document.querySelector('.input-panel').appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

function clearError() {
    const errorDiv = document.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

function applyRange() {
    const xMin = parseFloat(document.getElementById('xMin').value);
    const xMax = parseFloat(document.getElementById('xMax').value);
    const yMin = parseFloat(document.getElementById('yMin').value);
    const yMax = parseFloat(document.getElementById('yMax').value);
    
    if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
        showError('请输入有效的数值');
        return;
    }
    
    if (xMin >= xMax) {
        showError('X轴最小值必须小于最大值');
        return;
    }
    
    if (yMin >= yMax) {
        showError('Y轴最小值必须小于最大值');
        return;
    }
    
    currentXRange = [xMin, xMax];
    currentYRange = [yMin, yMax];
    
    initGraph();
    drawAllFunctions();
}

function resetView() {
    currentTransform = d3.zoomIdentity;
    initGraph();
    drawAllFunctions();
}

function clearAll() {
    functions = [];
    colorIndex = 0;
    currentXRange = [-10, 10];
    currentYRange = [-10, 10];
    document.getElementById('xMin').value = -10;
    document.getElementById('xMax').value = 10;
    document.getElementById('yMin').value = -10;
    document.getElementById('yMax').value = 10;
    updateFunctionList();
    initGraph();
    drawAllFunctions();
}

function exportImage() {
    const svgElement = document.querySelector('#graph svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = svgElement.clientWidth * 2;
    canvas.height = svgElement.clientHeight * 2;
    
    img.onload = function() {
        ctx.fillStyle = '#0f0f1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const link = document.createElement('a');
        link.download = 'function-graph.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
}

function setQuickExpr(expr) {
    const input = document.getElementById('functionInput');
    input.value = expr;
    input.focus();
}

function handleAddFunction() {
    const input = document.getElementById('functionInput');
    if (addFunction(input.value)) {
        input.value = '';
    }
}

function handleDrawFunction() {
    const input = document.getElementById('functionInput');
    if (input.value.trim()) {
        if (addFunction(input.value)) {
            input.value = '';
        }
    } else if (functions.length > 0) {
        drawAllFunctions();
    }
}

function toggleSnap() {
    snapEnabled = !snapEnabled;
    const btn = document.getElementById('snapToggle');
    if (snapEnabled) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fa fa-crosshairs"></i> 自动吸附: 开';
    } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fa fa-crosshairs"></i> 自动吸附: 关';
        hideSnapPoint();
    }
}

function updateSnapPoint(snapX, snapY, newXScale, newYScale, margin) {
    if (!snapPointGroup) return;
    
    const container = document.getElementById('graph');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const px = newXScale(snapX);
    const py = newYScale(snapY);
    
    if (px >= 0 && px <= innerWidth && py >= 0 && py <= innerHeight) {
        snapPointGroup.select('.snap-point')
            .attr('cx', px)
            .attr('cy', py)
            .attr('r', 6)
            .style('display', 'block');
    } else {
        hideSnapPoint();
    }
}

function hideSnapPoint() {
    if (snapPointGroup) {
        snapPointGroup.select('.snap-point')
            .style('display', 'none');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initGraph();
    updateFunctionList();
    
    document.getElementById('functionInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddFunction();
        }
    });
    
    document.getElementById('polarR').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddPolar();
        }
    });
    
    document.getElementById('paramY').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddParametric();
        }
    });
    
    document.getElementById('implicitEq').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddImplicit();
        }
    });
    
    document.getElementById('sampleCount').addEventListener('change', () => {
        drawAllFunctions();
    });
    
    window.addEventListener('resize', () => {
        initGraph();
        drawAllFunctions();
    });
});

function switchEquationType(type) {
    currentEquationType = type;
    
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.type-btn[data-type="${type}"]`).classList.add('active');
    
    document.querySelectorAll('.input-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.quick-functions').forEach(quick => {
        quick.style.display = 'none';
    });
    
    switch(type) {
        case 'expression':
            document.getElementById('expressionInput').classList.add('active');
            document.getElementById('quickExpression').style.display = 'flex';
            break;
        case 'polar':
            document.getElementById('polarInput').classList.add('active');
            document.getElementById('quickPolar').style.display = 'flex';
            break;
        case 'parametric':
            document.getElementById('parametricInput').classList.add('active');
            document.getElementById('quickParametric').style.display = 'flex';
            break;
        case 'implicit':
            document.getElementById('implicitInput').classList.add('active');
            document.getElementById('quickImplicit').style.display = 'flex';
            break;
    }
}

function parseThetaExpr(expr) {
    expr = expr.trim();
    expr = expr.replace(/\^/g, '**');
    expr = expr.replace(/(\d)([a-zA-Z])/g, '$1*$2');
    expr = expr.replace(/([a-zA-Z])(\d)/g, '$1*$2');
    expr = expr.replace(/\)(\d)/g, ')*$1');
    expr = expr.replace(/(\d)\(/g, '$1*(');
    expr = expr.replace(/\)([a-zA-Z])/g, ')*$1');
    
    expr = expr.replace(/\btheta\b/g, 't');
    expr = expr.replace(/\bθ\b/g, 't');
    
    expr = expr.replace(/\bsin\b/g, 'Math.sin');
    expr = expr.replace(/\bcos\b/g, 'Math.cos');
    expr = expr.replace(/\btan\b/g, 'Math.tan');
    expr = expr.replace(/\bcsc\b/g, 'MathFuncs.csc');
    expr = expr.replace(/\bsec\b/g, 'MathFuncs.sec');
    expr = expr.replace(/\bcot\b/g, 'MathFuncs.cot');
    expr = expr.replace(/\bsinh\b/g, 'Math.sinh');
    expr = expr.replace(/\bcosh\b/g, 'Math.cosh');
    expr = expr.replace(/\btanh\b/g, 'Math.tanh');
    expr = expr.replace(/\bexp\b/g, 'Math.exp');
    expr = expr.replace(/\bsqrt\b/g, 'Math.sqrt');
    expr = expr.replace(/\babs\b/g, 'Math.abs');
    expr = expr.replace(/\bpow\b/g, 'Math.pow');
    expr = expr.replace(/\bpi\b/g, 'Math.PI');
    expr = expr.replace(/\be\b/g, 'Math.E');
    expr = expr.replace(/\ba\b/g, '1');
    expr = expr.replace(/\bb\b/g, '1');
    
    return expr;
}

function parseParamExpr(expr) {
    expr = expr.trim();
    expr = expr.replace(/\^/g, '**');
    expr = expr.replace(/(\d)([a-zA-Z])/g, '$1*$2');
    expr = expr.replace(/([a-zA-Z])(\d)/g, '$1*$2');
    expr = expr.replace(/\)(\d)/g, ')*$1');
    expr = expr.replace(/(\d)\(/g, '$1*(');
    expr = expr.replace(/\)([a-zA-Z])/g, ')*$1');
    
    expr = expr.replace(/\bsin\b/g, 'Math.sin');
    expr = expr.replace(/\bcos\b/g, 'Math.cos');
    expr = expr.replace(/\btan\b/g, 'Math.tan');
    expr = expr.replace(/\bcsc\b/g, 'MathFuncs.csc');
    expr = expr.replace(/\bsec\b/g, 'MathFuncs.sec');
    expr = expr.replace(/\bcot\b/g, 'MathFuncs.cot');
    expr = expr.replace(/\bsinh\b/g, 'Math.sinh');
    expr = expr.replace(/\bcosh\b/g, 'Math.cosh');
    expr = expr.replace(/\btanh\b/g, 'Math.tanh');
    expr = expr.replace(/\bexp\b/g, 'Math.exp');
    expr = expr.replace(/\bsqrt\b/g, 'Math.sqrt');
    expr = expr.replace(/\babs\b/g, 'Math.abs');
    expr = expr.replace(/\bpow\b/g, 'Math.pow');
    expr = expr.replace(/\bpi\b/g, 'Math.PI');
    expr = expr.replace(/\be\b/g, 'Math.E');
    
    return expr;
}

function parseImplicitExpr(expr) {
    expr = expr.trim();
    expr = expr.replace(/\^/g, '**');
    expr = expr.replace(/(\d)([a-zA-Z])/g, '$1*$2');
    expr = expr.replace(/([a-zA-Z])(\d)/g, '$1*$2');
    expr = expr.replace(/\)(\d)/g, ')*$1');
    expr = expr.replace(/(\d)\(/g, '$1*(');
    expr = expr.replace(/\)([a-zA-Z])/g, ')*$1');
    
    expr = expr.replace(/\bsin\b/g, 'Math.sin');
    expr = expr.replace(/\bcos\b/g, 'Math.cos');
    expr = expr.replace(/\btan\b/g, 'Math.tan');
    expr = expr.replace(/\bcsc\b/g, 'MathFuncs.csc');
    expr = expr.replace(/\bsec\b/g, 'MathFuncs.sec');
    expr = expr.replace(/\bcot\b/g, 'MathFuncs.cot');
    expr = expr.replace(/\bsinh\b/g, 'Math.sinh');
    expr = expr.replace(/\bcosh\b/g, 'Math.cosh');
    expr = expr.replace(/\btanh\b/g, 'Math.tanh');
    expr = expr.replace(/\bexp\b/g, 'Math.exp');
    expr = expr.replace(/\bsqrt\b/g, 'Math.sqrt');
    expr = expr.replace(/\babs\b/g, 'Math.abs');
    expr = expr.replace(/\bpow\b/g, 'Math.pow');
    expr = expr.replace(/\bpi\b/g, 'Math.PI');
    expr = expr.replace(/\be\b/g, 'Math.E');
    expr = expr.replace(/\ba\b/g, '1');
    expr = expr.replace(/\bb\b/g, '1');
    
    return expr;
}

function evaluateValue(expr) {
    try {
        const parsed = parseExpression(expr);
        const result = eval(parsed);
        return typeof result === 'number' ? result : null;
    } catch (e) {
        return null;
    }
}

function generatePolarData(rExpr, thetaMin, thetaMax, sampleCount) {
    const parsedExpr = parseThetaExpr(rExpr);
    const data = [];
    const thetaMinRad = thetaMin * Math.PI / 180;
    const thetaMaxRad = thetaMax * Math.PI / 180;
    const step = (thetaMaxRad - thetaMinRad) / sampleCount;
    
    for (let i = 0; i <= sampleCount; i++) {
        const t = thetaMinRad + i * step;
        try {
            const r = eval(parsedExpr);
            if (typeof r === 'number' && isFinite(r)) {
                const x = r * Math.cos(t);
                const y = r * Math.sin(t);
                data.push({ x, y });
            }
        } catch (e) {}
    }
    
    return data;
}

function generateParametricData(xExpr, yExpr, tMin, tMax, sampleCount) {
    const parsedX = parseParamExpr(xExpr);
    const parsedY = parseParamExpr(yExpr);
    const data = [];
    const tMinRad = tMin * Math.PI / 180;
    const tMaxRad = tMax * Math.PI / 180;
    const step = (tMaxRad - tMinRad) / sampleCount;
    
    for (let i = 0; i <= sampleCount; i++) {
        const t = tMinRad + i * step;
        try {
            const x = eval(parsedX);
            const y = eval(parsedY);
            if (typeof x === 'number' && typeof y === 'number' && isFinite(x) && isFinite(y)) {
                data.push({ x, y });
            }
        } catch (e) {}
    }
    
    return data;
}

function generateImplicitData(expr, xMin, xMax, yMin, yMax, resolution) {
    const parsedExpr = parseImplicitExpr(expr);
    const contours = [];
    const stepX = (xMax - xMin) / resolution;
    const stepY = (yMax - yMin) / resolution;
    
    const grid = [];
    for (let j = 0; j <= resolution; j++) {
        grid[j] = [];
        for (let i = 0; i <= resolution; i++) {
            const x = xMin + i * stepX;
            const y = yMin + j * stepY;
            try {
                const val = eval(parsedExpr);
                grid[j][i] = typeof val === 'number' && isFinite(val) ? val : NaN;
            } catch (e) {
                grid[j][i] = NaN;
            }
        }
    }
    
    for (let j = 0; j < resolution; j++) {
        for (let i = 0; i < resolution; i++) {
            const x0 = xMin + i * stepX;
            const y0 = yMin + j * stepY;
            const x1 = x0 + stepX;
            const y1 = y0 + stepY;
            
            const v00 = grid[j][i];
            const v10 = grid[j][i + 1];
            const v01 = grid[j + 1][i];
            const v11 = grid[j + 1][i + 1];
            
            if (isNaN(v00) || isNaN(v10) || isNaN(v01) || isNaN(v11)) continue;
            
            const crosses = [
                (v00 >= 0 && v10 < 0) || (v00 < 0 && v10 >= 0),
                (v10 >= 0 && v11 < 0) || (v10 < 0 && v11 >= 0),
                (v00 >= 0 && v01 < 0) || (v00 < 0 && v01 >= 0),
                (v01 >= 0 && v11 < 0) || (v01 < 0 && v11 >= 0)
            ];
            
            const crossCount = crosses.filter(c => c).length;
            
            if (crossCount >= 2) {
                const points = [];
                
                if (crosses[0]) {
                    const t = v00 / (v00 - v10);
                    points.push({ x: x0 + t * stepX, y: y0 });
                }
                if (crosses[1]) {
                    const t = v10 / (v10 - v11);
                    points.push({ x: x1, y: y0 + t * stepY });
                }
                if (crosses[2]) {
                    const t = v00 / (v00 - v01);
                    points.push({ x: x0, y: y0 + t * stepY });
                }
                if (crosses[3]) {
                    const t = v01 / (v01 - v11);
                    points.push({ x: x0 + t * stepX, y: y1 });
                }
                
                if (points.length >= 2) {
                    contours.push([points[0], points[1]]);
                }
            }
        }
    }
    
    return contours;
}

function handleAddPolar() {
    const rExpr = document.getElementById('polarR').value.trim();
    const thetaMinStr = document.getElementById('polarThetaMin').value.trim() || '0';
    const thetaMaxStr = document.getElementById('polarThetaMax').value.trim() || '2*pi';
    
    if (!rExpr) {
        showError('请输入极坐标方程');
        return;
    }
    
    const thetaMin = evaluateValue(thetaMinStr);
    const thetaMax = evaluateValue(thetaMaxStr);
    
    if (thetaMin === null || thetaMax === null) {
        showError('无效的θ范围');
        return;
    }
    
    const func = {
        id: Date.now(),
        type: 'polar',
        expr: `r = ${rExpr}`,
        rExpr: rExpr,
        thetaMin: thetaMin,
        thetaMax: thetaMax,
        color: getNextColor()
    };
    
    functions.push(func);
    updateFunctionList();
    drawAllFunctions();
    document.getElementById('polarR').value = '';
}

function handleAddParametric() {
    const xExpr = document.getElementById('paramX').value.trim();
    const yExpr = document.getElementById('paramY').value.trim();
    const tMinStr = document.getElementById('paramTMin').value.trim() || '0';
    const tMaxStr = document.getElementById('paramTMax').value.trim() || '2*pi';
    
    if (!xExpr || !yExpr) {
        showError('请输入完整的参数方程');
        return;
    }
    
    const tMin = evaluateValue(tMinStr);
    const tMax = evaluateValue(tMaxStr);
    
    if (tMin === null || tMax === null) {
        showError('无效的t范围');
        return;
    }
    
    const func = {
        id: Date.now(),
        type: 'parametric',
        expr: `x=${xExpr}, y=${yExpr}`,
        xExpr: xExpr,
        yExpr: yExpr,
        tMin: tMin,
        tMax: tMax,
        color: getNextColor()
    };
    
    functions.push(func);
    updateFunctionList();
    drawAllFunctions();
    document.getElementById('paramX').value = '';
    document.getElementById('paramY').value = '';
}

function handleAddImplicit() {
    const eqExpr = document.getElementById('implicitEq').value.trim();
    
    if (!eqExpr) {
        showError('请输入隐式方程');
        return;
    }
    
    const func = {
        id: Date.now(),
        type: 'implicit',
        expr: eqExpr + ' = 0',
        eqExpr: eqExpr,
        color: getNextColor()
    };
    
    functions.push(func);
    updateFunctionList();
    drawAllFunctions();
    document.getElementById('implicitEq').value = '';
}

function setQuickPolar(rExpr, thetaMin, thetaMax) {
    document.getElementById('polarR').value = rExpr;
    document.getElementById('polarThetaMin').value = thetaMin;
    document.getElementById('polarThetaMax').value = thetaMax;
    document.getElementById('polarR').focus();
}

function setQuickParametric(xExpr, yExpr, tMin, tMax) {
    document.getElementById('paramX').value = xExpr;
    document.getElementById('paramY').value = yExpr;
    document.getElementById('paramTMin').value = tMin;
    document.getElementById('paramTMax').value = tMax;
    document.getElementById('paramX').focus();
}

function setQuickImplicit(expr) {
    document.getElementById('implicitEq').value = expr;
    document.getElementById('implicitEq').focus();
}
