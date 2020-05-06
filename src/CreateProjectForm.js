import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Tasks from "./Tasks";

function CreateProjectForm(props) {
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
        initialValues={{ title: "", description: "", arrProjInfo: [], id: 1 }}
        onSubmit={{}}>

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
            <FieldArray
              name="arrProjInfo"
              render={arrayHelpers => (
                <div>
                  <button
                    type="submit"
                    className="btn btn-info"
                    onClick={() => {
                      arrayHelpers.push({
                        key: Date.now(),
                        value: `id: ${values.id++} Project: ${
                          values.title
                        } Description: ${values.description}`
                      });
                      values.title = "";
                      values.description = "";
                    }}
                  >
                    Add
                  </button>
                  {values.arrProjInfo.map((item, index) => (
                    <ul
                      key={values.arrProjInfo[index].key}
                      className="p-2 mt-2 border border-light"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5">
                          {values.arrProjInfo[index].value}
                        </span>
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </button>
                      </div>
                      <Tasks />
                    </ul>
                  ))}
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateProjectForm;