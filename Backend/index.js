const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cors());
// const Product = require("./db/Product")

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';



mongoose
  .connect("mongodb://localhost:27017/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error("Connection failed:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("users", userSchema); // Corrected model name to 'User'

const productSchema = new mongoose.Schema({
  name: String,
  price : String,
  category: String,
  company : String,
  userId: String
  
});

const Product = mongoose.model("products", productSchema);


app.post("/register", async (req, res) => {
  try {
    
    const { name, email, password } = req.body; // Destructure the values from the request body

    // Create a new user instance with the specified fields
    const newUser = new User({
      name,
      email,
      password,
    });


    const result = await newUser.save();
    res.json(result);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, resp) => {
  try {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      
       resp.json(user); // Return user as JSON
    } else {
      resp.status(404).json({ error: "User not found" }); // Return a JSON error response
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: "Failed to log in" }); // Return a JSON error response for other errors
  }
});

app.post("/add-product" , async (req , resp)=>{
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result)
})

app.get("/products" , async(req, resp)=>{
  let products = await Product.find();
  if(products.length>0){
    resp.send(products)
  }
  else{
    resp.send("No products")
  }

})

app.delete("/product/:id" , async(req,resp)=>{
  
  const result =  await Product.deleteOne({_id:req.params.id})
  resp.send(result)
})

app.get("/product/:id" , async(req,resp)=>{
  const result = await Product.findOne({_id:req.params.id})
  if(result){
    resp.send(result)
  }
  else{
    resp.send({result: "No api found"})
  }
})

app.put("/product/:id" , async(req,resp)=>{
  const result = await Product.updateOne(
    {_id: req.params.id},
     { $set : req.body}
     ) 
  resp.send(result)

})

app.get("/search/:key" , async(req,resp)=>{
  let result = await Product.find({
    "$or": [
      {name : {$regex : req.params.key}},
      {company : {$regex : req.params.key}},
      {category : {$regex : req.params.key}},
      {price: {$regex : req.params.key}}
    ]
  })
  resp.send(result)
})




app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

