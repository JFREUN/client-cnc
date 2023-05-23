import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import impala from "../images/junicorn_5__27th_by_juliabeutling_da83pcp-fullview.jpeg";

 
const API_URL = "http://localhost:5005";

export default function SignUp(props) {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const[email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, email, password};
 
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
        <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label for="">
        <input type="text" name="email" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>

        <label for="">
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p className="error"></p>
        </label>

        <button type="submit" className="button">Sign Up</button>
    </form>
    { errorMessage && <p className="error-message">{errorMessage}</p> }
</div>

<div>
    <img src={impala} alt="animal-art" className="signUp-img"/>
</div>

</section>
</div>
  )
  }
