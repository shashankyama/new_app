import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/people")
      .then((res) => res.json())
      .then((data) => setMydata(data));
  }, mydata);

  return (
    <>
      <div className="App">
        <h1>{message}</h1>
      </div>
      <ul>
        {mydata.map((record) => (
          <li key={record.id}>
            ID: {record.id}, Name: {record.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
