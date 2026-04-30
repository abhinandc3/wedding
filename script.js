if (window.lucide) {
  window.lucide.createIcons();
}

if (window.AOS) {
  window.AOS.init();
}

const petalsLayer = document.querySelector(".petals-layer");

if (petalsLayer) {
  const petalCount = 18;
  const flowerCount = 6;

  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";

    const left = Math.random() * 100;
    const delay = Math.random() * 9;
    const duration = 10 + Math.random() * 10;
    const size = 8 + Math.random() * 10;
    const drift = (Math.random() * 90 - 45).toFixed(0);

    petal.style.left = `${left}%`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.4}px`;
    petal.style.setProperty("--drift", `${drift}px`);

    petalsLayer.appendChild(petal);
  }

  for (let i = 0; i < flowerCount; i += 1) {
    const flower = document.createElement("span");
    flower.className = "flower";

    const left = Math.random() * 100;
    const delay = Math.random() * 11;
    const duration = 14 + Math.random() * 12;
    const size = 16 + Math.random() * 14;
    const drift = (Math.random() * 70 - 35).toFixed(0);

    flower.style.left = `${left}%`;
    flower.style.animationDelay = `${delay}s`;
    flower.style.animationDuration = `${duration}s`;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.setProperty("--drift", `${drift}px`);

    petalsLayer.appendChild(flower);
  }
}

const eventTime = new Date("2026-05-01T19:00:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(0, eventTime - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
