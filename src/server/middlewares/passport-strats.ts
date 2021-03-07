import * as Local from 'passport-local';
import * as passport from 'passport';
import { users as db_users, users } from '../db';
import { validate } from '../../utils/passwords';

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