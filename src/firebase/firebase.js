import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlCihxEVyCpbuI_OvTEcRPXeHVSpU5l2A",
  authDomain: "pixel-prigel.firebaseapp.com",
  projectId: "pixel-prigel",
  storageBucket: "pixel-prigel.firebasestorage.app",
  messagingSenderId: "465940628848",
  appId: "1:465940628848:web:c7458122bd388d17c73bb5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);