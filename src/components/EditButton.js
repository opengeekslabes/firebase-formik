import React from "react";

function EditButton(props) {
  return props.isEditing === true ? (
    <button
      type="button"
      className="btn btn-light mr-4"
      onClick={() => props.handleEdit()}
    >
      {String.fromCharCode(9998)}
    </button>
  ) : (
    <button
      type="button"
      className="btn btn-light mr-4"
      onClick={() => props.handleSave()}
    >
      {String.fromCharCode(10000)}
    </button>
  );
}

export default EditButton;