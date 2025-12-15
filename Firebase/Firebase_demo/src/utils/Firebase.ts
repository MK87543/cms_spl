// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3Cm5Y_5d22VMc6kOOsYJyEIoXniQsDwI",
  authDomain: "spldemo-5363f.firebaseapp.com",
  projectId: "spldemo-5363f",
  storageBucket: "spldemo-5363f.firebasestorage.app",
  messagingSenderId: "938080882426",
  appId: "1:938080882426:web:3d6bfb530006b80be6c343",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
