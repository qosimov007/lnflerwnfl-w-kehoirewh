import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLS5_yIQw0DsRh9WMDGW8C2pOON-nVgIk",
  authDomain: "my-kitchen-4fcbc.firebaseapp.com",
  projectId: "my-kitchen-4fcbc",
  storageBucket: "my-kitchen-4fcbc.appspot.com",
  messagingSenderId: "889552863346",
  appId: "1:889552863346:web:b34aa7620cf2c7206c42eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export { auth, googleProvider };
