import { Router } from 'express';
import categoriesRouter from './categories';
import statusesRouter from './statuses';
import tasksRouter from './tasks';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/statuses', statusesRouter);
router.use('/tasks', tasksRouter);

router.get('*', (req, res) => res.json(`404, you fucking idiot. Don't go to ${req.originalUrl} again.`));

export default router;