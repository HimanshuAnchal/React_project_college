// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWmIjA4IPa-GxWd3k1-fGm_dTSqsJZkrA",
  authDomain: "student-records-33a94.firebaseapp.com",
  projectId: "student-records-33a94",
  storageBucket: "student-records-33a94.firebasestorage.app",
  messagingSenderId: "872340901273",
  appId: "1:872340901273:web:aa8dba0a704f78899ed708",
  measurementId: "G-4FLL2E5GXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Google provider
export const googleProvider = new GoogleAuthProvider();