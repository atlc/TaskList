import { Router } from 'express';
import * as passport from 'passport';
import { RequestUser } from '../../../utils/architecture/types';
import { signJWT } from '../../../utils/security/tokens';
import { uuid } from 'uuidv4';

const router = Router();

router.post('/', passport.authenticate('local'), async (req: RequestUser, res) => {
    try {
        const { id, username } = req.user;
        const jti = uuid(); // Unique ID for this token for jwt-redis to be able to destroy
        const jwt = signJWT({ jti, id, username });
        res.status(200).json({ token: jwt });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There was an error with authentication", error });
    }
});

export default router;