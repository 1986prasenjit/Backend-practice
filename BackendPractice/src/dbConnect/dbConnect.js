import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const dbConnect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
        process.exit(1)
    }
}

export default dbConnect;