import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerUser = async (req,res)=>{
    try {
        const {name, email, password, phoneNumber, address} = req.body;
        //validation 
        if(!name){
            return res.send({error:"Name is required" })
        }
        if(!email){
            return res.send({error:"email is required" })
        }
        if(!password){
            return res.send({error:"Password is required" })
        }
        if(!phoneNumber){
            return res.send({error:"Phone Number is required" })
        }
        if(!address){
            return res.send({error:"Address is required" })
        }
        // checking for existing user 
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            return res.status(200).send({
                success:true,
                message: "Already Registered please Login"
            })
        }
        //Registering User
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({
            name,email,password:hashedPassword,phoneNumber,address
        }).save()

        res.status(201).send({
            success:true,
            message:"User Registered Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error in Registering",
            error
        })
    }
}