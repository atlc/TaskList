import * as redis from 'redis';
const JWTR = require('jwt-redis').default;
import { jwt } from '../../server/config';
import { TokenPayload } from '../architecture/types';

const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);

export const signJWT = async (payload: TokenPayload) => {
    const { jti } = payload;
    const token = await jwtr.sign(payload, jwt.secret, { expiresIn: jwt.expiration });
    redisClient.set(jti, jti);
    // Set key to expire in 31d so it doesn't lapse before the token does
    redisClient.expire(jti, 2678400);

    // redisClient.get(jti, (err, reply) => {
    //     const item = reply.toString();
    //     console.log({item, jti, compares: item===jti});
    //     return item;
    // });
    return token;
}

export const expire = async (token: TokenPayload) => {
    const { jti } = token;

    // redisClient.get(jti, (err, reply) => {
    //     const item = reply?.toString() || null;
    //     console.log({item, jti, compares: item===jti});
    //     return item;
    // });

    const destroyed = redisClient.del(jti, (err, reply) => {
        const delRes = reply.toString();
        return delRes === '1';
    }); // JWTR has ABHORRENT documentation, going straight to redis for this

    // redisClient.get(jti, (err, reply) => {
    //     const item = reply?.toString() || err;
    //     console.log({item, jti, compares: item===jti});
    //     return item;
    // });

    console.log({destroyed});
    return destroyed;
}