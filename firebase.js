import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6_9V_vNqliVuGIqBr_uJLxU3_vOclkDI",
    authDomain: "concertlink-db295.firebaseapp.com",
    projectId: "concertlink-db295",
    storageBucket: "concertlink-db295.appspot.com",
    messagingSenderId: "503775640955",
    appId: "1:503775640955:web:2bbb9e1e00f59cade311de"
  };

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
