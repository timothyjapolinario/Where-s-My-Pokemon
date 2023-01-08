import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACsFbNW8Ga967uyHd3CPAhctq5rEyVr1U",
  authDomain: "where-s-my-pokemon.firebaseapp.com",
  projectId: "where-s-my-pokemon",
  storageBucket: "where-s-my-pokemon.appspot.com",
  messagingSenderId: "338974024386",
  appId: "1:338974024386:web:286b16dea12545bd8a915b",
  measurementId: "G-PJLNYKWV9D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
