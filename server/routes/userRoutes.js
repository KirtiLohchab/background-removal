import express from "express";
import { clerkWebHook } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post("/webhooks", clerkWebHook);

export default userRouter;
