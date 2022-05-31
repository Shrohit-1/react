// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAYx0Ru--nbIBTCX8P5PxO8LbQ7aGL0LIE",
    authDomain: "reels-bdc92.firebaseapp.com",
    projectId: "reels-bdc92",
    storageBucket: "reels-bdc92.appspot.com",
    messagingSenderId: "782263944028",
    appId: "1:782263944028:web:c940c7a2a27c7fc4223799"
};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);

//authentication
export const auth = firebase.auth();

//database
const firestore= firebase.firestore();

export const database = {
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
}

//storage
export const storage = firebase.storage();