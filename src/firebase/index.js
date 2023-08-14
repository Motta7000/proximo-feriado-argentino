// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAWPJ59C3FzpR-kgrCYQG03mB3g--E1Wg",
  authDomain: "proximo-feriado-argentino.firebaseapp.com",
  projectId: "proximo-feriado-argentino",
  storageBucket: "proximo-feriado-argentino.appspot.com",
  messagingSenderId: "734366886218",
  appId: "1:734366886218:web:9102b698a3fb4aa8b4b9b3",
  measurementId: "G-4182M97EY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}