function initWaves(options = {}) {
  // options (tweak as needed)
  const {
    background = `
      radial-gradient(1200px 800px at 70% 20%, #15171a, transparent 70%),
      radial-gradient(1000px 700px at 20% 80%, #15171a, transparent 70%),
      linear-gradient(180deg, #0f1012, #1a1b1e 60%, #131416 100%)
    `,
    waveRGB = '122, 122, 122',
    opacities = [0.035, 0.030, 0.025],
    speedOffset = .65,
    speeds = [0.18+speedOffset, 0.12+speedOffset, 0.08+speedOffset],
    amps = [24, 32, 44],
    wavelengths = [620, 880, 1100],
    zIndex = -1,
    opacity = 0.9
  } = options;

 
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.zIndex = String(zIndex);
  container.style.pointerEvents = 'none';
  container.style.background = background;

  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.opacity = String(opacity);
  container.appendChild(canvas);

  document.body.prepend(container);

  if (reduceMotion) {
    return {
      destroy() {
        container.remove();
      }
    };
  }

  // rendering
  const ctx = canvas.getContext('2d', { alpha: true });
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let t = 0;
  let lastTime = 0;
  let running = true;

  const waves = [
    { speed: speeds[0], amp: amps[0], wl: wavelengths[0], color: `rgba(${waveRGB}, ${opacities[0]})`, yOff: 0.50 },
    { speed: speeds[1], amp: amps[1], wl: wavelengths[1], color: `rgba(${waveRGB}, ${opacities[1]})`, yOff: 0.55 },
    { speed: speeds[2], amp: amps[2], wl: wavelengths[2], color: `rgba(${waveRGB}, ${opacities[2]})`, yOff: 0.60 },
  ];

  function resize() {
    const w = Math.floor(canvas.clientWidth * DPR);
    const h = Math.floor(canvas.clientHeight * DPR);
    canvas.width = w;
    canvas.height = h;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function drawWave({ speed, amp, wl, color, yOff }, time) {
    ctx.beginPath();
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const baseY = ch * yOff;
    const ampJitter = amp;
    const k = (Math.PI * 2) / wl;
    const phase = time * speed * 0.8;

    const step = 4;
    for (let x = 0; x <= cw; x += step) {
      const y = baseY + Math.sin(x * k + phase) * ampJitter;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(cw, ch + 20);
    ctx.lineTo(0,  ch + 20);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
  }

  function tick(now) {
    if (!running) return;
    if (lastTime === 0) lastTime = now;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    t += dt;

    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    ctx.clearRect(0, 0, cw, ch);

    for (let i = 0; i < waves.length; i++) drawWave(waves[i], t);

    const g = ctx.createLinearGradient(0, 0, 0, ch);
    g.addColorStop(0, 'rgba(0,0,0,0.05)');
    g.addColorStop(1, 'rgba(0,0,0,0.0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cw, ch);

    requestAnimationFrame(tick);
  }

  function onVisibility() {
    running = !document.hidden;
    if (running) {
      lastTime = 0;
      requestAnimationFrame(tick);
    }
  }

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  resize();
  requestAnimationFrame(tick);

  return {
    destroy() {
      running = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      container.remove();
    }
  };
}
