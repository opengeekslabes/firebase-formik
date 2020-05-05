import React, { useState } from 'react'
import Tasks from './Tasks';

function CreateProjectForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [arrProjInfo, setArrProjInfo] = useState([]);
  let [id, setId] = useState(1);
  const errorMessage = "Empty fields!";

  const handleAdd = () => {
    if(!(title && description)) {
      alert(errorMessage)
      return
    }

    let value = `Project: ${title} Description: ${description}`;
    let newItem = {key: Date.now(), value: `id: ${id} ${value}`};
    setArrProjInfo(arrProjInfo => [...arrProjInfo, newItem])
    setId(id + 1)
    setTitle("");
    setDescription("")
  };

  const handleRemove = (ind) => {

    let result = arrProjInfo.filter((item, index) => {
    return ind !== index
    });

    setArrProjInfo(result)
  };

  let arrValues = [];
  let arrKeys = [];
  for (let item of arrProjInfo) {
    arrValues.push(item.value);
    arrKeys.push(item.key);
  }

  return (
    <div className="container mt-5 border border-light rounded p-4">
      <div className="h2 mb-4">Create your Project</div>
      <form id="infoForm" className="form-group">
        <label htmlFor="title">Title of your Project</label>
        <input
          required
          name="title"
          id="title"
          type="text"
          value={title}
          className="form-control mb-3"
          placeholder="title"
          onChange={(e) => { setTitle(e.target.value)}}
        />
        <label htmlFor="title">Description of your Project</label>
        <input
          required
          name="description"
          id="description"
          type="text"
          value={description}
          className="form-control mb-3"
          placeholder="description"
          onChange={(e) => { setDescription(e.target.value) }}
        />
        <button
          type="button"
          className="btn btn-info"
          onClick={handleAdd}
        >
          Add
        </button>
      </form>
      <button type="button" className="btn btn-danger" onClick={props.signOut}>Sign out</button>
      <ul>
        {arrValues.map((item, index) => (
          <div key={arrKeys[index]} className="p-2 mt-2 border border-light">
            <div className="d-flex justify-content-between align-items-center">
              <span className="h5">{item}</span>
              <button type="button" className="btn btn-light" onClick={() => handleRemove(index)}>Remove</button>
            </div>
            <Tasks errorMessage = {errorMessage}/>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CreateProjectForm;