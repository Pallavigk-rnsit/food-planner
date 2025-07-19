// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBcmKb5-fRUCK4bh_mtvBB5SzkaAHMVCbk",
  authDomain: "foodplanner-b0ea1.firebaseapp.com",
  projectId: "foodplanner-b0ea1",
  storageBucket: "foodplanner-b0ea1.firebasestorage.app",
  messagingSenderId: "948959994807",
  appId: "1:948959994807:web:f35367b302d519f9e23e32",
  measurementId: "G-K9RKW2B3VE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
