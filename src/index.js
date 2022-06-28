// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, push, onValue, connectDatabaseEmulator } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyAA1CRWUuPdO2b_M5VkhzZFSdb2MIkfC0k",
  authDomain: "test-project-d468e.firebaseapp.com",
  databaseURL: "https://test-project-d468e-default-rtdb.firebaseio.com",
  projectId: "test-project-d468e",
  storageBucket: "test-project-d468e.appspot.com",
  messagingSenderId: "1073019508914",
  appId: "1:1073019508914:web:871635655f25fa5a86d1ab",
  measurementId: "G-25M0S0DPCV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
if (location.hostname === "localhost") {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "localhost", 9000);
}

const msgSend = document.querySelector(".messageSend");

const msgInput = document.querySelector(".msgText");

const msgRef = ref(db, 'messages');

const msgList = document.querySelector(".messageList");

let messages = [];

function renderArray() {
  
  while (msgList.firstChild) {
    msgList.removeChild(msgList.firstChild);
  }
  let msgLen = messages.length;

  for (let i = 0; i < msgLen; i++) {
    console.log("creating list");
    let newMsg = document.createElement("li");
    msgList.appendChild(newMsg);
    newMsg.textContent = messages.pop();
  }
}
function sendMessage(e) {

  const currentDate = new Date();

  console.log(currentDate);

  e.preventDefault();

  console.log(msgInput.value);

  let msgVal = msgInput.value;

  push(msgRef, {
    message : msgVal,
    date : Date.now()
  });

  msgInput.value = '';
}

onValue(msgRef, (snapshot) => {
  messages = [];
  console.log("msgRef: " + snapshot.val());
  snapshot.forEach((childSnapshot) => {
    let msgVal = childSnapshot.child('message').val();
    let localDateValue = childSnapshot.child('date').val();
    let localDate = new Date(localDateValue);
    messages.push(localDate.toLocaleString() + ": " + msgVal);
  })
  
  console.log(messages.length);
  console.log(messages);
  renderArray();

}
  
)

messages.addEventListener

msgSend.addEventListener('submit', sendMessage);
