// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyARS8xnOx8pjVlTpvu8oTGvseKcZ24YWHk",
  authDomain: "heartbit-51f72.firebaseapp.com",
  databaseURL: "https://heartbit-51f72-default-rtdb.firebaseio.com",
  projectId: "heartbit-51f72",
  storageBucket: "heartbit-51f72.appspot.com",
  messagingSenderId: "782750352151",
  appId: "1:782750352151:web:3c1c053dd7b80fc2f32d52"
};

const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Realtime Database
const realtimeDb = getDatabase(app);

export { db, realtimeDb };
