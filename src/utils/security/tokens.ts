import { sign } from 'jsonwebtoken';
import { jwt } from '../../server/config';
import { TokenPayload } from '../types';

export const signJWT = (payload: TokenPayload) => {
    return sign(payload, jwt.secret, { expiresIn: jwt.expiration });
}