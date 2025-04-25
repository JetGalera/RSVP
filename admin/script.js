// Firebase Setup (no need for import here)
const firebaseConfig = {
  apiKey: "AIzaSyC6bAzyUEbj1EI-2yhCkTw5D1WrPqT1HUA",
  authDomain: "rsvp-project-679ba.firebaseapp.com",
  projectId: "rsvp-project-679ba",
  databaseURL: "https://rsvp-project-679ba-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "rsvp-project-679ba.appspot.com",
  messagingSenderId: "25642635412",
  appId: "1:25642635412:web:33bbdffc6afd92ec7c2481"
};

// Firebase SDK initialization (via the CDN)
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// DOM elements
const guestTable = document.getElementById("guestTable").getElementsByTagName("tbody")[0];
const exportBtn = document.getElementById("exportBtn");

// Fetch RSVP data
function loadRSVPData() {
  const rsvpRef = firebase.database().ref("rsvps");
  rsvpRef.once('value').then((snapshot) => {
    if (!snapshot.exists()) {
      console.error("No data found in Firebase.");
      return;
    }
    guestTable.innerHTML = ""; // Clear current table
    let index = 1;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const row = guestTable.insertRow();

      row.insertCell(0).innerText = index++;
      row.insertCell(1).innerText = data.name;
      row.insertCell(2).innerText = data.attendance;

      // No timestamp, just display "N/A"
      row.insertCell(3).innerText = "N/A";  // Or you can display any other placeholder value
    });
  }).catch((error) => {
    console.error("Error loading RSVP data:", error);
  });
}

// Export to CSV
exportBtn.addEventListener("click", () => {
  let csv = "# , Name , Attendance , Timestamp\n";
  Array.from(guestTable.rows).forEach(row => {
    let cells = Array.from(row.cells).map(cell => cell.innerText);
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
