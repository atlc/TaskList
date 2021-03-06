import { RequestHandler } from 'express';
import * as passport from 'passport';
import * as redis from 'redis';

const redisClient = redis.createClient(process.env.REDIS_URL);

export const isLoggedIn: RequestHandler = (req, res, next) => {
    passport.authenticate('jwt', async (err, user, info) => {
        if (err) return next(err);

        if (user.jti) {
            redisClient.get(user.jti, (err, reply) => {
                const item = reply?.toString();
                const isAllowList = item;

                if (!isAllowList) {
                    // Happens when someone has possibly stolen a token or is attemping to use one after localStorage has been cleared
                    res.status(401).json({ message: "WTF r u doing no hack plz" });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).json({ message: "You are not logged in" });
        }
    })(req, res, next);
}

export const isAdmin: RequestHandler = (req, res, next) => {
    // Add users' roles to users table and add it to token
    
    // passport.authenticate('jwt', async (err, user, info) => {
    //     if (err) return next(err);

    //     if (user.jti) {
    //         redisClient.get(user.jti, (err, reply) => {
    //             const item = reply?.toString();
    //             const isAllowList = item;

    //             if (!isAllowList) {
    //                 // Happens when someone has possibly stolen a token or is attemping to use one after localStorage has been cleared
    //                 res.status(401).json({ message: "WTF r u doing no hack plz" });
    //             } else {
    //                 next();
    //             }
    //         });
    //     } else {
    //         res.status(401).json({ message: "You are not logged in" });
    //     }
    // })(req, res, next);
}