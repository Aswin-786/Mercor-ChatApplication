
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/auth'
import 'firebase/compat/database'
import 'firebase/database'
import 'firebase/compat/storage'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCnkDtgHroRJKSP-Ra5wOJdhz1uSpHLlWc",
  authDomain: "chatly-3ffd8.firebaseapp.com",
  projectId: "chatly-3ffd8",
  storageBucket: "chatly-3ffd8.appspot.com",
  messagingSenderId: "89491133135",
  appId: "1:89491133135:web:ce0c656c9f816ced671dba"
};


export default firebase.initializeApp(firebaseConfig)