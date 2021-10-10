import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAzcOCH5iqXExYxPENajqBoNHyVcWJ4eCw",  
    authDomain: "mobgym-c83e8.firebaseapp.com",
    projectId: "mobgym-c83e8",  
    storageBucket: "mobgym-c83e8.appspot.com",
    messagingSenderId: "446326653201",
    appId: "1:446326653201:web:8fdc22f3da0e848a044cb0",
    measurementId: "G-0YLJ80YFKY"
  };

  firebase.initializeApp(firebaseConfig);
  
  export default firebase;
