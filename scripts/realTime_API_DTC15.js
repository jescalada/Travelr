const firebaseConfig = {
  apiKey: "AIzaSyDsmiWpuLL69R3E7VD7DPtbf8P5WuDj7vE",
  authDomain: "travelr-70ef0.firebaseapp.com",
  databaseURL: "https://travelr-70ef0-default-rtdb.firebaseio.com",
  projectId: "travelr-70ef0",
  storageBucket: "travelr-70ef0.appspot.com",
  messagingSenderId: "536601835692",
  appId: "1:536601835692:web:e50467efa3407421e38709"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const db = firebase.database();