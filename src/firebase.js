import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDfad4-eWBlXrioypHknC-4QVJN_Kh1ZsU",
    authDomain: "timewizard-36634.firebaseapp.com",
    databaseURL: "https://timewizard-36634-default-rtdb.firebaseio.com",
    projectId: "timewizard-36634",
    storageBucket: "timewizard-36634.appspot.com",
    messagingSenderId: "164608396929",
    appId: "1:164608396929:web:05fcc912bf4e78a02f4780",
    measurementId: "G-BWVSCDKYYX"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();