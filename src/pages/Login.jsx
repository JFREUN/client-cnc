import React from 'react'
import { useState, useContext } from "react";import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import impala from "../images/junicorn_5__27th_by_juliabeutling_da83pcp-fullview.jpeg";
 
const API_URL = "http://localhost:5005";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
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
        <input type="text" name="username" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>

        <label for="">
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
         <p className="error"></p>
        </label>
        <button type="submit" className="button">Login</button>
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
