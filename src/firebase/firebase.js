import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcIB5hgFoF5ew2hxXHmeI8mfisxkTU6L0",
  authDomain: "keep-clone-r.firebaseapp.com",
  projectId: "keep-clone-r",
  storageBucket: "keep-clone-r.appspot.com",
  messagingSenderId: "940829119325",
  appId: "1:940829119325:web:054319f015c7961b660eb4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
