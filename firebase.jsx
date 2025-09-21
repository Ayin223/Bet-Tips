// firebase/config.js

import { initializeApp } from "firebase/app";       // ✅ Required
import { getFirestore } from "firebase/firestore";  // ✅ Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD16v66q_FkORd_VD6E6faJPRevIzPL328",
  authDomain: "bet-tips-a48b8.firebaseapp.com",
  projectId: "bet-tips-a48b8",
  storageBucket: "bet-tips-a48b8.appspot.com",
  messagingSenderId: "998835172624",
  appId: "1:998835172624:web:04439028edfc5386d36195",
  measurementId: "G-N26KCFBKCG", // optional
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Get Firestore instance
const db = getFirestore(app);

export { app, db };
