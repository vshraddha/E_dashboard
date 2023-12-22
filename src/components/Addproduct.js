import React, { useState } from "react"
import "./Addproduct.css"
// import { json } from "express";

const Addproduct = ()=>{
    const [name , setName] = useState('');
    const [price , setPrice] = useState('');
    const [category , setCategory] = useState('');
    const [company , setCompany] = useState('');
    const [error , setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const addproduct = async ()=>{

        console.warn(name,price,category,company)
        if(!name || !price || !category || !company ){
            setError(true)
            return false;
        }




        const userid = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({name, price, category,company,userid}),
            headers:{
                "content-Type":"application/json"
            }
    });

    result  = await result.json();
    // console.warn(result)
    if (result.status === "success") {
        // Product added successfully
        setSuccessMessage("Product added successfully");
        console.log("Success message set");
    } else {
        setSuccessMessage(""); // Clear the success message
    }
}

    return (
    <div className="product">
        <h1>Add Product</h1>


    <input type="text" placeholder="Enter Prod name" value={name} onChange={(e)=>{setName(
        e.target.value)}}/>
        {error && !name && <span className="invalid">Enter valid name</span> }

    <input type="text" placeholder="Enter Prod price" value={price} onChange={(e)=>{setPrice(
        e.target.value)}} />

{error && !price && <span className="invalid">Enter price</span> }


    <input type="text" placeholder="Enter Prod category" value={category} onChange={(e)=>{setCategory(
        e.target.value)}}/>
          {error && !category && <span className="invalid">Enter category</span> }


    <input type="text" placeholder="Enter Prod company" value={company} onChange={(e)=>{setCompany(
        e.target.value)}}/>
          {error && !company && <span className="invalid">Enter company</span> }

          {successMessage && <div className="success">{successMessage}</div>}

    <button onClick={addproduct}>Add Product</button>

</div>
    )
   
}

export default Addproduct