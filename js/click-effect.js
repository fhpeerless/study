// sun-effect.js - 修复版：确保每次点击都有特效
(function() {
  // 创建canvas
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.style.opacity = '0.6'; // 使效果更柔和
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  
  // 修复：使用正确的粒子数组遍历方式
  const particles = [];
  const particleCount = 15;
  
  // 确保是明亮的黄色
  function createParticle(x, y) {
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: x,
        y: y,
        size: Math.random() * 5 + 4,
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        opacity: 1,
        color: 'rgba(255, 255, 0, 1)' // 纯正的明亮黄色
      });
    }
  }
  
  function updateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    // 修复：从后往前遍历数组，避免移除元素导致的索引问题
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      
      // 更新粒子位置
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.size -= 0.2;
      p.opacity -= 0.02;
      
      // 绘制粒子（确保是黄色）
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 0, ${p.opacity})`;
      ctx.fill();
      
      // 移除消失的粒子
      if (p.opacity <= 0 || p.size <= 0) {
        particles.splice(i, 1);
      }
    }
    
    requestAnimationFrame(updateParticles);
  }
  
  // 修复：确保事件监听器不会被覆盖
  document.addEventListener('click', (e) => {
    createParticle(e.clientX, e.clientY);
  });
  
  // 窗口大小变化处理
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // 启动动画
  requestAnimationFrame(updateParticles);
})();
