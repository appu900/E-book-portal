import express from "express";
const app = express();
import { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/global-error-handler";

app.get("/", (req, res) => {
    const error = createHttpError(404, "This route does not exist");
    throw error;
    res.send("Hello World");
});

// ** global error handler //
app.use(globalErrorHandler);

export default app;
