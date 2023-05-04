
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAT3TikzxvhBV3y4w2fy8x2tmiMu-Bk5Mk",
  authDomain: "noteapp-a020a.firebaseapp.com",
  projectId: "noteapp-a020a",
  storageBucket: "noteapp-a020a.appspot.com",
  messagingSenderId: "751621928254",
  appId: "1:751621928254:web:85be6126fa543944ab286f",
  measurementId: "G-VREDHPL77Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth } 