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
        
        // 创建计时器结构
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="container">
                <div class="timer">
                    <span class="time-unit">
                        <span class="time-value" id="days">00</span>
                        <span class="time-label">天</span>
                    </span>
                    <span class="time-unit">
                        <span class="time-value" id="hours">00</span>
                        <span class="time-label">时</span>
                    </span>
                    <span class="time-unit">
                        <span class="time-value" id="minutes">00</span>
                        <span class="time-label">分</span>
                    </span>
                    <span class="time-unit">
                        <span class="time-value" id="seconds">00</span>
                        <span class="time-label">秒</span>
                    </span>
                </div>
                <div class="status" id="status">本月结束还有：0天 0时 0分 0秒</div>
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
        const height = this.getAttribute('height') || '150px';
        
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
            this.updateTimeElement('days', 0);
            this.updateTimeElement('hours', 0);
            this.updateTimeElement('minutes', 0);
            this.updateTimeElement('seconds', 0);
            this.status.textContent = `本月已结束`;
            this.status.className = 'status ended';
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            this.updateTimeElement('days', days);
            this.updateTimeElement('hours', hours);
            this.updateTimeElement('minutes', minutes);
            this.updateTimeElement('seconds', seconds);
            
            this.status.textContent = `本月结束还有：${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
            this.status.className = 'status countdown';
        }
    }

    updateTimeElement(id, value) {
        const element = this.shadowRoot.getElementById(id);
        if (element) {
            element.textContent = value.toString().padStart(2, '0');
        }
    }
}

customElements.define('time-counter', TimeCounter);
