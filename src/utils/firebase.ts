// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.TYPES_APP_API_KEY,
  authDomain: "academic-resources-14608.firebaseapp.com",
  projectId: "academic-resources-14608",
  storageBucket: "academic-resources-14608.appspot.com",
  messagingSenderId: "505933380198",
  appId: "1:505933380198:web:2296f5ed5bc56118d58ba7",
  measurementId: "G-J4Q0C140P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
