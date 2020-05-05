import React, { useState } from "react";
import EditButton from './EditButton';

function Tasks (props) {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [editAreaValue, setAreaValue] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [doneIndexArr, setDoneIndexArr] = useState([]);
  
  const handleAdd = () => {
    if (!value) {
      alert(props.errorMessage);
      return;
    }
    setArr(arr => [...arr, {key: Date.now(), value: value}])
    setValue("")
  };

  const handleRemove = ind => {
    let id = arr[ind].key;

    if (doneIndexArr.includes(id)) {
      let del = doneIndexArr.indexOf(id);
      doneIndexArr.splice(del, 1);
    }

    let result = arr.filter((item, index) => {
    return ind !== index
    });

    setArr(result)
    setDoneIndexArr(doneIndexArr);
  };

  const handleEdit = (item, index) => {
    setEditIndex(index);
  };

  const handleSave = (item, index) => {
    let value = !editAreaValue ? item : editAreaValue;
    arr[index].value = value;
    setEditIndex("");
  };

  const handleDone = index => {
    let id = arr[index].key;
    let newArr = doneIndexArr.slice();

    let del = newArr.indexOf(id);
    newArr.includes(id)
      ? newArr.splice(del, 1)
      : newArr.push(id);
    setDoneIndexArr(newArr)
  };

  let arrValues = [];
  let arrKeys = [];

  for (let item of arr) {
    arrValues.push(item.value);
    arrKeys.push(item.key);
  }

  return (
    <div className="form-group">
      <div className="h6">Add new tasks</div>
      <textarea
        className="form-control"
        value={value}
        name="value"
        rows="2"
        onChange={(e) => { setValue(e.target.value)} }
      />
      <button
        type="button"
        className="btn btn-light"
        onClick={handleAdd}
      >
        Add
      </button>
      <ul>
        {arrValues.map((item, index) => (
          <div key={arrKeys[index]} className="p-2 mt-2 border border-light">
            {editIndex !== index ? (
              <li className="h6">
                {doneIndexArr.includes(arrKeys[index])
                  ? `${item} ${String.fromCharCode(9745)} is done`
                  : item}
              </li>
            ) : (
              <textarea
                className="h6"
                name="editArea"
                id="editArea"
                rows="2"
                defaultValue={item}
                onChange={(e) => { setAreaValue(e.target.value)} } 
              />
            )}
            <hr />
            <button
              type="button"
              className="btn btn-light mr-4"
              onClick={() => handleDone(index)}
            >
              {String.fromCharCode(10004)}
            </button>
            <EditButton
              item={item}
              index={index}
              handleEdit={() => handleEdit(item, index)}
              handleSave={() => handleSave(item, index)}
              isEditing={editIndex !== index}
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleRemove(index)}
            >
              {String.fromCharCode(10007)}
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;