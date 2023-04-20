// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCsAm19w53n74uL7bXIjFlXPXjex3Vrj40",
  authDomain: "todo-app-25db3.firebaseapp.com",
  projectId: "todo-app-25db3",
  storageBucket: "todo-app-25db3.appspot.com",
  messagingSenderId: "531319503712",
  appId: "1:531319503712:web:fb526d8ac5fc9a08d93c05",
  measurementId: "G-S1GQ7SENV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
