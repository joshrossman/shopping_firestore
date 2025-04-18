// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbrafEcA_jBLPR8tmwIjYPr_RfXypt-ok",
  authDomain: "shoppingcar-fc2f9.firebaseapp.com",
  projectId: "shoppingcar-fc2f9",
  storageBucket: "shoppingcar-fc2f9.firebasestorage.app",
  messagingSenderId: "32506048304",
  appId: "1:32506048304:web:e3355c53e73f4c5b3ae2f5",
  measurementId: "G-RFNC0H6KXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const users = getFirestore(app);
const products = getFirestore(app);

export const auth = getAuth(app);
export { db, users, products };