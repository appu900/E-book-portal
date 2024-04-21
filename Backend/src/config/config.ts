import {config as dconf } from 'dotenv';
dconf();

const _config = {
    port : process.env.PORT || 3000
}

export const config = Object.freeze(_config);