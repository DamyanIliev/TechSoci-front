// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCcJi0YCCKuX1euu_Iv3ulwprJU5K8HmqU",
  authDomain: "my-react-chat-e6187.firebaseapp.com",
  projectId: "my-react-chat-e6187",
  storageBucket: "my-react-chat-e6187.appspot.com",
  messagingSenderId: "130982166855",
  appId: "1:130982166855:web:b49231841c76d8caaa8c62",
  measurementId: "G-M999V7L34W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
