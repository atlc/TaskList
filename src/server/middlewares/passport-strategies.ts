import * as passport from 'passport';
import * as Local from 'passport-local';
import * as JWT from 'passport-jwt';
import { users } from '../db';
import { validate } from '../../utils/security/passwords';
import { jwt } from '../config';
import { TokenPayload } from '../../utils/architecture/types';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new Local.Strategy(async (username, password, done) => {
    try {
        /* Validate if a user is logging in with either email or username */
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const isEmail = emailRegex.test(username.toLocaleLowerCase());

        const [user] = await users.find(`${isEmail ? 'email' : 'username'}`, username);

        if (user && validate(password, user.hashed)) {
            delete user.hashed;
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
}));

passport.use(new JWT.Strategy({
        jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt.secret
    }, (payload: TokenPayload, done) => {
        done(null, { ...payload })
    })
);