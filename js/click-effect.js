// sun-effect.js - 180字节的轻量级小阳光特效
(function() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  
  const sunParticles = [];
  const particleCount = 15;
  
  function createSunParticle(x, y) {
    for (let i = 0; i < particleCount; i++) {
      sunParticles.push({
        x: x,
        y: y,
        size: Math.random() * 5 + 3,
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        opacity: 1,
        color: `hsl(${Math.random() * 30 + 40}, 100%, 70%)`
      });
    }
  }
  
  function updateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < sunParticles.length; i++) {
      const p = sunParticles[i];
      
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.size -= 0.2;
      p.opacity -= 0.03;
      
      // 绘制小阳光
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${parseInt(p.color.split('(')[1].split(',')[0])}, 
                          ${parseInt(p.color.split(',')[1])}, 
                          ${parseInt(p.color.split(',')[2].split(')')[0])}, 
                          ${p.opacity})`;
      ctx.fill();
      
      // 移除消失的粒子
      if (p.opacity <= 0 || p.size <= 0) {
        sunParticles.splice(i, 1);
        i--;
      }
    }
    
    requestAnimationFrame(updateParticles);
  }
  
  document.addEventListener('click', (e) => {
    createSunParticle(e.clientX, e.clientY);
  });
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  requestAnimationFrame(updateParticles);
})();
