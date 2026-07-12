import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";



const firebaseConfig = {

  apiKey: "AIzaSyCj__AhFEE62DrZTvsn4H0zM6lRNBBtLic",

  authDomain: "notesmind--ai.firebaseapp.com",

  projectId: "notesmind--ai",

  storageBucket: "notesmind--ai.firebasestorage.app",

  messagingSenderId: "709152132066",

  appId: "1:709152132066:web:cc059d0700ad7567e747bb",

  measurementId: "G-Q9ZSQ27L5Q"

};



const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);

export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();