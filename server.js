
import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/database.js";
import { registerUser } from "./controller/authController.js";

dotenv.config()
const app = express();

connectDB();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.post("/register",registerUser)
 

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})