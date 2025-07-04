import {Router} from "express";

import healthCheckRoute from "../controllers/healthCheck.controllers.js";


const router = Router();

router.route("/").get(healthCheckRoute);

export default router;