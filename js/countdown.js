/**
 * 倒计时工具：春节/今日/本月/本年倒计时
 * 单文件设计，无需依赖外部CSS，自动适配明暗模式
 */
(function() {
    // -------------------------- 1. 日期计算核心逻辑 --------------------------
    /**
     * 获取指定年份春节的公历日期（预设2025-2030年，可扩展）
     * @param {number} year - 年份
     * @returns {Date} 春节公历日期
     */
    function getSpringFestivalDate(year) {
        const springFestivalMap = {
            2025: '2025-01-29', // 2025年春节（农历正月初一）
            2026: '2026-02-17',
            2027: '2027-02-06',
            2028: '2028-01-26',
            2029: '2029-02-13',
            2030: '2030-02-03'
        };
        return springFestivalMap[year] ? new Date(`${springFestivalMap[year]} 00:00:00`) : new Date(year, 1, 1);
    }

    /**
     * 获取下一个春节日期（若本年已过则取下一年）
     * @returns {Date} 下一个春节日期
     */
    function getNextSpringFestival() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let springFestival = getSpringFestivalDate(currentYear);
        // 若本年春节已过，自动切换到下一年
        if (springFestival < now) {
            springFestival = getSpringFestivalDate(currentYear + 1);
        }
        return springFestival;
    }

    /**
     * 计算目标日期与当前时间的剩余时间（天/时/分/秒）
     * @param {Date} targetDate - 目标日期
     * @returns {Object} 剩余时间（补零两位数）
     */
    function calculateRemainingTime(targetDate) {
        const now = new Date();
        const diff = targetDate - now;
        // 若时间已过，返回全零
        if (diff <= 0) {
            return { days: '00', hours: '00', minutes: '00', seconds: '00' };
        }
        // 计算各单位时间
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        // 补零处理（确保两位数显示）
        return {
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
        };
    }

    /**
     * 获取所有倒计时的目标日期
     * @returns {Object} 包含四个倒计时的标题和目标日期
     */
    function getTargetDates() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 月份0-11
        const date = now.getDate();

        return {
            spring: {
                title: '春节倒计时',
                date: getNextSpringFestival()
            },
            today: {
                title: '今日倒计时', // 到今日23:59:59
                date: new Date(year, month, date, 23, 59, 59)
            },
            month: {
                title: '本月倒计时', // 到本月最后一天23:59:59
                date: new Date(year, month + 1, 0, 23, 59, 59)
            },
            year: {
                title: '本年倒计时', // 到本年12月31日23:59:59
                date: new Date(year, 11, 31, 23, 59, 59)
            }
        };
    }

    // -------------------------- 2. DOM 生成与样式 --------------------------
    /**
     * 添加倒计时样式（适配明暗模式，无需外部CSS）
     */
    function addCountdownStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 计时器容器：h1下方，flex布局 */
            .countdown-container {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
                align-items: center;
                width: 100%;
                margin: 12px 0 20px;
                padding: 12px 16px;
                border-radius: 8px;
                background-color: rgba(255, 255, 255, 0.9);
                box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                transition: all 0.3s;
            }
            /* 暗黑模式容器 */
            body.dark-mode .countdown-container {
                background-color: rgba(45, 45, 68, 0.9);
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }

            /* 倒计时卡片：四等分排列 */
            .countdown-card {
                flex: 1;
                min-width: 160px;
                padding: 14px;
                border-radius: 8px;
                background-color: #fff;
                box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                text-align: center;
                transition: transform 0.2s;
            }
            /* 暗黑模式卡片 */
            body.dark-mode .countdown-card {
                background-color: #2d2d44;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            }
            /* 卡片hover效果 */
            .countdown-card:hover {
                transform: translateY(-2px);
            }

            /* 卡片标题 */
            .countdown-title {
                margin: 0 0 8px;
                font-size: 14px;
                font-weight: 600;
                color: #2c3e50;
            }
            body.dark-mode .countdown-title {
                color: #e0e0e0;
            }

            /* 时间显示区 */
            .countdown-time {
                font-size: 16px;
                font-weight: bold;
                color: #3498db;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 5px;
            }
            body.dark-mode .countdown-time {
                color: #4dabf5;
            }

            /* 时间数字项 */
            .time-item {
                padding: 5px 10px;
                border-radius: 4px;
                background-color: #f1f5f9;
                color: #2c3e50;
            }
            body.dark-mode .time-item {
                background-color: #3a3a56;
                color: #e0e0e0;
            }

            /* 时间分隔符 */
            .time-sep {
                color: #7f8c8d;
                font-weight: normal;
            }
            body.dark-mode .time-sep {
                color: #a0a0b0;
            }

            /* 响应式适配：平板/手机 */
            @media (max-width: 768px) {
                .countdown-container {
                    gap: 10px;
                    padding: 10px;
                }
                .countdown-card {
                    min-width: 130px;
                    padding: 12px;
                }
                .countdown-time {
                    font-size: 14px;
                    gap: 3px;
                }
                .time-item {
                    padding: 4px 8px;
                }
            }
            @media (max-width: 576px) {
            
  .countdown-container {
        flex-direction: column;
        align-items: stretch;
        gap: 8px; /* 小屏减小卡片间距 */
        padding: 8px;
    }
    .countdown-card {
        min-width: 100%;
        padding: 10px; /* 小屏减小卡片内边距 */
    }
                
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 创建四个倒计时卡片
     * @param {HTMLElement} container - 计时器容器
     */
    function createCountdownCards(container) {
        const targets = getTargetDates();
        // 遍历生成四个卡片
        Object.values(targets).forEach(target => {
            const card = document.createElement('div');
            card.className = 'countdown-card';
            card.innerHTML = `
                <h3 class="countdown-title">${target.title}</h3>
                <div class="countdown-time">
                    <span class="time-item days">00</span>
                    <span class="time-sep">天</span>
                    <span class="time-item hours">00</span>
                    <span class="time-sep">时</span>
                    <span class="time-item minutes">00</span>
                    <span class="time-sep">分</span>
                    <span class="time-item seconds">00</span>
                    <span class="time-sep">秒</span>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // -------------------------- 3. 实时更新与初始化 --------------------------
    /**
     * 更新所有倒计时卡片的时间
     */
    function updateCountdown() {
        const targets = getTargetDates();
        const cards = document.querySelectorAll('.countdown-card');

        cards.forEach((card, index) => {
            const target = Object.values(targets)[index];
            const remaining = calculateRemainingTime(target.date);
            // 更新卡片内的时间数字
            card.querySelector('.days').textContent = remaining.days;
            card.querySelector('.hours').textContent = remaining.hours;
            card.querySelector('.minutes').textContent = remaining.minutes;
            card.querySelector('.seconds').textContent = remaining.seconds;
        });
    }

    /**
     * 初始化倒计时（等待DOM加载完成）
     */
    function initCountdown() {
        const container = document.getElementById('countdownContainer');
        if (!container) return; // 容器不存在则终止

        // 加载样式与卡片
        addCountdownStyles();
        createCountdownCards(container);

        // 首次更新 + 每秒实时更新
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 等待页面DOM加载完成后初始化
    document.addEventListener('DOMContentLoaded', initCountdown);
})();