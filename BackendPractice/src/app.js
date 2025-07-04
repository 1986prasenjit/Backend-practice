import express from "express";
import cors from "cors";

//import healthCheck routes 
import healthCheckRoute from "./routes/healthCheck.routes.js";

//import userRegister routes
import userRegistrationRoute from "./routes/userRegister.routes.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:process.env.BASE_URL,
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:["Content-Type", "Authorization"],
    Credentials: true,
}))

//HealthCheck route
app.use("/api/v1/healthcheck", healthCheckRoute );


//userRegister routes
app.use("/api/v1/user", userRegistrationRoute)


export default app;