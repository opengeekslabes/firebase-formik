import React from "react";
import { Link } from "@reach/router";
import { Formik, Form, Field } from 'formik';

const SignUp = (props) => {

  return (
    <div className="container">
      <div className="mt-3 mb-3 p-4 border border-light">
        <div className="h2 mb-4">Sign Up</div>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            const {email, password} = values;
            !email || !password ? alert('Error: empty fields!') :
            props.createUserWithEmailAndPassword(email, password).catch(error => {
              actions.setSubmitting(false);
            })
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
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit" className="mt-3 mb-3 btn btn-light">
            Sign up
          </button>
          </Form>
        )}
        </Formik>
        <p className="h6">
          Already have an account?{" "}
          <Link to="/" className="">
            Sign in here
          </Link>
        </p>
      </div>
    
    </div>
  );
};


export default SignUp;