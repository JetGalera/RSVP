import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6bAzyUEbj1EI-2yhCkTw5D1WrPqT1HUA",
  authDomain: "rsvp-project-679ba.firebaseapp.com",
  projectId: "rsvp-project-679ba",
  databaseURL: "https://rsvp-project-679ba-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "rsvp-project-679ba.appspot.com",
  messagingSenderId: "25642635412",
  appId: "1:25642635412:web:33bbdffc6afd92ec7c2481"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM elements
const guestTable = document.getElementById("guestTable").getElementsByTagName("tbody")[0];
const exportBtn = document.getElementById("exportBtn");

// Fetch RSVP data
function loadRSVPData() {
  const rsvpRef = ref(database, "rsvps");
  get(rsvpRef).then((snapshot) => {
    guestTable.innerHTML = ""; // Clear current table
    let index = 1;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const row = guestTable.insertRow();

      // Add guest details to row
      row.insertCell(0).innerText = index++;
      row.insertCell(1).innerText = data.name;
      row.insertCell(2).innerText = data.attendance;

      // Convert timestamp to human-readable format
      const timestamp = new Date(data.timestamp).toLocaleString();
      row.insertCell(3).innerText = timestamp;

      // Add the delete button
      const deleteCell = row.insertCell(4);
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.classList.add("delete-btn");

      // Add event listener to delete button
      deleteBtn.addEventListener("click", () => {
        deleteRSVP(childSnapshot.key, row);
      });

      deleteCell.appendChild(deleteBtn);
    });
  }).catch((error) => {
    console.error("Error fetching data: ", error);
  });
}

// Delete RSVP from Firebase and remove from table
function deleteRSVP(guestId, row) {
  const rsvpRef = ref(database, `rsvps/${guestId}`);
  // Remove the guest data from Firebase
  remove(rsvpRef).then(() => {
    // Remove the row from the table
    row.remove();
  }).catch((error) => {
    console.error("Error deleting data: ", error);
  });
}

// Export to CSV
exportBtn.addEventListener("click", () => {
  let csv = "# , Name , Attendance , Timestamp\n";
  Array.from(guestTable.rows).forEach(row => {
    let cells = Array.from(row.cells).map((cell, index) => {
      // Exclude the last column (the delete button)
      if (index === row.cells.length - 1) {
        return ''; // Skip the delete button column
      }
      return cell.innerText; // Get the text content of the other columns
    });
    csv += cells.join(" , ") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "RSVP_Guests.csv";
  a.click();
});

// Initial load
loadRSVPData();
