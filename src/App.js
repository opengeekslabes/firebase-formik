import React from 'react'
import firebase  from 'firebase';
import firebaseConfig from './firebase';
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CreateProjectForm from "./CreateProjectForm"
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

// const createComponentWithAuth = withFirebaseAuth({
//   firebaseAppAuth,
// });

const App = ({
  /** These props are provided by withFirebaseAuth HOC */
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithTwitter,
  signInAnonymously,
  signOut,
  setError,
  user,
  error,
  loading,
}) => (    
  <React.Fragment>
    {
      user
        ? <CreateProjectForm signOut={signOut}/>
        : <Router>
            <SignUp path="signUp" createUserWithEmailAndPassword={createUserWithEmailAndPassword}/>
            <SignIn path="/" error={error} signInWithEmailAndPassword={signInWithEmailAndPassword}/>
          </Router>
    }
   </React.Fragment>
);
 
/** Wrap it */

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);

