const mongoose= require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    price : String,
    category: String,
    company : String,
    userId: String
    
});

module.export = mongoose.model("products",productSchema)