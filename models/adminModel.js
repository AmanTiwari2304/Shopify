import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    adminname: {
        type :String,
        required: [true, "Please provide an adminname"],
    },    
    email:{
        type :String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please provide a password"]
    }
    
})

const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema)

export default Admin;