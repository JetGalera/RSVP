import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6bAzyUEbj1EI-2yhCkTw5D1WrPqT1HUA",
  authDomain: "rsvp-project-679ba.firebaseapp.com",
  projectId: "rsvp-project-679ba",
  databaseURL: "https://rsvp-project-679ba-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "rsvp-project-679ba.appspot.com",
  messagingSenderId: "25642635412",
  appId: "1:25642635412:web:33bbdffc6afd92ec7c2481"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Open RSVP modal
const openBtn = document.getElementById("confirm-attendance");
const modal = document.getElementById("rsvp-modal");
const closeBtn = document.getElementById("close-modal");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpMessage = document.getElementById("rsvp-message");

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  rsvpMessage.textContent = ""; // clear previous messages
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Submit RSVP
rsvpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const attendance = document.getElementById("attendance").value;

  if (!name || !attendance) return;

  const rsvpRef = ref(database, "rsvps");
  const snapshot = await get(rsvpRef);
  let isDuplicate = false;

  if (snapshot.exists()) {
    snapshot.forEach((childSnap) => {
      if (childSnap.val().name.toLowerCase() === name.toLowerCase()) {
        isDuplicate = true;
      }
    });
  }

  if (isDuplicate) {
    rsvpMessage.textContent = `Hi ${name}, you’ve already submitted your RSVP. 💌`;
    return;
  }

  const timestamp = new Date().toISOString();
  await push(rsvpRef, { name, attendance, submittedAt: timestamp });

  rsvpMessage.textContent = attendance === "yes"
    ? `Yay, ${name}! We're excited you can join us! 🎉`
    : `Thank you for letting us know, ${name}. ❤️`;

  rsvpForm.reset();
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;

    // Toggle answer
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }

    // Toggle arrow
    const arrow = button.querySelector('.arrow');
    arrow.textContent = arrow.textContent === '▼' ? '▲' : '▼';
  });
});
