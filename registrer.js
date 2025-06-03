// Importer Firebase-moduler
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Firebase-konfigurasjon
const firebaseConfig = {
  apiKey: "AIzaSyDBE0CT9MGv9vP6tBwqhX8g9HWcqIsYYx8",
  authDomain: "eksamen-30ec7.firebaseapp.com",
  projectId: "eksamen-30ec7",
  storageBucket: "eksamen-30ec7.appspot.com",
  messagingSenderId: "782944361506",
  appId: "1:782944361506:web:6c22d8300a6fafdcb6be7b",
  measurementId: "G-0KF3FLVRV0"
};

// Initialiserer Firebase-appen med konfigurasjonen over
const app = initializeApp(firebaseConfig);
 
// Starter Google Analytics (valgfritt)
const analytics = getAnalytics(app);
 
// Henter autentiseringstjenesten (for innlogging og registrering)
const auth = getAuth(app);
 
// Når brukeren trykker på "Opprett konto"-knappen
document.getElementById('submit').addEventListener("click", function(event) {
  event.preventDefault(); // Stopper skjemaet fra å sende inn på vanlig måte (vi bruker JavaScript)
 
  // Henter verdiene brukeren skrev inn i e-post og passordfeltene
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
 
  // Forsøker å opprette en ny bruker med e-post og passord
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Hvis alt gikk bra – vis en melding og send brukeren til innloggingssiden
      alert("Bruker opprettet!");
      window.location.href = "login.html"; // Navigerer til login.html
    })
    .catch((error) => {
      // Hvis noe gikk galt – vis feilmeldingen
      alert(error.message);
    });
});
 
 