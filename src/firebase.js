// firebase.js

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyCsdHmEyton0hpjeL78i6sCtLW-udHBNGk",
  authDomain: "expense-tracker-react-1867a.firebaseapp.com",
  projectId: "expense-tracker-react-1867a",
  storageBucket: "expense-tracker-react-1867a.appspot.com",
  messagingSenderId: "385014797720",
  appId: "1:385014797720:web:3ad7d864711906ed7247ed"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
