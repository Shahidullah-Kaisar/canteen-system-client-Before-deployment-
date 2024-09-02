// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_77Ug3sG0W9S1q_wsWfMZ6J2XEFSQ5FI",
  authDomain: "canteen-system-client.firebaseapp.com",
  projectId: "canteen-system-client",
  storageBucket: "canteen-system-client.appspot.com",
  messagingSenderId: "287372569791",
  appId: "1:287372569791:web:19c1aa74b09085beb26a0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;