// Countdown Timer
const countdown = document.getElementById('countdown');
const weddingDate = new Date('2025-12-25T16:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = weddingDate - now;

  if (timeLeft <= 0) {
    countdown.innerHTML = "It's the big day!";
  } else {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}

setInterval(updateCountdown, 1000);

// RSVP Form Handler (Simple Alert for Now)
document.getElementById('rsvp').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const attendance = document.getElementById('attendance').value;
  const meal = document.getElementById('meal').value;

  alert(`Thank you for your RSVP, ${name}!\n\nAttendance: ${attendance}\nMeal Preference: ${meal}`);
});
