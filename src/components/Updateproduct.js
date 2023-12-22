import React, { useEffect } from 'react'
import { useState } from 'react';
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Updateproduct = () => {
    const [name , setName] = useState('');
    const [price , setPrice] = useState('');
    const [category , setCategory] = useState('');
    const [company , setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetail();

    },[])
   
    const getProductDetail = async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        // console.warn(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
        

    }

    const updateproduct = async ()=>{

        console.warn(name,price,category,company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method:'put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type' :"application/json"

            }
            
            
        })

        result= await result.json();
        console.warn(result)
        navigate("/")

        
    };

    


    return (
    <div className="product">
        <h2>Update Product</h2>


    <input type="text" placeholder="Enter Prod name" value={name} onChange={(e)=>{setName(
        e.target.value)}}/>
        

    <input type="text" placeholder="Enter Prod price" value={price} onChange={(e)=>{setPrice(
        e.target.value)}} />




    <input type="text" placeholder="Enter Prod category" value={category} onChange={(e)=>{setCategory(
        e.target.value)}}/>
        


    <input type="text" placeholder="Enter Prod company" value={company} onChange={(e)=>{setCompany(
        e.target.value)}}/>
         

    <button onClick={updateproduct}>Update Product</button>

</div>
  
)}

export default Updateproduct