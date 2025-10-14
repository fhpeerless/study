class TimeCounter extends HTMLElement {
    constructor() {
        super();
        this.createShadowRoot();
        this.calculateMonthEnd();
    }

    calculateMonthEnd() {
        const now = new Date();
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        this.monthEnd = new Date(nextMonth - 1); // 本月最后一天的23:59:59
    }

    createShadowRoot() {
        const shadow = this.attachShadow({ mode: 'open' });
        
        // 创建计时器结构：只有一行文字
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="container">
                <div class="status" id="status">本月还有0天0时0分0秒结束</div>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
        
        // 设置默认宽高（从属性中获取）
        this.updateDimensions();
    }

    updateDimensions() {
        const container = this.shadowRoot.querySelector('.container');
        if (!container) return;
        
        const width = this.getAttribute('width') || '400px';
        const height = this.getAttribute('height') || '100px';
        
        container.style.width = width;
        container.style.height = height;
    }

    connectedCallback() {
        this.updateDimensions();
        this.updateTimer();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    disconnectedCallback() {
        clearInterval(this.timerInterval);
    }

    updateTimer() {
        const now = new Date();
        const diff = this.monthEnd - now; // 剩余时间（毫秒）
        
        if (diff <= 0) {
            // 本月已结束
            this.status.textContent = `本月已结束`;
            this.status.className = 'status ended';
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // 格式化：确保两位数，但这里我们不需要单独显示，所以直接组合
            this.status.textContent = `本月还有${days}天${hours}时${minutes}分${seconds}秒结束`;
            this.status.className = 'status';
        }
    }
}

customElements.define('time-counter', TimeCounter);
