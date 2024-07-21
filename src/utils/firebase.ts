import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
