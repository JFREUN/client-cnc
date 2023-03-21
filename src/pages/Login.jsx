import React from 'react'
import { useState, useContext } from "react";import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
 
const API_URL = "http://localhost:5005";

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken); 
        authenticateUser();       
        navigate('/');                           
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
        <h2>Login here</h2>
        <form action="/login" method="POST" onSubmit={handleLoginSubmit}>

        <label for="">
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsername}/>
        </label>

        <label for="">
        <input type="password" name="password" placeholder="Password" value={password} onChange={handlePassword}/>
         <p className="error"></p>
        </label>
        <button type="submit" className="button">Login</button>
        </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div> 
    <div>
    <img src="./images/junicorn_5__27th_by_juliabeutling_da83pcp-fullview.jpeg" alt="animal-art" className="signUp-img" id="login-img"/>
    </div>
</section>
    </div>
  )
}
