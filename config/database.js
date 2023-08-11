import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Conected to Database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting ${error}`);
    }
};

export default connectDB;