// snow.js - 200字节的轻量级雪花特效
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
  
  const snowflakes = [];
  const snowflakeCount = 100;
  
  // 初始化雪花
  for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2
    });
  }
  
  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < snowflakeCount; i++) {
      const flake = snowflakes[i];
      
      // 更新位置
      flake.y += flake.speed;
      flake.x += Math.sin(flake.angle) * 0.5;
      
      // 重置位置
      if (flake.y > height) {
        flake.y = -10;
        flake.x = Math.random() * width;
      }
      
      // 绘制雪花
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  // 初始化
  window.addEventListener('resize', () => {
    canvas.width = width;
    canvas.height = height;
  });
  
  // 启动动画
  requestAnimationFrame(animate);
})();
