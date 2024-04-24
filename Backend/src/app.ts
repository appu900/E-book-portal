import express from "express";
const app = express();
import { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/global-error-handler";
import userRouter from "./user/user-routes";

// ** middleware to parse incoming request body ** //
app.use(express.json());

// ** importing different routes //
app.use("/api/users", userRouter);

// ** global error handler //
app.use(globalErrorHandler);

export default app;
