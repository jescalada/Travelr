// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsmiWpuLL69R3E7VD7DPtbf8P5WuDj7vE",
    authDomain: "travelr-70ef0.firebaseapp.com",
    databaseURL: "https://travelr-70ef0-default-rtdb.firebaseio.com",
    projectId: "travelr-70ef0",
    storageBucket: "travelr-70ef0.appspot.com",
    messagingSenderId: "536601835692",
    appId: "1:536601835692:web:e50467efa3407421e38709"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize real time databse 
  const db = firebase.database();

  //login user prompt
  //const username = prompt("Please Tell Us Your Name");



