document.addEventListener("DOMContentLoaded", () => {
  // Invitation popup logic
  document.getElementById("open-invite").addEventListener("click", () => {
    document.getElementById("invitation-popup").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");

    // Play music when the invitation is clicked
    const music = document.getElementById("background-music");
    music.volume = 0.3; // Optional: softer start
    music.play().catch((error) => {
      console.log("Autoplay blocked, user interaction needed.");
    });

    // Change button text to "Pause Music" after music starts
    document.getElementById("music-toggle").textContent = "Pause Music";
  });

  // Countdown logic
  const countdown = document.getElementById("countdown");
  const weddingDate = new Date("2025-12-13T16:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff < 0) {
      countdown.innerHTML = "It's Wedding Time! 🎉";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // RSVP form logic
  document.getElementById("rsvp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const attendance = document.getElementById("attendance").value;

    const message = attendance === "yes"
      ? `Yay, ${name}! We're so happy you can make it! 🎉`
      : `We're sad you can't come, ${name}. But thank you for letting us know. ❤️`;

    document.getElementById("rsvp-message").textContent = message;
    document.getElementById("rsvp-modal").classList.remove("hidden");
  });

  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("rsvp-modal").classList.add("hidden");
  });

  // Wedding details popup
  document.getElementById("show-details").addEventListener("click", () => {
    document.getElementById("details-popup").classList.remove("hidden");
  });
  document.getElementById("close-details").addEventListener("click", () => {
    document.getElementById("details-popup").classList.add("hidden");
  });

  // Music toggle with smooth fade
  const music = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");

  function fadeVolume(targetVolume, callback) {
    const step = 0.05;
    const interval = 50;
    const fade = setInterval(() => {
      if (Math.abs(music.volume - targetVolume) < step) {
        music.volume = targetVolume;
        clearInterval(fade);
        callback?.();
      } else {
        music.volume += (music.volume < targetVolume ? step : -step);
      }
    }, interval);
  }

  function toggleMusic() {
    if (music.paused) {
      music.play();
      fadeVolume(0.3); // Fade in to volume 0.3
      musicToggle.textContent = "Pause Music";
    } else {
      fadeVolume(0, () => {
        music.pause();
      }); // Fade out before pausing
      musicToggle.textContent = "Play Music";
    }
  }

  musicToggle?.addEventListener("click", toggleMusic);
});
