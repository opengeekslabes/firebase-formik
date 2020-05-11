import "firebase/auth";
import "firebase/firestore";
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDPVUxQVgh3qKWYKB3j-dEzClpdZy1zyzQ",
    authDomain: "firedux-todo-bb03f.firebaseapp.com",
    databaseURL: "https://firedux-todo-bb03f.firebaseio.com",
    projectId: "firedux-todo-bb03f",
    storageBucket: "firedux-todo-bb03f.appspot.com",
    messagingSenderId: "517752140212",
    appId: "1:517752140212:web:3a12d3c131ca7a7eec82e1"
};

export default firebaseConfig
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const database = firebase.database();