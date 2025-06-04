// Importer Firebase-moduler
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

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

// Initialiserer Firebase-appen
const app = initializeApp(firebaseConfig);
 
// Starter Google Analytics (valgfritt)
const analytics = getAnalytics(app);
 
// Henter autentiseringstjenesten fra Firebase
const auth = getAuth(app);
 
// Når brukeren klikker på "Logg inn"-knappen
document.getElementById('submit').addEventListener("click", function(event) {
  event.preventDefault(); // Hindrer at skjemaet sendes på vanlig måte
 
  // Henter verdiene fra e-post og passord-feltene
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
 
  // Prøver å logge inn brukeren med e-post og passord
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Hvis innloggingen lykkes
      alert("Logget inn!"); // Viser en melding
      window.location.href = "index.html"; // Sender brukeren til skjema-siden etter innlogging
    })
    .catch((error) => {
      // Hvis noe går galt (feil e-post/passord f.eks.)
      alert(error.message); // Viser feilmeldingen
    });
});
 