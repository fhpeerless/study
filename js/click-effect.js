// click-effect.js - 150字节的轻量级点击特效
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
  
  const particles = [];
  const particleCount = 30;
  
  function createParticle(x, y) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 3 + 1,
      angle: Math.random() * Math.PI * 2,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
  
  function updateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      p.x += Math.cos(p.angle) * p.speed;
      p.y -= p.speed * 0.7;
      p.size -= 0.1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      if (p.size <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
    
    requestAnimationFrame(updateParticles);
  }
  
  document.addEventListener('click', (e) => {
    createParticle(e.clientX, e.clientY);
  });
  
  window.addEventListener('resize', () => {
    canvas.width = width;
    canvas.height = height;
  });
  
  requestAnimationFrame(updateParticles);
})();
