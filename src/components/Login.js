
import React, { useState } from 'react'
import "./Login.css"
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
    const [email,setEmail] = useState('');
    const [ pass, setPass]= useState('');

    const navigate = useNavigate();

    useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth){
        navigate('/')
      }
      
        },[])

        

    const handlelogin= async (e)=>{
      e.preventDefault();
       console.warn(email,pass)
       const result= await fetch('http://localhost:5000/login' , {
        method:'POST',
        body:JSON.stringify({email,pass}),
        headers:{
          'Content-Type':'application/json'
        }
       })

       const data= await result.json();
       console.warn(data)
       if(result.name){
        localStorage.setItem("user",JSON.stringify(data));
        navigate("/")

       }
       else{
        alert("please enter correct details")
       }

    }


  return (
    <div className='login'>
    <h1>Login</h1>
        <input type="text" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input type="text" placeholder='Enter password' onChange={(e)=>setPass(e.target.value)} value={pass}/>
        <button onClick={handlelogin} type='button'> Login</button>

        
    </div>
  )
}

export default Login