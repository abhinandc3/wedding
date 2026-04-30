const EVENT_TIME_ISO = "2026-05-01T19:00:00+05:30";

function initAOS() {
  if (window.AOS) {
    window.AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
    });
  }
}

function initIntroPetals() {
  const introPetals = document.querySelector(".intro-petals");
  if (!introPetals) return;

  const petalCount = 10;
  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "intro-petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 6}s`;
    petal.style.animationDuration = `${10 + Math.random() * 6}s`;
    petal.style.setProperty("--drift", `${(Math.random() * 70 - 35).toFixed(0)}px`);
    introPetals.appendChild(petal);
  }
}

function initMainPetals() {
  const mainPetals = document.querySelector(".main-petals");
  if (!mainPetals) return;

  const petalCount = 8;
  const flowerCount = 4;

  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "main-petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 8}s`;
    petal.style.animationDuration = `${12 + Math.random() * 6}s`;
    petal.style.width = `${8 + Math.random() * 7}px`;
    petal.style.height = `${12 + Math.random() * 8}px`;
    petal.style.setProperty("--drift", `${(Math.random() * 70 - 35).toFixed(0)}px`);
    mainPetals.appendChild(petal);
  }

  for (let i = 0; i < flowerCount; i += 1) {
    const flower = document.createElement("span");
    flower.className = "main-flower";
    const size = 14 + Math.random() * 10;
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.animationDelay = `${Math.random() * 10}s`;
    flower.style.animationDuration = `${16 + Math.random() * 8}s`;
    flower.style.setProperty("--drift", `${(Math.random() * 60 - 30).toFixed(0)}px`);
    mainPetals.appendChild(flower);
  }
}

function initIntroSequence() {
  const intro = document.getElementById("intro");
  const introEnvelope = document.querySelector(".intro-envelope");
  const bgMusic = document.getElementById("bgMusic");
  if (!intro || !introEnvelope) return;

  let resumeMusicOnFocus = false;
  let fadeInterval = null;

  const clearFade = () => {
    if (fadeInterval) {
      window.clearInterval(fadeInterval);
      fadeInterval = null;
    }
  };

  const fadeTo = (targetVolume, onDone) => {
    if (!bgMusic) return;
    clearFade();
    fadeInterval = window.setInterval(() => {
      const current = bgMusic.volume;
      const step = current < targetVolume ? 0.02 : -0.02;
      const next = Math.max(0, Math.min(targetVolume, current + step));
      bgMusic.volume = Number(next.toFixed(2));

      if (Math.abs(next - targetVolume) < 0.001) {
        clearFade();
        if (onDone) onDone();
      }
    }, 100);
  };

  const startIntroSequence = () => {
    if (intro.classList.contains("is-open")) return;
    intro.classList.add("is-open");

    if (bgMusic) {
      bgMusic.volume = 0;
      bgMusic.play().then(() => {
        fadeTo(0.3);
      }).catch(() => {});
    }

    window.setTimeout(() => {
      intro.classList.add("hide");
    }, 1900);
  };

  introEnvelope.addEventListener("click", startIntroSequence, { once: true });
  introEnvelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startIntroSequence();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (!bgMusic) return;

    if (document.hidden) {
      resumeMusicOnFocus = !bgMusic.paused;
      fadeTo(0, () => {
        bgMusic.pause();
      });
      return;
    }

    if (resumeMusicOnFocus) {
      bgMusic.play().then(() => {
        fadeTo(0.3);
      }).catch(() => {});
      resumeMusicOnFocus = false;
    }
  });
}

function initCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const eventTime = new Date(EVENT_TIME_ISO).getTime();

  const updateCountdown = () => {
    const now = Date.now();
    const diff = Math.max(0, eventTime - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  initIntroPetals();
  initMainPetals();
  initIntroSequence();
  initCountdown();
});
