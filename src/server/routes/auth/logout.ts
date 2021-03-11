import { Router } from 'express';
import * as passport from 'passport';
import { TokenPayload } from '../../../utils/architecture/types';
import { expire } from '../../../utils/security/tokens';

const router = Router();

router.post('/', (req, res, next) => {
    passport.authenticate('jwt', async (err, user: TokenPayload, info) => {
        if (err) return next(err);

        if (!user) {
            res.status(401).json({ message: "You are already logged out" });
        } else {
            const destroyed = await expire(user);
            
            res.status(200).json({ message: `Logging out was ${destroyed ? '' : 'un'}successful.` });
        }
    })(req, res, next);
});

export default router;