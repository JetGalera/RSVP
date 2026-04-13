// Import Firebase
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

// Location Modal
const locationBtn = document.getElementById("view-location");
const locationModal = document.getElementById("location-modal");
const closeLocation = document.getElementById("close-location");

if (locationBtn && locationModal) {
  locationBtn.addEventListener("click", () => {
    locationModal.classList.remove("hidden");
  });
}

if (closeLocation && locationModal) {
  closeLocation.addEventListener("click", () => {
    locationModal.classList.add("hidden");
  });
}

// Outfit modal logic
const images = [
  "resources/OutfitInspiration.png",
  "resources/Outfit2.png",
  "resources/Outfit3.png",
  "resources/Outfit4.png"
];

let currentIndex = 0;

const carouselImage = document.getElementById("carousel-image");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

function updateImage() {
  carouselImage.src = images[currentIndex];
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  });
}

// Open RSVP modal
const openBtn = document.getElementById("confirm-attendance");
const modal = document.getElementById("rsvp-modal");
const closeBtn = document.getElementById("close-modal");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpMessage = document.getElementById("rsvp-message");

if (openBtn && modal) {
  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    rsvpMessage.textContent = "";
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

// Submit RSVP
if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const attendance = document.getElementById("attendance").value;

    if (!name || !attendance) return;

    // ✅ Guest list validation
    const allowedNames = [
       "Jet Galera",
  "Jet Brave Galera",
  "Jet Calm Galera",
  "Jet Daring Galera",
  "Jet Elegant Galera",
  "Jet Fearless Galera",
  "Jet Gentle Galera",
  "Jet Happy Galera",
  "Jet Iconic Galera",
  "Jet Joyful Galera",
  "Jet Kind Galera",
  "Jet Lucky Galera",
  "Jet Mighty Galera",
  "Jet Noble Galera",
  "Jet Optimistic Galera",
  "Jet Proud Galera",
  "Jet Quick Galera",
  "Jet Radiant Galera",
  "Jet Strong Galera",
  "Jet Thoughtful Galera",
  "Jet Unique Galera",
  "Jet Valiant Galera",
  "Jet Wise Galera",
  "Jet Xtra Galera",
  "Jet Youthful Galera",
  "Jet Zealous Galera",
  "Jet Adventurous Galera",
  "Jet Bold Galera",
  "Jet Creative Galera",
  "Jet Dreamy Galera",
  "Jet Energetic Galera",
  "Jet Fancy Galera",
  "Jet Glorious Galera",
  "Jet Honest Galera",
  "Jet Inventive Galera",
  "Jet Jazzy Galera",
  "Jet Keen Galera",
  "Jet Loyal Galera",
  "Jet Magical Galera",
  "Jet Neat Galera",
  "Jet Outstanding Galera",
  "Jet Playful Galera",
  "Jet Quiet Galera",
  "Jet Resilient Galera",
  "Jet Smart Galera",
  "Jet Talented Galera",
  "Jet Upbeat Galera",
  "Jet Vibrant Galera",
  "Jet Warm Galera",
  "Jet Xenial Galera",
  "Jet Young Galera",
  "Jet Zesty Galera",
  "Jet Ambitious Galera",
  "Jet Bright Galera",
  "Jet Clever Galera",
  "Jet Dynamic Galera",
  "Jet Eager Galera",
  "Jet Friendly Galera",
  "Jet Gracious Galera",
  "Jet Heroic Galera",
  "Jet Inspiring Galera",
  "Jet Jolly Galera",
  "Jet Lively Galera",
  "Jet Motivated Galera",
  "Jet Nice Galera",
  "Jet Polished Galera",
  "Jet Reliable Galera",
  "Jet Spirited Galera",
  "Jet Trusty Galera",
  "Jet Winning Galera"
    ];

    if (!allowedNames.includes(name)) {
      rsvpMessage.textContent = "Please select your name from the list 💌";
      return;
    }

    const rsvpRef = ref(database, "rsvps");
    const snapshot = await get(rsvpRef);
    let isDuplicate = false;

    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        if (childSnap.val().name.trim().toLowerCase() === name.toLowerCase()) {
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

    rsvpMessage.textContent =
      attendance === "yes"
        ? `Yay, ${name}! We're excited you can join us! 🎉`
        : `Thank you for letting us know, ${name}. ❤️`;

    rsvpForm.reset();
  });
}

// FAQ Toggle
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;

    if (answer.style.display === "block") {
      answer.style.display = "none";
    } else {
      answer.style.display = "block";
    }

    const arrow = button.querySelector(".arrow");
    arrow.textContent = arrow.textContent === "▼" ? "▲" : "▼";
  });
});
