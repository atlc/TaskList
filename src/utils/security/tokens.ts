import * as redis from 'redis';
import * as jwt from 'jsonwebtoken';
import { jwt as jwt_conf, redis as redis_conf } from '../../server/config';
import { TokenPayload } from '../architecture/types';

const redisClient = redis.createClient(process.env.REDIS_URL);

export const signJWT = async (payload: TokenPayload) => {
    const { jti } = payload;
    const token = jwt.sign(payload, jwt_conf.secret, { expiresIn: jwt_conf.expiration });
    redisClient.set(jti, jti);
    
    // Set key to expire in 31d so it doesn't lapse before the token does
    redisClient.expire(jti, redis_conf.expiration);

    return token;
}

export const expire = async (token: TokenPayload) => {
    const { jti } = token;

    const destroyed = redisClient.del(jti, (err, reply) => {
        const delRes = reply.toString();
        return delRes === '1';
    });

    return destroyed;
}