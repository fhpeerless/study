(async function() {
    // 动态注入样式
    const style = document.createElement('style');
    style.textContent = `
        .sun-effect {
            position: fixed;
            pointer-events: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: radial-gradient(circle, #ffd700, #ff8c00);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
                        0 0 40px rgba(255, 140, 0, 0.6);
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
            z-index: 9999;
            animation: sunPop 1s ease-out forwards;
        }
        @keyframes sunPop {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 等待DOM加载完成
    if (document.readyState !== 'complete') {
        await new Promise(resolve => window.addEventListener('load', resolve));
    }

    // 点击事件处理
    document.addEventListener('click', (e) => {
        const sun = document.createElement('div');
        sun.className = 'sun-effect';
        // 定位到点击位置
        sun.style.left = `${e.clientX}px`;
        sun.style.top = `${e.clientY}px`;
        document.body.appendChild(sun);

        // 动画结束后移除元素
        sun.addEventListener('animationend', () => {
            sun.remove();
        }, { once: true });
    });
})();
