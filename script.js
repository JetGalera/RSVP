document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("invitation-popup");
  const main = document.getElementById("main-content");
  const openInvite = document.getElementById("open-invite");
  const showDetails = document.getElementById("show-details");
  const detailsPopup = document.getElementById("details-popup");
  const closeDetails = document.getElementById("close-details");

  openInvite.addEventListener("click", () => {
    popup.classList.add("hidden");
    main.classList.remove("hidden");
  });

  showDetails.addEventListener("click", () => {
    detailsPopup.classList.remove("hidden");
  });

  closeDetails.addEventListener("click", () => {
    detailsPopup.classList.add("hidden");
  });

  const countdown = document.getElementById("countdown");
  const weddingDate = new Date("2025-12-25T16:00:00").getTime();

  function updateCountdown() {
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

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s until the big day 💍`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  document.getElementById("rsvp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("RSVP submitted! Thank you 💌");
  });
});
