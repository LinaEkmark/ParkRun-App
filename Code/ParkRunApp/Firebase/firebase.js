// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
// -- import { getAnalytics } from "firebase/analytics"; tog bort
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: '${process.env.REACT_APP_FIREBASE_KEY}',
  authDomain: '${process.env.REACT_APP_FIREBASE_DOMAIN}',
  projectId: "parkrunapp",
  storageBucket: "parkrunapp.appspot.com",
  messagingSenderId: "71686510903",
  appId: "1:71686510903:web:4bb5fe3187c5665306a2b2",
  measurementId: "G-XJE9TC4E36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();