// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALYTZB59Htr43ARa2omydEiaVzd9jrbTM",
  authDomain: "netfixgpt-deb81.firebaseapp.com",
  projectId: "netfixgpt-deb81",
  storageBucket: "netfixgpt-deb81.appspot.com",
  messagingSenderId: "206111954260",
  appId: "1:206111954260:web:2cfdc825394b1e1031a4c1",
  measurementId: "G-NLKML60X2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();