(function() {
    function calculateRemainingTime(targetDate) {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            return { hours: '00', minutes: '00', seconds: '00' };
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
        };
    }

    function getTodayTarget() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        return new Date(year, month, date, 23, 59, 59);
    }

    function addCountdownStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .footer-countdown {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                font-size: 13px;
                color: #7f8c8d;
                margin-left: 10px;
            }
            body.dark-mode .footer-countdown {
                color: #a0a0a0;
            }
            .footer-countdown .time-num {
                font-weight: 600;
                color: #3498db;
            }
            body.dark-mode .footer-countdown .time-num {
                color: #4dabf5;
            }
            .footer-countdown .time-label {
                font-size: 12px;
            }
        `;
        document.head.appendChild(style);
    }

    function createFooterCountdown() {
        const container = document.getElementById('footerCountdown');
        if (!container) return;

        addCountdownStyles();

        container.innerHTML = `
            <span class="footer-countdown">
                今日剩余 <span class="time-num hours">00</span><span class="time-label">时</span>
                <span class="time-num minutes">00</span><span class="time-label">分</span>
                <span class="time-num seconds">00</span><span class="time-label">秒</span>
            </span>
        `;
    }

    function updateCountdown() {
        const target = getTodayTarget();
        const remaining = calculateRemainingTime(target);
        const container = document.getElementById('footerCountdown');
        if (!container) return;

        const hoursEl = container.querySelector('.hours');
        const minutesEl = container.querySelector('.minutes');
        const secondsEl = container.querySelector('.seconds');

        if (hoursEl) hoursEl.textContent = remaining.hours;
        if (minutesEl) minutesEl.textContent = remaining.minutes;
        if (secondsEl) secondsEl.textContent = remaining.seconds;
    }

    function initCountdown() {
        createFooterCountdown();
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    document.addEventListener('DOMContentLoaded', initCountdown);
})();
