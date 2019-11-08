import React, { useState } from "react";
import "./App.css";

const App = () => {
  // default messages when launched
  // should be replaced with local mongoDB data
  const init = [
    { message: "mon message", crossed: false },
    { message: "mon message 2", crossed: true }
  ];
  // the state with all my TODO items
  const [state, setState] = useState(init);
  // the state to get the new input value
  const [newInput, setInput] = useState("");

  // function called when a list item is clicked
  // should toggle the crossed state
  const cross = i => {
    let copy = [...state];
    let crossStatus = copy[i].crossed;
    copy[i].crossed = !crossStatus;
    setState(copy);
    console.log(state);
  };
  // function to delete item from the list
  // const delete = i => {
  //   console.log(i);
  //   let newState = state.filter(el => el !== state[i]);
  //   setState(newState);
  //   console.log(state);
  // };
  // create a list item for each state object with a onClick call
  const listing = state.map((el, index) => (
    <li
      key={index}
      onClick={() => {
        cross(index);
      }}
      className={el.crossed ? "crossed" : null}
    >
      {el.message}
    </li>
  ));
  // function to add the new input into the state if not empty
  const addTodoHandler = () => {
    if (newInput) {
      setState([...state, { message: newInput, crossed: false }]);
      setInput("");
    }
  };
  // update the new input state
  const inputHandler = e => {
    return setInput(e.target.value);
  };
  return (
    <div className="container">
      <h1>TO DO LIST</h1>
      <div className="list">LIST</div>
      <ul>{listing}</ul>

      <input type="text" value={newInput} onChange={inputHandler} />
      <div>
        <button onClick={addTodoHandler}>ADD A TODO</button>
      </div>
    </div>
  );
};

export default App;
