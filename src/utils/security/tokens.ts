import * as redis from 'redis';
const JWTR = require('jwt-redis').default;

import { jwt } from '../../server/config';
import { TokenPayload } from '../architecture/types';

const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);

export const signJWT = async (payload: TokenPayload) => {
    return await jwtr.sign(payload, jwt.secret, { expiresIn: jwt.expiration });
}

export const destroy = async (token_id: TokenPayload["jti"]) => {
    return await jwtr.destroy(token_id);
}