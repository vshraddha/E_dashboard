import React, { useEffect, useState } from 'react'
import "./Productlist.css"
import { Link } from 'react-router-dom'

const Productlist = () => {
    const [pro , setPro] = useState([])

    const getproducts=async ()=>{
        let result = await fetch("http://localhost:5000/products")
        result = await result.json();
        setPro(result);

    }
    console.warn(pro)

    useEffect(()=>{
        getproducts();


    },[])

    const deleteproduct = async(id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}` , {
            method : "Delete"
        });
        result = await result.json()
        if(result){
           getproducts();
        }

    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result= await fetch(`http://localhost:5000/search/${key}`);
        result= await result.json();
        if(result){
            setPro(result)
        }

        }
        else{
            getproducts();
        }
        
        
    }


  return (
    <div className='prolist'>

        <h1>Product List</h1>
        <input className='search' type="text" placeholder='search product' onChange={searchHandle} />
        <ul>
            <li>S.No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
        </ul>
        
        {
        pro.length>0 ? pro.map((item, index)=>
            <ul key ={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button onClick={()=>deleteproduct(item._id)}>Delete</button>
            <Link to={"/update/"+ item._id} >Update</Link></li>
        </ul>

        ) : <h1>No product found</h1>
        }
    </div>
  )
}

export default Productlist