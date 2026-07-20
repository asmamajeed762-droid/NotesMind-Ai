import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5LV81bV4fL953iog5jIqcq_kqinJUtaI",
  authDomain: "notesmind--ai.firebaseapp.com",
  projectId: "notesmind--ai",
  storageBucket: "notesmind--ai.firebasestorage.app",
  messagingSenderId: "709152132066",
  appId: "1:709152132066:web:401757c08f710d33e747bb",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };