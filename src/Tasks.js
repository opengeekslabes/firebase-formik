import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { database } from "./firebase";
import EditButton from "./EditButton";

function Tasks(props) {
  const [forMap, setForMap] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editAreaValue, setAreaValue] = useState("");
  const value = `${String.fromCharCode(9745)} is done`;

  useEffect(() => {
    database.ref(`${props.user}/${props.index}/tasks`).on("value", snapshot => {
      let allItems = [];
      snapshot.forEach(snap => {
        allItems.push(snap.val());
      });
      setForMap(allItems);
    });
  }, [props.user, props.index]);

  const handleEdit = (item, index) => {
    setAreaValue(
      item.includes(value) ? item.slice(0, item.length - value.length) : item
    );
    setEditIndex(index);
  };

  const handleSave = item => {
    const value = !editAreaValue ? item.taskvalue : editAreaValue;
    database
      .ref(`${props.user}/${props.index}/tasks/${item.taskid}`)
      .update({ taskkey: Date.now(), taskvalue: value });
    setEditIndex("");
  };

  const handleDone = item => {
    database.ref(`${props.user}/${props.index}/tasks/${item.taskid}`).update({
      taskkey: Date.now(),
      taskvalue: item.taskvalue.includes(value)
        ? item.taskvalue.slice(0, item.taskvalue.length - value.length)
        : item.taskvalue + value
    });
  };

  return (
    <div className="form-group">
      <div className="h6">Add new tasks</div>
      <Formik
        initialValues={{
          value: "",
          taskId: 1
        }}
        onSubmit={null}
      >
        {({ values }) => (
          <Form>
            <Field
              as="textarea"
              name="value"
              id="value"
              className="form-control"
              rows="2"
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                const userRef = database.ref(`${props.user}/${props.index}/tasks`);
                userRef.child(`${values.taskId}`).set({
                  taskid: values.taskId++,
                  taskkey: Date.now(),
                  taskvalue: values.value
                });
                values.value = "";
              }}
            >
              Add
            </button>

            <ul>
              {forMap.map((item, index) => (
                <div
                  key={item.taskkey}
                  className="p-2 mt-2 border border-light"
                >
                  {editIndex !== index ? (
                    <li className="h6">{item.taskvalue}</li>
                  ) : (
                    <textarea
                      className="h6"
                      name="editArea"
                      id="editArea"
                      rows="2"
                      defaultValue={editAreaValue}
                      onChange={e => {setAreaValue(e.target.value);}}
                    />
                  )}

                  <hr />
                  <button
                    type="button"
                    className="btn btn-light mr-4"
                    onClick={() => handleDone(item)}
                  >
                    {String.fromCharCode(10004)}
                  </button>
                  <EditButton
                    item={item.taskvalue}
                    index={index}
                    handleEdit={() => handleEdit(item.taskvalue, index)}
                    handleSave={() => handleSave(item)}
                    isEditing={editIndex !== index}
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      database.ref(`${props.user}/${props.index}/tasks/${item.taskid}`).remove()}
                  >
                    {String.fromCharCode(10007)}
                  </button>
                </div>
              ))}
            </ul>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Tasks;
