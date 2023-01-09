// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0db0OtbeulV8-GJSl94PnQwCrS-M7OOI",
  authDomain: "test-4b489.firebaseapp.com",
  projectId: "test-4b489",
  storageBucket: "test-4b489.appspot.com",
  messagingSenderId: "620925214739",
  appId: "1:620925214739:web:28c92abc422a58925d5fe6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
