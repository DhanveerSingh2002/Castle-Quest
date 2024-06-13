// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "castle-quest-ca9d7.firebaseapp.com",
  projectId: "castle-quest-ca9d7",
  storageBucket: "castle-quest-ca9d7.appspot.com",
  messagingSenderId: "4465582757",
  appId: "1:4465582757:web:2fe8087dc679cad1dc634c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);