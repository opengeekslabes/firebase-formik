import React from "react";
import { Link } from "@reach/router";
import 'firebase/auth';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignIn = (props) => {
  return (
    <div className="container">
      <div className="mt-3 mb-3 p-4 border border-light">
        <div className="h2 mb-4">Sign In</div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const {email, password} = values;
            console.log(ErrorMessage)
            props.signInWithEmailAndPassword(email, password);
            setSubmitting(false);
        }}>
        {({ isSubmitting })  => (
          <Form>
            <div className="form-group">
              <label htmlFor="email" className="">
                Email:
              </label>
              <Field type="email" name="email" placeholder="Your Email" id="email" className="form-control" autoComplete="username"/>
              <ErrorMessage name="email" component="div" />
            </div>  
            <div className="form-group">
              <label htmlFor="password" className="">
                Password:
              </label>
              <Field type="password" name="password" placeholder="Your Password" id="password" className="form-control" autoComplete="new-password"/>
              <ErrorMessage name="password" component="div" />
            </div>  
            <button type='submit' disabled={isSubmitting} className="mt-3 mb-3 btn btn-light" >
              Sign in
            </button>
          </Form>
          )}
          </Formik>
          <p className="h6">
            Don't have an account?
            <Link to="signUp" className="">
              Sign up here
            </Link>
          </p>      
      </div>
    </div>
  );
};

export default SignIn;