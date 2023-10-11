import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.logInUser);

export default authRouter;