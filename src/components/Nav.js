import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "./Nav.css"

const Nav = () => {

 const auth = localStorage.getItem('user')
 const navigate = useNavigate();
 const logout =()=>{
  localStorage.clear();
  navigate('/signup')

 }

  return (
    <div>
       {auth ? <ul className='ul'>
            <li><Link to='/'>Products</Link></li>
            <li><Link to='/add'>Add Product</Link></li>
            <li><Link to='/update'>Update Product</Link></li>
            {/* <li><Link to='/profile'>Profile</Link></li> */}
            <li><Link onClick={logout} to='/signup'>Logout</Link></li> 
            </ul> : 

            <ul className='ul'>
  
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
  
           
        </ul>
  }
    </div>
  )
}

export default Nav