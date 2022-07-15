// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuln3vsOYEx5k6qBWrNsav9EDt6S4fBFQ",
  authDomain: "project-12fba.firebaseapp.com",
  projectId: "project-12fba",
  storageBucket: "project-12fba.appspot.com",
  messagingSenderId: "392698857206",
  appId: "1:392698857206:web:5c5cb4d13076637a558ed7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app)


export { app, db };