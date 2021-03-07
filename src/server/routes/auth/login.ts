import { Router } from 'express';
import * as passport from 'passport';

const router = Router();

router.post('/', passport.authenticate('local'), async (req, res) => {
    // create & return token 
});

export default router;