// monthly-countdown.js
class MonthlyCountdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // 从属性获取配置
    this.endTime = this.getAttribute('end-time') || this.calculateNextMonthEnd();
    this.width = this.getAttribute('width') || '300px';
    this.height = this.getAttribute('height') || '120px';
    
    this.render();
    this.startCountdown();
  }

  calculateNextMonthEnd() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    nextMonth.setHours(23, 59, 59, 999);
    return nextMonth.toISOString();
  }

  render() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        width: ${this.width};
        height: ${this.height};
      }
    `;

    const container = document.createElement('div');
    container.className = 'countdown-container';
    
    container.innerHTML = `
      <div class="countdown-title">下个月结束倒计时</div>
      <div class="countdown-value" id="countdown">00:00:00:00</div>
      <div class="countdown-label">天:小时:分钟:秒</div>
      <div class="countdown-footer">点击刷新页面更新时间</div>
    `;
    
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
  }

  startCountdown() {
    this.updateCountdown();
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const endTime = new Date(this.endTime).getTime();
    
    const distance = endTime - now;
    
    if (distance < 0) {
      clearInterval(this.interval);
      this.shadowRoot.getElementById('countdown').textContent = '00:00:00:00';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // 格式化为两位数
    const formatTime = (time) => time < 10 ? `0${time}` : time;
    
    this.shadowRoot.getElementById('countdown').textContent = 
      `${formatTime(days)}:${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }
}

customElements.define('monthly-countdown', MonthlyCountdown);
