// sun-effect.js - 优化版小阳光点击特效
(function() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.style.opacity = '0.7'; // 使效果更柔和
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  
  const sunParticles = [];
  const particleCount = 15;
  
  // 优化：确保是明亮的黄色（色相50-60，饱和度100%，亮度70%）
  function getRandomSunColor() {
    return `hsl(55, 100%, 70%)`; // 纯正的明亮黄色
  }
  
  function createSunParticle(x, y) {
    for (let i = 0; i < particleCount; i++) {
      sunParticles.push({
        x: x,
        y: y,
        size: Math.random() * 5 + 4,
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        opacity: 1,
        color: getRandomSunColor()
      });
    }
  }
  
  function updateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < sunParticles.length; i++) {
      const p = sunParticles[i];
      
      // 优化：更自然的扩散效果
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.size -= 0.2;
      p.opacity -= 0.02;
      
      // 优化：确保是明亮的黄色
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 0, ${p.opacity})`; // 直接使用黄色
      ctx.fill();
      
      // 移除消失的粒子
      if (p.opacity <= 0 || p.size <= 0) {
        sunParticles.splice(i, 1);
        i--;
      }
    }
    
    requestAnimationFrame(updateParticles);
  }
  
  // 修复：确保每次点击都能触发特效
  document.addEventListener('click', (e) => {
    createSunParticle(e.clientX, e.clientY);
  });
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  requestAnimationFrame(updateParticles);
})();
