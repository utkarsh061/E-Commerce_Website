
import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/database.js";

dotenv.config()
const app = express();

connectDB();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.listen(process.env.PORT,()=>{
    console.log("Server started on port 3000");
})