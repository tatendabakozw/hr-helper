import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-er4SimSB1tDD6RXiFjtJqFAScOTT4FU",
  authDomain: "thot-ai.firebaseapp.com",
  projectId: "thot-ai",
  storageBucket: "thot-ai.appspot.com",
  messagingSenderId: "78619791664",
  appId: "1:78619791664:web:6aa9a32c6467ed9d2db8f5",
  measurementId: "G-T2WKXHBLVD"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);