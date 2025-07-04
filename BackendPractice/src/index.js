import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./dbConnect/dbConnect.js";



dotenv.config({
    path:"./.env"
})
const PORT = process.env.PORT || 8080



connectDB()
.then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Server is listing on port ${PORT}`);
    })
})
.catch((error)=> {
    console.log("Failed to connect to mongodb",error);
})