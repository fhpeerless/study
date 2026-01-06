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
            /* 侧边栏计时器容器样式 */
            .countdown-container {
                display: flex;
                flex-direction: column;
                gap: 12px;
                width: 100%;
                margin: 0;
                padding: 16px;
                border-radius: 0;
                background-color: transparent;
                box-shadow: none;
                transition: all 0.3s;
            }
            /* 暗黑模式容器 */
            body.dark-mode .countdown-container {
                background-color: transparent;
                box-shadow: none;
            }

            /* 倒计时项：垂直排列 */
            .countdown-item {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 6px;
                width: 100%;
                padding: 10px;
                border-radius: 6px;
                background-color: rgba(255, 255, 255, 0.8);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            body.dark-mode .countdown-item {
                background-color: rgba(58, 58, 86, 0.8);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }

            /* 倒计时标题 */
            .countdown-title {
                margin: 0;
                font-size: 14px;
                font-weight: 600;
                color: #2c3e50;
                width: 100%;
                text-align: left;
                padding-bottom: 4px;
                border-bottom: 1px solid #e0e0e0;
            }
            body.dark-mode .countdown-title {
                color: #e0e0e0;
                border-bottom-color: #4a4a6a;
            }

            /* 时间显示区 */
            .countdown-time {
                font-size: 16px;
                font-weight: bold;
                color: #3498db;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 6px;
                word-wrap: break-word;
                flex-wrap: wrap;
                width: 100%;
            }
            body.dark-mode .countdown-time {
                color: #4dabf5;
            }

            /* 时间数字项 */
            .time-item {
                padding: 4px 8px;
                border-radius: 4px;
                background-color: #3498db;
                color: white;
                font-size: 14px;
                min-width: 25px;
                text-align: center;
                font-weight: bold;
                line-height: 1.2;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
            }
            body.dark-mode .time-item {
                background-color: #4dabf5;
                color: white;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            }

            /* 时间分隔符 */
            .time-sep {
                color: #2c3e50;
                font-weight: 600;
                font-size: 14px;
                line-height: 1.2;
                margin: 0 2px;
            }
            body.dark-mode .time-sep {
                color: #e0e0e0;
            }

            /* 响应式适配：侧边栏特殊样式 */
            @media (max-width: 1200px) {
                .countdown-container {
                    padding: 12px;
                    gap: 10px;
                }
                .countdown-item {
                    padding: 8px;
                    gap: 4px;
                }
                .countdown-title {
                    font-size: 13px;
                }
                .countdown-time {
                    font-size: 14px;
                    gap: 4px;
                }
                .time-item {
                    padding: 3px 6px;
                    font-size: 12px;
                    min-width: 22px;
                }
                .time-sep {
                    font-size: 12px;
                }
            }
            @media (max-width: 768px) {
                .countdown-container {
                    padding: 10px;
                    gap: 8px;
                }
                .countdown-item {
                    padding: 6px;
                    gap: 3px;
                }
                .countdown-title {
                    font-size: 12px;
                }
                .countdown-time {
                    font-size: 13px;
                    gap: 3px;
                }
                .time-item {
                    padding: 2px 5px;
                    font-size: 11px;
                    min-width: 20px;
                }
                .time-sep {
                    font-size: 11px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 创建四个倒计时项
     * @param {HTMLElement} container - 计时器容器
     */
    function createCountdownCards(container) {
        const targets = getTargetDates();
        // 遍历生成四个倒计时项
        Object.values(targets).forEach(target => {
            const item = document.createElement('div');
            item.className = 'countdown-item';
            item.innerHTML = `
                <div class="countdown-title">${target.title}</div>
                <div class="countdown-time">
                    <div class="time-item days">00</div>
                    <div class="time-sep">天</div>
                    <div class="time-item hours">00</div>
                    <div class="time-sep">时</div>
                    <div class="time-item minutes">00</div>
                    <div class="time-sep">分</div>
                    <div class="time-item seconds">00</div>
                    <div class="time-sep">秒</div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    // -------------------------- 3. 实时更新与初始化 --------------------------
    /**
     * 更新所有倒计时项的时间
     */
    function updateCountdown() {
        const targets = getTargetDates();
        const items = document.querySelectorAll('.countdown-item');

        items.forEach((item, index) => {
            const target = Object.values(targets)[index];
            const remaining = calculateRemainingTime(target.date);
            // 更新倒计时项内的时间数字
            item.querySelector('.days').textContent = remaining.days;
            item.querySelector('.hours').textContent = remaining.hours;
            item.querySelector('.minutes').textContent = remaining.minutes;
            item.querySelector('.seconds').textContent = remaining.seconds;
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