import React from 'react'
import firebase from 'firebase';
import {firebaseApp} from './firebase/firebase';
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';

import Main from "./Main";
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
const App = (props) => (  
  <Main signInWithEmailAndPassword={props.signInWithEmailAndPassword} 
    createUserWithEmailAndPassword={props.createUserWithEmailAndPassword}
    signInWithGoogle={props.signInWithGoogle}
    signOut={props.signOut}
    setError={props.setError}
    user={props.user}
    error={props.error}
  />
);

export default withFirebaseAuth({
  firebaseAppAuth,
  providers
})(App);

