import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";
import cookieParser from "cookie-parser";

//import userRoutes
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cookieParser())



//This is used to enable Cross-Origin Resource Sharing, which allows a server to accept requests from different origins (domains, protocols, or ports).
app.use(cors({
    origin:process.env.BASE_URL,
    credentials:true,
    methods:['GET','POST','DELETE','OPTIONS'],
    allowedHeaders:["Content-Type", "Authorization"]
}))

//This is used because the server can accept json format data
app.use(express.json());

app.use(express.urlencoded({extended:true}))

const port = process.env.PORT || 4000; 

app.get("/", (req, res) => {
    res.send("Cohort!")
});
app.get("/hitesh", (req, res) => {
    res.send("Hello Hitesh")
});
app.get("/piyush", (req, res) => {
    res.send("Hello Piyush")
});
 //connect to db
 db();

//user Routes
app.use("/api/v1/user", userRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error("Error: ", err.message);
});