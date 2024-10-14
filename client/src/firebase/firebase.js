// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoywQObvZ8RXDbc8bIf24q6fnxzgHfY-E",
  authDomain: "propertybazzar-a631e.firebaseapp.com",
  projectId: "propertybazzar-a631e",
  storageBucket: "propertybazzar-a631e.appspot.com",
  messagingSenderId: "365579555544",
  appId: "1:365579555544:web:222a32624652b95bc5fdad",
  measurementId: "G-FG4CZ8ZBJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
