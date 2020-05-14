import React from 'react'
import { Router } from "@reach/router";
import 'firebase/auth';

import { connect } from "react-redux";

import CreateProjectForm from "./components/CreateProjectForm"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Main = props => (

    <React.Fragment>    
    {props.user ?
    <CreateProjectForm user={props.user} signOut={props.signOut}/>
    : 
    <Router>
    <SignUp path="signUp" setError={props.setError} 
        signInWithGoogle={props.signInWithGoogle} 
        createUserWithEmailAndPassword={props.createUserWithEmailAndPassword}/>
        <SignIn path="/" setError={props.setError} 
        signInWithGoogle={props.signInWithGoogle} 
        signInWithEmailAndPassword={props.signInWithEmailAndPassword}/>
    </Router>
    }
    {
        props.user
    ? props.setError(null)
    : null
    }
    {<div className="container small text-center">{props.error ? props.error : null}</div>}
    </React.Fragment>
);

export default connect(
    null,
    null
)(Main);
  
