// monthly-countdown.js
class MonthlyCountdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // 从属性获取配置
    this.endTime = this.getAttribute('end-time') || this.calculateCurrentMonthEnd();
    this.width = this.getAttribute('width') || '300px';
    this.height = this.getAttribute('height') || '120px';
    
    this.render();
    this.startCountdown();
  }

  calculateCurrentMonthEnd() {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    return lastDay.toISOString();
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
      <div class="countdown-title">本月还剩</div>
      <div class="countdown-value" id="countdown">00天:00小时:00分;00秒</div>
      
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
      this.shadowRoot.getElementById('countdown').textContent = '00天:00小时:00分;00秒';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // 格式化为两位数
    const formatTime = (time) => time < 10 ? `0${time}` : time;
    
    this.shadowRoot.getElementById('countdown').textContent = 
      `${formatTime(days)}天:${formatTime(hours)}小时:${formatTime(minutes)}分;${formatTime(seconds)}秒`;
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }
}

customElements.define('monthly-countdown', MonthlyCountdown);

