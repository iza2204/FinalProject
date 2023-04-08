// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from 'firebase/database';
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDfad4-eWBlXrioypHknC-4QVJN_Kh1ZsU",
//     authDomain: "timewizard-36634.firebaseapp.com",
//     databaseURL: "https://timewizard-36634-default-rtdb.firebaseio.com",
//     projectId: "timewizard-36634",
//     storageBucket: "timewizard-36634.appspot.com",
//     messagingSenderId: "164608396929",
//     appId: "1:164608396929:web:05fcc912bf4e78a02f4780",
//     measurementId: "G-BWVSCDKYYX"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//
// export const db = getDatabase(app);
// export const auth = getAuth ();

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);