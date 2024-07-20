// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfSXjLtZeniWlcPiRIjRnP81nLIBj2xro",
  authDomain: "academic-resources-14608.firebaseapp.com",
  databaseURL: "https://academic-resources-14608-default-rtdb.firebaseio.com",
  projectId: "academic-resources-14608",
  storageBucket: "academic-resources-14608.appspot.com",
  messagingSenderId: "505933380198",
  appId: "1:505933380198:web:2296f5ed5bc56118d58ba7",
  measurementId: "G-J4Q0C140P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);