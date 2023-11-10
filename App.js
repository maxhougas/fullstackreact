// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [textout, setTextout] = React.useState("Non-kitty");

  function api() {
    let p1 = document.getElementById("apiparam1").value.replaceAll(" ","_");
    let p2 = document.getElementById("apiparam2").value.replaceAll(" ","_");
    fetch(`/api/${p1}.${p2}`)
      .then((res) => res.json())
      .then((data) => setTextout(data.params));
  };

  function create() {
    let fname = document.getElementById("cfirstname").value;
    let lname = document.getElementById("clastname").value;
    fetch(`/create/${fname}.${lname}`)
      .then((res) => res.json())
      .then((data) => setTextout(data.message));
  };

  function read() {
    let id = document.getElementById("rid").value;
    fetch(`/read/${id}`)
      .then((res) => res.json())
      .then((data) => setTextout(data.message));
  };

  function update() {
    let id = document.getElementById("uid").value;
    let fname = document.getElementById("ufirstname").value;
    let lname = document.getElementById("ulastname").value;
    fetch(`/update/${id}.${fname}.${lname}`)
      .then((res) => res.json())
      .then((data) => setTextout(data.message));
  };

  function del() {
    let id = document.getElementById("did").value;
    fetch(`/delete/${id}`)
      .then((res) => res.json())
      .then((data) => setTextout(data.message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!textout ? "Loading..." : textout}</p>
        <input type="text" id="apiparam1" />
        <input type="text" id="apiparam2" />
        <button onClick={api}>Api</button>
        <input type="text" id="cfirstname" />
        <input type="text" id="clastname" />
        <button onClick={create}>Create</button>
        <input type="text" id="rid" />
        <button onClick={read}>Read</button>
        <input type="text" id="uid" />
        <input type="text" id="ufirstname" />
        <input type="text" id="ulastname" />
        <button onClick={update}>Update</button>
        <input type="text" id="did" />
        <button onClick={del}>Delete</button>
      </header>
    </div>
  );
}

export default App;

