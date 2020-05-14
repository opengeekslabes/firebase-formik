const initialState = {
    age: 20
  };
  
  const reducer = (state = initialState, action) => {
    const newState = { ...state };
  
    switch (action.type) {
      case "PROJECT_REMOVER":
        newState.age = database.ref(`${props.user.uid}/${item.projid}`).remove();
        break;

    }
    return newState;
  };
  
  export default reducer;