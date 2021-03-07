import * as dotenv from 'dotenv';

dotenv.config();

export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    connections: Number(process.env.POOL_CONNECTIONS)
}

export const jwt = {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRY
}

export const redis = {
    port: process.env.REDIS_PORT
}