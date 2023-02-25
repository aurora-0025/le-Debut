/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_APIKEY,
  authDomain: "oogway-testing.firebaseapp.com",
  databaseURL: "https://oogway-testing-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "oogway-testing",
  storageBucket: "oogway-testing.appspot.com",
  messagingSenderId: "578651495090",
  appId: "1:578651495090:web:5d60094398db03389347ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line import/prefer-default-export
export const storage = getStorage(app);