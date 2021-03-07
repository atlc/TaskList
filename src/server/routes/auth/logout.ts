import { doesNotMatch } from 'assert';
import { Router } from 'express';
import * as passport from 'passport';
import { TokenPayload } from '../../../utils/architecture/types';
import { destroy } from '../../../utils/security/tokens';

const router = Router();

router.use((res, req, next) => {
    passport.authenticate('jwt', (payload: TokenPayload) => {
        destroy(payload.jti);
        next();
    })(res, req, next);
})

export default router;