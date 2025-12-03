import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type:  String,
        required : true,
        unique : true
    },
    description : {
        type:  String,
        required : true,
    },
    image : {
        type: String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    quantity : {
        type : Number,
        required : true
    },
    adminEmail : {
        type : String,
        required : true
    }    
})

const Product = mongoose.models.products || mongoose.model("products", productSchema)

export default Product;

