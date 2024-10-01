// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPFK1qsI-TAKRTstBUIzhTQTiqCj4St8s",
  authDomain: "personal-app-40f5d.firebaseapp.com",
  projectId: "personal-app-40f5d",
  storageBucket: "personal-app-40f5d.appspot.com",
  messagingSenderId: "544338682031",
  appId: "1:544338682031:web:1269716a70660727ebf45a",
  measurementId: "G-73WZ7NK5WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dataFirebase = getFirestore(app);
export default dataFirebase
// const analytics = getAnalytics(app);