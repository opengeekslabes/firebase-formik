import React from "react";
import { Link } from "@reach/router";
import 'firebase/auth';
import { Formik, Form, Field } from 'formik';

const SignIn = (props) => {
  return (
    <div className="container">
      <div className="mt-3 mb-3 p-4 border border-light">
        <div className="h2 mb-4">Sign In</div>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            const {email, password} = values;
            props.signInWithEmailAndPassword(email, password);
          }}>
          {props => (
            <Form>
              <div className="form-group">
                <label htmlFor="email" className="">
                  Email:
                </label>
                <Field type="email" name="email" placeholder="Your Email" id="email" className="form-control" autoComplete="username"/>
              </div>  
              <div className="form-group">
                <label htmlFor="password" className="">
                  Password:
                </label>
                <Field type="password" name="password" placeholder="Your Password" id="password" className="form-control" autoComplete="new-password"/>
              </div>  
              <button type='submit' className="mt-3 mb-3 btn btn-primary">
                Sign in
              </button>
            </Form>
            )}
          </Formik>
          <p className="h6">
            Don't have an account?{" "}
            <Link to="signUp" className="ml-2" onClick={() => props.setError(null)}>
              Sign up here
            </Link>
          </p>
          <span className="h6"> or sign in with <button type="button" className="btn btn-primary" onClick={props.signInWithGoogle}>Google</button></span>       
      </div>
    </div>
  );
};

export default SignIn;