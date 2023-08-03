import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAgl5FIqhwiXd5U_6R33NoNhfQNyl0drZk",
  authDomain: "rg-chatter.firebaseapp.com",
  projectId: "rg-chatter",
  storageBucket: "rg-chatter.appspot.com",
  messagingSenderId: "207669865677",
  appId: "1:207669865677:web:00080eee5d915ca26d4d84",
  measurementId: "G-GYH7L50RDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);