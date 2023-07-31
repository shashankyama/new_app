import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const validateForm = async (e) => {
    var mailId = email;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(mailId)) {
      setEmail("");
      alert("Cannot create account, Please enter a valid email address");
      console.log(mailId);
      return;
    } else {
      try {
        const response = await fetch("http://localhost:8000/checkEmail");
        const jsonData = await response.json(); // Parse the response as JSON
        // Assuming your JSON structure contains a key "COUNT(*)" with the count value
        var count = parseInt(jsonData["COUNT(*)"]);
        if (count !== 0) {
          alert("Account already created");
        } else {
          alert("Successful");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        // Handle errors with fetching or parsing data here
      }
    }
  };

  return (
    <>
      <article>
        <h2>Login Form</h2>
        <form className="form">
          <div className="form-control">
            <label htmlFor="email">Mail : </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => {
              validateForm();
            }}
          >
            Login
          </button>
        </form>
      </article>
    </>
  );
};

export default Login;
