import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";

export const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logoutUser);
