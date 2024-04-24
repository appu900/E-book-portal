import express from "express";
const userRouter = express.Router();
import { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "./user-controller";

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

export default userRouter;
