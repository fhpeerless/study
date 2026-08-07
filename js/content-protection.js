// ============================================================
// 内容保护开关：
//   RIGHT_CLICK_PROTECTION  → true = 禁用右键/复制/剪切/拖拽/快捷键(Ctrl+U/S/P)
//   DEVTOOLS_PROTECTION     → true = 禁用 F12/Ctrl+Shift+I+J+C + 开发者工具检测 + 控制台警告
// ============================================================
window.RIGHT_CLICK_PROTECTION = true;
window.DEVTOOLS_PROTECTION    = false;

(function() {
    'use strict';

    var enableRightClick = window.RIGHT_CLICK_PROTECTION;
    var enableDevTools   = window.DEVTOOLS_PROTECTION;

    if (!enableRightClick && !enableDevTools) return;

    function showToast(message, type) {
        var existingToast = document.querySelector('.protection-toast');
        if (existingToast) { existingToast.remove(); }

        var bgColor = type === 'success'
            ? 'rgba(39, 174, 96, 0.95)'
            : 'rgba(231, 76, 60, 0.95)';

        var toast = document.createElement('div');
        toast.className = 'protection-toast';
        toast.textContent = message;
        toast.style.cssText =
            'position:fixed;top:20px;left:50%;transform:translateX(-50%);'
            + 'background:' + bgColor + ';color:#fff;padding:12px 24px;'
            + 'border-radius:8px;font-size:14px;z-index:99999;'
            + 'box-shadow:0 4px 12px rgba(0,0,0,.3);'
            + 'animation:fadeInOut 2s ease-in-out;font-family:sans-serif;';

        if (!document.querySelector('style[data-protection]')) {
            var style = document.createElement('style');
            style.setAttribute('data-protection', 'true');
            style.textContent =
                '@keyframes fadeInOut{'
                + '0%{opacity:0;transform:translateX(-50%) translateY(-20px)}'
                + '15%{opacity:1;transform:translateX(-50%) translateY(0)}'
                + '85%{opacity:1;transform:translateX(-50%) translateY(0)}'
                + '100%{opacity:0;transform:translateX(-50%) translateY(-20px)}'
                + '}';
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        setTimeout(function() { toast.remove(); }, 2000);
    }

    // ============================================================
    // 右键保护
    // ============================================================
    function initRightClickProtection() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showToast('右键菜单已禁用');
        });

        document.addEventListener('copy', function() {
            showToast('复制成功', 'success');
        });

        document.addEventListener('cut', function() {
            showToast('剪切成功', 'success');
        });

        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });

        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'u':
                        e.preventDefault();
                        showToast('查看源码已禁用');
                        break;
                    case 's':
                        e.preventDefault();
                        showToast('保存快捷键已禁用');
                        break;
                    case 'p':
                        e.preventDefault();
                        showToast('打印快捷键已禁用');
                        break;
                }
            }
        });
    }

    // ============================================================
    // 开发者工具保护
    // ============================================================
    function initDevToolsProtection() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12') {
                e.preventDefault();
                showToast('开发者工具已禁用');
            }
            if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
                switch (e.key.toLowerCase()) {
                    case 'i':
                    case 'j':
                    case 'c':
                        e.preventDefault();
                        showToast('开发者工具已禁用');
                        break;
                }
            }
        });

        // 窗口尺寸检测开发者工具
        var devToolsOpened = false;
        var threshold = 160;
        setInterval(function() {
            var opened = window.outerWidth - window.innerWidth > threshold
                      || window.outerHeight - window.innerHeight > threshold;
            if (opened && !devToolsOpened) {
                devToolsOpened = true;
                showToast('检测到开发者工具打开');
            } else if (!opened) {
                devToolsOpened = false;
            }
        }, 500);

        // 控制台元素陷阱
        var trap = new Image();
        Object.defineProperty(trap, 'id', {
            get: function() { showToast('请勿使用控制台'); }
        });

        // 控制台定时警告
        setInterval(function() {
            console.log('%c警告', 'color:red;font-size:50px;font-weight:bold;');
            console.log('%c本网站内容受保护，请勿盗取！', 'color:red;font-size:20px;');
            console.log(trap);
        }, 3000);
    }

    // ============================================================
    // 初始化
    // ============================================================
    function onReady() {
        if (enableRightClick) { initRightClickProtection(); }
        if (enableDevTools)   { initDevToolsProtection(); }

        if (enableDevTools) {
            console.log('%c\u26a0\ufe0f 警告', 'color:red;font-size:40px;font-weight:bold;');
            console.log('%c本网站内容受版权保护，请勿盗取！', 'color:red;font-size:16px;');
            console.log('%cstudy.xtwa.org 智能笔记系统', 'color:blue;font-size:14px;');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }
})();
