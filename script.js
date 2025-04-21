document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("invitation-popup");
  const main = document.getElementById("main-content");
  const openInvite = document.getElementById("open-invite");
  const showDetails = document.getElementById("show-details");
  const detailsPopup = document.getElementById("details-popup");
  const closeDetails = document.getElementById("close-details");

  // Handle sticker click
  openInvite.addEventListener("click", () => {
    popup.classList.add("hidden");
    main.classList.remove("hidden");
  });

  // Show wedding details
  showDetails.addEventListener("click", () => {
    detailsPopup.classList.remove("hidden");
  });

  // Close details popup
  closeDetails.addEventListener("click", () => {
    detailsPopup.classList.add("hidden");
  });

  // Countdown timer
  const countdown = document.getElementById("countdown");
  const weddingDate = new Date("2025-12-25T16:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      countdown.innerHTML = "The wedding has begun!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);

  // RSVP submission (basic alert for now)
  document.getElementById("rsvp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("RSVP submitted! Thank you 💌");
  });
});
