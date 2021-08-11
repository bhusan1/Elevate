import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDHjJ0Cgi2byF-T2by1VY4w-M80I4JrMaA",
    authDomain: "elevate-hair-salon.firebaseapp.com",
    databaseURL: "https://elevate-hair-salon-default-rtdb.firebaseio.com",
    projectId: "elevate-hair-salon",
    storageBucket: "elevate-hair-salon.appspot.com",
    messagingSenderId: "589669843505",
    appId: "1:589669843505:web:983e124ab35cad6d96cb10",
    measurementId: "G-LB6R4WRNC2"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;