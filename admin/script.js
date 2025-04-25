// Firebase configuration (replace with your actual config)
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM elements
const guestTable = document.getElementById("guestTable").getElementsByTagName("tbody")[0];
const exportBtn = document.getElementById("exportBtn");

// Fetch RSVP data
function loadRSVPData() {
  const rsvpRef = database.ref("rsvps");
  rsvpRef.once("value", (snapshot) => {
    guestTable.innerHTML = ""; // Clear current table
    let index = 1;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      
      // Handle cases where data might be missing
      if (!data.name || !data.attendance) {
        console.warn("Missing data:", data);
        return; // Skip this entry if required data is missing
      }

      const row = guestTable.insertRow();

      row.insertCell(0).innerText = index++; // Row number
      row.insertCell(1).innerText = data.name; // Name
      row.insertCell(2).innerText = data.attendance; // Attendance
      row.insertCell(3).innerText = "N/A"; // Timestamp (You don't have a timestamp field)
    });
  }).catch(error => {
    console.error("Error fetching data:", error);
  });
}

// Export to CSV
exportBtn.addEventListener("click", () => {
  let csv = "Name,Attendance,Timestamp\n";
  Array.from(guestTable.rows).forEach(row => {
    let cells = Array.from(row.cells).map(cell => cell.innerText);
    csv += cells.join(",") + "\n";
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
