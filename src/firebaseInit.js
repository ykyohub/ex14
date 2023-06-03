// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC3LwvrSHggLC-VjpyVoDByWPe4FbfYFo",
  authDomain: "ex10-1f84b.firebaseapp.com",
  projectId: "ex10-1f84b",
  storageBucket: "ex10-1f84b.appspot.com",
  messagingSenderId: "95209176816",
  appId: "1:95209176816:web:07c8bea34d677d507e0c35",
  measurementId: "G-K843W63QVQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);