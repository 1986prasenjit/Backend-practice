import { Router } from "express";
import { registerUser, verifyUser } from "../controllers/auth.controllers.js";
import { userRegistrationValidator } from "../validators/index.js";
import { validateData } from "../middlewares/validator.middleware.js";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validateData, registerUser);

router
  .route("/verifyUser/:token")
  .get(verifyUser);

export default router;
