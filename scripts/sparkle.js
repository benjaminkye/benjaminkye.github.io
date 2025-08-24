const DEFAULT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--accent');

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateSparkle(wrapper, color = DEFAULT_COLOR) {
  const size = random(10, 15);
  const sparkle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sparkle.classList.add("sparkle");
  sparkle.setAttribute("width", size);
  sparkle.setAttribute("height", size);
  sparkle.setAttribute("viewBox", "0 0 68 68");
  sparkle.style.top = random(0,100) + "%";
  sparkle.style.left = random(0,100) + "%";
  
  // "centering" by offseting by halfof size
  sparkle.style.translate = `-${size/2}px -${size/2}px`;
  
  //random z-indexing, want 20% rendered above with rest under
  sparkle.style.zIndex = Math.random() < 0.2 ? 1 : -1;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z");
  path.setAttribute("fill", color);

  sparkle.appendChild(path);
  wrapper.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

function startSparkles(wrapper) {
  function tick() {
    generateSparkle(wrapper);
    setTimeout(tick, random(250, 350));
  }
  tick();
}

function initSparkle() {
    document.querySelectorAll(".sparkly").forEach(startSparkles);
}
