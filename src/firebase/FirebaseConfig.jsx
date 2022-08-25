import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyAa6z9YtxdyOvAm0BTKBaSgUHypRNSvEVQ",
  authDomain: "react-todo-31e8b.firebaseapp.com",
  projectId: "react-todo-31e8b",
  storageBucket: "react-todo-31e8b.appspot.com",
  messagingSenderId: "1046852641562",
  appId: "1:1046852641562:web:79e3f5fd5e189d6bef82a3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db
