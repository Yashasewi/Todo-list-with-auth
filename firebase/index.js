import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBTkYuzRVsnCCSpqeLZb6vgi4PEndQfRCI",
  authDomain: "todo-app-dee4f.firebaseapp.com",
  projectId: "todo-app-dee4f",
  storageBucket: "todo-app-dee4f.appspot.com",
  messagingSenderId: "554932685113",
  appId: "1:554932685113:web:d3abecacb1f00d1228c0e8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

