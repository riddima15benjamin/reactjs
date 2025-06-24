// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU1aRU1w1aW9tjC2lvfhg_Wv1F5mKfV-E",
  authDomain: "medgreen-club.firebaseapp.com",
  projectId: "medgreen-club",
  storageBucket: "medgreen-club.firebasestorage.app",
  messagingSenderId: "932272677027",
  appId: "1:932272677027:web:e7b166a8f5f069801d1f16",
  measurementId: "G-WSQFRJK8YT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
