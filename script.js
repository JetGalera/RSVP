// Invitation popup logic
document.getElementById("open-invite").addEventListener("click", () => {
  document.getElementById("invitation-popup").classList.add("hidden");
  document.getElementById("main-content").classList.remove("hidden");
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

// Music toggle button
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

function toggleMusic() {
  if (music.paused) {
    music.play();
    musicToggle.textContent = "Pause Music";
  } else {
    music.pause();
    musicToggle.textContent = "Play Music";
  }
}

// Check for autoplay issue - try to play the music once the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Try to autoplay music
  music.play().catch((error) => {
    // If autoplay is blocked, wait for user interaction to toggle
    console.log("Autoplay blocked, user interaction needed.");
  });
});

// Event listener for toggle button
musicToggle?.addEventListener("click", toggleMusic);
