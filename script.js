import {
        initializeApp
      } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
      import {
        getDatabase,
        ref,
        push
      } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
      const firebaseConfig = {
        apiKey: "AIzaSyC6bAzyUEbj1EI-2yhCkTw5D1WrPqT1HUA",
        authDomain: "rsvp-project-679ba.firebaseapp.com",
        projectId: "rsvp-project-679ba",
        databaseURL: "https://rsvp-project-679ba-default-rtdb.firebaseio.com",
        storageBucket: "rsvp-project-679ba.appspot.com",
        messagingSenderId: "25642635412",
        appId: "1:25642635412:web:33bbdffc6afd92ec7c2481"
      };
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      document.addEventListener("DOMContentLoaded", () => {
        const popup = document.getElementById("invitation-popup");
        const main = document.getElementById("main-content");
        const openInvite = document.getElementById("open-invite");
        const showDetails = document.getElementById("show-details");
        const detailsPopup = document.getElementById("details-popup");
        const closeDetails = document.getElementById("close-details");
        const countdown = document.getElementById("countdown");
        const weddingDate = new Date("2025-12-25T16:00:00").getTime();
        const rsvpForm = document.getElementById("rsvp-form");
        // Modal Elements
        const rsvpModal = document.getElementById("rsvp-modal");
        const rsvpMessage = document.getElementById("rsvp-message");
        const closeModal = document.getElementById("close-modal");
        // Show main content
        openInvite.addEventListener("click", () => {
          popup.classList.add("hidden");
          main.classList.remove("hidden");
        });
        // Countdown
        const updateCountdown = () => {
          const now = new Date().getTime();
          const distance = weddingDate - now;
          if (distance <= 0) {
            countdown.innerHTML = "The Wedding is Live!";
          } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          }
        };
        setInterval(updateCountdown, 1000);
        updateCountdown();
        // Show Wedding Details Modal
        showDetails.addEventListener("click", () => {
          detailsPopup.classList.remove("hidden");
        });
        // Close Wedding Details
        closeDetails.addEventListener("click", () => {
          detailsPopup.classList.add("hidden");
        });
        // RSVP Form Submission
        rsvpForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const name = rsvpForm.querySelector("input").value.trim();
          const attendance = rsvpForm.querySelector("select").value;
          if (name && attendance) {
            // Push data to Firebase
            const rsvpRef = ref(database, "rsvps");
            push(rsvpRef, {
              name,
              attendance
            }).then(() => {
              if (attendance === "yes") {
                rsvpMessage.innerText = `Hi ${name}, we’re so excited you'll join us! See you at the wedding! 🎉`;
              } else {
                rsvpMessage.innerText = `Hi ${name}, we're sorry you can't make it, but thank you for letting us know. 💌`;
              }
              rsvpModal.classList.remove("hidden");
              rsvpForm.reset();
            }).catch((error) => {
              console.error("Error saving RSVP:", error);
              alert("There was an error. Please try again.");
            });
          }
        });
        // Close RSVP Modal
        closeModal.addEventListener("click", () => {
          rsvpModal.classList.add("hidden");
        });
        // Optional: Close modal if clicking outside of modal content
        window.addEventListener("click", (e) => {
          if (e.target === rsvpModal) {
            rsvpModal.classList.add("hidden");
          }
        });
      });
