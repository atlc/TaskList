import * as dotenv from 'dotenv';

dotenv.config();

export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    connections: Number(process.env.POOL_CONNECTIONS)
}