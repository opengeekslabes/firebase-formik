import React from 'react'
import firebase from 'firebase';
import {firebaseApp} from './firebase';
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CreateProjectForm from "./CreateProjectForm"
import 'firebase/auth';
import withFirebaseAuth from 'react-with-firebase-auth';


const firebaseAppAuth = firebaseApp.auth();


// const createComponentWithAuth = withFirebaseAuth({
//   firebaseAppAuth,
// });
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
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
          {user ?
            <CreateProjectForm user={user} signOut={signOut}/>
             : 
            <Router>
             <SignUp path="signUp" setError={setError} 
              signInWithGoogle={signInWithGoogle} 
              createUserWithEmailAndPassword={createUserWithEmailAndPassword}/>
              <SignIn path="/" setError={setError} 
              signInWithGoogle={signInWithGoogle} 
              signInWithEmailAndPassword={signInWithEmailAndPassword}/>
            </Router>
            }

    
    {
      user
        ? setError(null)
        : null
    }
    {<div className="container small text-center">{error ? error : null}</div>}
   </React.Fragment>
);
 
/** Wrap it */

export default withFirebaseAuth({
  firebaseAppAuth,
  providers
})(App);

