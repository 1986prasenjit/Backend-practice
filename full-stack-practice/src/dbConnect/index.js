import mongoose from "mongoose";


const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected successfully!! DB-HOST: ${connectionInstance}`);
    } catch (error) {
        console.log(`Error which connecting to MongoDB, ${error}`);
        process.exit(1)
    }
}

export default connectDb;