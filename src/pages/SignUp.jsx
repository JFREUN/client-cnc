import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 
const API_URL = "http://localhost:5005";

export default function SignUp(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password};
 
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
  <div>
    <section className="signUp-container">
    <div>
        <h2>Sign up here</h2>

        <form action="/signup" onSubmit={handleSignupSubmit}>

        <label for="">
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsername}/>
        </label>

        <label for="">
        <input type="password" name="password" placeholder="Password" value={password} onChange={handlePassword}/>
        <p className="error"></p>
        </label>

        <button type="submit" className="button">Sign Up</button>
    </form>
    { errorMessage && <p className="error-message">{errorMessage}</p> }
</div>

<div>
    <img src="./images/junicorn_5__27th_by_juliabeutling_da83pcp-fullview.jpeg" alt="animal-art" className="singUp-img"/>
</div>

</section>
</div>
  )
  }
