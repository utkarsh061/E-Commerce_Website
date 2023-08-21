import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required:true
    },
    email :{
        type : String,
        required:true,
        unique:true
    },
    password :{
        type : String,
        required:true
    },
    phoneNumber :{
        type : String,
        required:true
    },
    address :{
        type : String,
        required:true
    }

},{timestamps:true})  //created time of new user will get stored

export default mongoose.model("users",userSchema);