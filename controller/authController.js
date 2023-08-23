import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

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

//Login User

export const loginUser = async (req,res)=>{
    try {
        const {email , password} = req.body
        if(!email || !password){
            return req.status(404).send({error:"Invalid Username or password"})
        }
        const user = await userModel.findOne({email:email})
        if(!user){
            return res.status(404).send({message:"email is not registered"})
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                message:"Invalid Password"
            })
        }
        //token 
        const token = await JWT.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"Logged in Successfully",
            user:{
                name:user.name,
                email:user.email,
                phoneNumber:user.phoneNumber,
                address:user.address
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.send({
            message:"error in Login",
            error
        })
    }
}