import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "./user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

// ** controller for user registration ** //

const createUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "Please provide all the details");
        return next(error);
    }

    const user = await User.findOne({ email });
    if (user) {
        const error = createHttpError(400, "User already exists");
        return next(error);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
        expiresIn: "7d",
    });

    return response.status(200).json({
        message: "User created successfully",
        accessToken: token,
    });
};

// ** controller for user login ** //

const loginUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            const error = createHttpError(
                400,
                "Please provide all the details"
            );
            return next(error);
        }

        // ** check if user exists ** //

        const user = await User.findOne({ email });
        if (!user) {
            return next(createHttpError(400, "Invalid credentials"));
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(createHttpError(400, "Invalid credentials"));
        }

        // ** generating token ** and send it to beowser for jwt authentication **//
        const token = sign({ sub: user._id }, config.jwtSecret as string, {
            expiresIn: "7d",
        });

        return response.status(200).json({
            message: "User logged in successfully",
            accessToken: token,
        });
    } catch (error) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { createUser, loginUser };
