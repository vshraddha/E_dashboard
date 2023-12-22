import React, { useState } from 'react'
import "./Signup.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate(); 

 
  useEffect(()=>{
const auth = localStorage.getItem('user');
if(auth){
  navigate('/')
}

  },[])

  const collectData = async (e) => {
    e.preventDefault();
  
  
    try {
      // Create an object with the user's data
      const userData = {
        name,
        email,
        password,
      };
  
      const response = await fetch("http://localhost:5000/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData), 
      });
  
      if (!response.ok) {
        throw Error(response.statusText);
      }
  
      const data = await response.json();
      console.warn(data);
      localStorage.setItem("user" , JSON.stringify(data))
      navigate('/');
    } catch (error) {
      console.log(error);
    }

}
      
return (
    <div class="form">
      <h1>Register</h1>

      <form>
        <p>First Name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter first name.." />

        <p>Email id</p>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your mail" />

        <p>Password</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your password" />

        <button onClick={collectData} type="button">Signup</button>
      </form>

    </div>
  )
  }

export default Signup