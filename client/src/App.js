// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {

  function api() {
//    let p1 = document.getElementById("apiparam1").value.replaceAll(" ","_");
//    let p2 = document.getElementById("apiparam2").value.replaceAll(" ","_");
    fetch(`http://localhost:5000/api/${ap1text}.${ap2text}`)
      .then((res) => res.json())
      .then((data) => settextout(data.params));
  };

  function create() {
    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    fetch(`http://localhost:5000/create/${fname}.${lname}`)
      .then((res) => res.json())
      .then((data) => settextout(data.message));
  };

  function read() {
    let id = document.getElementById("id").value;
    fetch(`http://localhost:5000/read/${id}`)
      .then((res) => res.json())
      .then((data) => settextout(data.message));
  };

  function update() {
    let id = document.getElementById("id").value;
    let fname = document.getElementById("firstname").value;
    let lname = document.getElementById("lastname").value;
    fetch(`http://localhost:5000/update/${id}.${fname}.${lname}`)
      .then((res) => res.json())
      .then((data) => settextout(data.message));
  };

  function del() {
    let id = document.getElementById("id").value;
    fetch(`http://localhost:5000/delete/${id}`)
      .then((res) => res.json())
      .then((data) => settextout(data.message));
  };

  function reset() {
    fetch('http://localhost:5000/reset')
      .then((res) => res.json())
      .then((data) => settextout(data.message));
  };

  function dump() {
    fetch('http://localhost:5000/dump')
      .then((res) => res.json())
      .then((data) => settextout(data.message));
  };

  const [textout, settextout] = React.useState("Non-kitty");
  const [ap1text, setap1text] = React.useState("Echo 1");
  const [ap2text, setap2text] = React.useState("Echo 2");
  const [idtext, setidtext] = React.useState("ID");
  const [firstname, setfirstname] = React.useState("First Name");
  const [lastname, setlastname] = React.useState("Last Name");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!textout ? "Loading..." : textout}</p>
        <input type="text" id="apiparam1" value={ap1text} onChange={(e) => (setap1text(e.target.value))} />
        <input type="text" id="apiparam2" value={ap2text} onChange={(e) => (setap2text(e.target.value))} />
        <input type="text" id="id" value={idtext} onChange={(e) => (setidtext(e.target.value))} />
        <input type="text" id="firstname" value={firstname} onChange={(e) => (setfirstname(e.target.value))} />
        <input type="text" id="lastname" value={lastname} onChange={(e) => (setlastname(e.target.value))} />
        <div>
          <button onClick={api}>Echo</button>
          <button onClick={create}>Create</button>
          <button onClick={read}>Read</button>
          <button onClick={update}>Update</button>
          <button onClick={del}>Delete</button>
        </div>
        <div>
          <button onClick={reset}>Reset</button>
          <button onClick={dump}>Full Dump</button>
        </div>
      </header>
    </div>
  );
}

export default App;

