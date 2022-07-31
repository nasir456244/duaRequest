import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA8YuHOyuPdGPdQNKOO02vTXzhD4oPh8FE",
  authDomain: "request-prayer.firebaseapp.com",
  projectId: "request-prayer",
  storageBucket: "request-prayer.appspot.com",
  messagingSenderId: "389584161716",
  appId: "1:389584161716:web:92245f3884650ce02680e1"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app)


export { db };