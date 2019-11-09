import React, { useState } from "react";
import trash from "./assets/trash.svg";
import "./reset.css";
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
  // copy of state to be used to filter list display
  const [result, setResult] = useState([...state]);

  // function called when a list item is clicked
  // should toggle the crossed state
  const cross = i => {
    let copy = [...state];
    let crossStatus = copy[i].crossed;
    copy[i].crossed = !crossStatus;
    setState(copy);
    setResult(copy);
  };
  // function to delete item from the list
  const deleteItem = i => {
    let newState = state.filter(el => el !== state[i]);
    setState(newState);
    setResult(newState);
  };
  // create a list item for each state object with a onClick call
  const listing = result.map((el, index) => (
    <li key={index} className={el.crossed ? "crossed" : null}>
      <img
        onClick={() => {
          deleteItem(index);
        }}
        src={trash}
        alt="delete item button"
      />
      <p
        onClick={() => {
          cross(index);
        }}
      >
        {el.message}
      </p>
    </li>
  ));
  // function to add the new input into the state if not empty
  const addTodoHandler = () => {
    if (newInput) {
      setState([...state, { message: newInput, crossed: false }]);
      setResult([...state, { message: newInput, crossed: false }]);
      return setInput("");
    } else {
      return null;
    }
  };
  // update the new input state
  const inputHandler = e => {
    return setInput(e.target.value);
  };
  const searchHandler = e => {
    if (e.target.value) {
      let research = new RegExp(e.target.value);
      let myResult = result.filter(el => research.test(el.message));
      return setResult(myResult);
    } else {
      return setResult([...state]);
    }
  };
  return (
    <>
      <div className="container">
        <h1>✨ 🌟 ⭐️ TO DO LIST ⭐️ 🌟 ✨</h1>
        <div className="search">
          <input type="text" placeholder="SEARCH 👀" onChange={searchHandler} />
        </div>
        <ul>{listing}</ul>
        <div className="more">
          <input type="text" value={newInput} onChange={inputHandler} />
          <button onClick={addTodoHandler}>ADD TO LIST ✏️</button>
        </div>
      </div>
      <footer>
        <a href="https://github.com/Stephanie-Merle/React-myTODOlist">
          ⭐️ CHECK SOURCE CODE HERE ⭐️
        </a>
      </footer>
    </>
  );
};

export default App;
