import React, {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";
import Tasks from "./Tasks";
import {database} from '../firebase/firebase';

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    forMap: state.age
  };
};

const mapDispachToProps = dispatch => {
  return {
    onRemove: () => dispatch({ type: "PROJECT_REMOVER" }),
  };
};

function CreateProjectForm(props) {
  const [forMap, setForMap] = useState([])

  useEffect( () => {
     database.ref(`${props.user.uid}`).on("value", snapshot => {
      let allItems =  [];
       snapshot.forEach(snap => {
        allItems.push(snap.val());
      });
      setForMap(allItems)
  });  
},[props.user.uid]);

  return (
    <div className="container mt-5 border border-light rounded p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="h2 mb-4">Create your Project</div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={props.signOut}
        >
          Sign out
        </button>
      </div>
      <Formik
        initialValues={{ title: "", description: "", projid: 1 }}
        onSubmit={null}>

        {({ values }) => (
          <Form>
            <div id="infoForm" className="form-group">
              <label htmlFor="title">Title of your Project</label>
              <Field
                as="input"
                name="title"
                placeholder="title"
                id="title"
                className="form-control mb-3"
              />
            </div>
            <div id="infoForm" className="form-group">
              <label htmlFor="description">Description of your Project</label>
              <Field
                as="input"
                name="description"
                placeholder="description"
                id="description"
                className="form-control mb-3"
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-info"
                onClick={() => {
                  const userRef = database.ref(`${props.user.uid}`);
                  userRef.child(`${values.projid}`).set({'projkey': Date.now(), 'projid': values.projid++, 
                  'projvalue': `Project: ${values.title} 
                  Description: ${values.description}`});
                  values.title = "";
                  values.description = "";
                }}
              >
                Add
              </button>
              {forMap.map((item, index) => (
                <ul
                  key={item.projkey}
                  className="p-2 mt-2 border border-light"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5">
                      {`${item.projid} ${item.projvalue}`}
                    </span>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        database.ref(`${props.user.uid}/${item.projid}`).remove()
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <Tasks index = {item.projid} user = {props.user.uid}/>
                </ul>
              ))}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default connect(
  null,
  mapDispachToProps
)(CreateProjectForm);
