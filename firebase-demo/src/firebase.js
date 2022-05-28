// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyCA6phGnmW12IyxSYbymjnhz81pGTNz5aA",

  authDomain: "cbjzch.firebaseapp.com",

  projectId: "cbjzch",

  storageBucket: "cbjzch.appspot.com",

  messagingSenderId: "1060663224778",

  appId: "1:1060663224778:web:147bc2d6378bb079854733"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);

//authentication
export const auth = firebase.auth();

//database
const firestore= firebase.firestore();

export const database = {
  users : firestore.collection('users')
}

//storage
export const storage = firebase.storage();