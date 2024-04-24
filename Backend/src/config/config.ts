import { config as dconf } from "dotenv";
dconf();

const _config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
