/**
 * Spidey-Classroom Portal - Interactive Web Matrix Canvas Background
 * Renders floating digital web nodes, mouse web-slinging attraction, and NYC Spider-Verse skyline grid.
 */

(function() {
  const canvas = document.getElementById('spidey-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Particle configuration
  const NODE_COUNT = Math.min(Math.floor((width * height) / 14000), 85);
  const MAX_DISTANCE = 140;
  const MOUSE_RADIUS = 180;

  const nodes = [];
  const mouse = { x: null, y: null, active: false };

  // Responsive resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  });

  // Mouse tracking
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Web shockwave on click
  const shockwaves = [];
  window.addEventListener('click', (e) => {
    // Only trigger if click is on canvas or general background (not inside inputs)
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TEXTAREA') {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 160,
        opacity: 0.8,
        color: Math.random() > 0.4 ? 'rgba(255, 8, 68, ' : 'rgba(0, 240, 255, '
      });
    }
  });

  class WebNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2.2 + 1.2;
      this.isRed = Math.random() > 0.4;
      this.color = this.isRed ? '#FF0844' : '#00F0FF';
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce on edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse attraction / web sling physics
      if (mouse.active && mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
      }

      this.pulse += 0.03;
    }

    draw() {
      ctx.beginPath();
      const currentRadius = this.radius + Math.sin(this.pulse) * 0.5;
      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow
    }
  }

  function initNodes() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(new WebNode());
    }
  }

  // Draw background Oscorp / NYC Skyline silhouette
  function drawSkyline() {
    ctx.save();
    ctx.fillStyle = 'rgba(8, 12, 22, 0.4)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;

    const baseLine = height;
    const buildingWidths = [80, 110, 60, 140, 90, 160, 70, 120, 100, 150];
    let currentX = 0;

    ctx.beginPath();
    ctx.moveTo(0, baseLine);

    for (let i = 0; i < buildingWidths.length; i++) {
      const w = buildingWidths[i];
      const h = (Math.sin(i * 1.5) * 0.2 + 0.35) * height; // height ratio
      
      // Draw building top
      ctx.lineTo(currentX, baseLine - h);
      
      // Spire for Oscorp tower (center building)
      if (i === 4) {
        ctx.lineTo(currentX + w / 2 - 4, baseLine - h);
        ctx.lineTo(currentX + w / 2, baseLine - h - 70); // Spire top
        ctx.lineTo(currentX + w / 2 + 4, baseLine - h);
      }

      ctx.lineTo(currentX + w, baseLine - h);
      currentX += w;
      if (currentX > width) break;
    }
    ctx.lineTo(width, baseLine);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw skyline first
    drawSkyline();

    // Update and draw nodes
    nodes.forEach(node => node.update());

    // Draw web interconnecting threads
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DISTANCE) {
          const alpha = (1 - dist / MAX_DISTANCE) * 0.4;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);

          // Alternating web color
          if (nodes[i].isRed && nodes[j].isRed) {
            ctx.strokeStyle = `rgba(255, 8, 68, ${alpha})`;
          } else if (!nodes[i].isRed && !nodes[j].isRed) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          } else {
            ctx.strokeStyle = `rgba(180, 100, 255, ${alpha * 0.8})`;
          }

          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Connect mouse to nearby nodes
    if (mouse.active && mouse.x !== null) {
      for (let i = 0; i < nodes.length; i++) {
        const dx = mouse.x - nodes[i].x;
        const dy = mouse.y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const alpha = (1 - dist / MOUSE_RADIUS) * 0.7;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(nodes[i].x, nodes[i].y);
          ctx.strokeStyle = nodes[i].isRed ? `rgba(255, 8, 68, ${alpha})` : `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Render nodes on top of lines
    nodes.forEach(node => node.draw());

    // Update and draw shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += 6;
      sw.opacity -= 0.025;

      if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
        shockwaves.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color + sw.opacity + ')';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = sw.color + '1)';
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(animate);
  }

  initNodes();
  animate();
})();
