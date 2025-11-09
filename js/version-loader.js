// 生成纯数字+字母的版本号（避免特殊字符）
function getTodayVersion() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `v${year}${month}${day}`; // 输出：v20251107（无特殊字符）
}

// 动态加载app.js（带当天版本号）
function loadAppJs() {
  const version = getTodayVersion();
  const script = document.createElement('script');
  script.src = `./js/app.js?v=${version}`;
  // 确保加载完成后再执行后续逻辑（如果有依赖）
  script.onload = () => {
    console.log(`app.js (${version}) 加载完成`);
  };
  script.onerror = () => {
    console.error(`app.js (${version}) 加载失败`);
  };
  document.head.appendChild(script);
}

// 页面加载时执行
window.addEventListener('DOMContentLoaded', loadAppJs);
