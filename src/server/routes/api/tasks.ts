import { Router } from 'express';
import { uuid } from 'uuidv4';

const router = Router();

router.get('/', async (req, res) => {
    const id = uuid();
    const len = id.length;
    res.json({ id, len })
});

export default router;