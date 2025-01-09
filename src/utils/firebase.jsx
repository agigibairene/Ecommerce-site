// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ecommerce-app-a7620.firebaseapp.com",
  projectId: "ecommerce-app-a7620",
  storageBucket: "ecommerce-app-a7620.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();