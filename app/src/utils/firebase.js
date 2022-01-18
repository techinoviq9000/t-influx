// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiHLDJiK_HqWOkwIYrEK_nGJTFd2tr8sU",
  authDomain: "t-influx.firebaseapp.com",
  projectId: "t-influx",
  storageBucket: "t-influx.appspot.com",
  messagingSenderId: "475280789142",
  appId: "1:475280789142:web:bbf1107f5dd5a533c27cb7",
  measurementId: "G-ZCQLXY5PTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);