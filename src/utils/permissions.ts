import { RequestHandler } from 'express';

export const isLoggedIn: RequestHandler = (req, res, next) => {
    return req.user ? next() : res.status(401).json({ message: "You are not logged in" });
}