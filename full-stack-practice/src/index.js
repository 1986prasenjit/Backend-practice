import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./dbConnect/index.js";

dotenv.config({
    path:"./.env"
})

const app = express();

app.use(express.json());

app.use(express.urlencoded({extends:true}))

app.use(
    cors({
        origin:process.env.BASE_URL,
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
        credentials:true
    })
)

const PORT = process.env.PORT || 5002

app.get("/", (req, res)=> {
    res.send("Hello World")
})

app.get("/hitesh", (req, res)=> {
    res.send("Hello Hitesh")
})

app.get("/piyush", (req, res)=> {
    res.send("Hello Piyush")
})

connectDb()
        .then(()=> {
            app.listen(PORT, ()=> {
                console.log(`Server is listening on PORT ${PORT}`);
            })
        })
        .catch((err)=> {
            console.log("Error while connecting to DB", err);
            process.exit(1);
        })
