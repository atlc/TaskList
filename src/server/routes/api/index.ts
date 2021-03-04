import { Router } from 'express';
import listsRouter from './lists';
import tasksRouter from './tasks';


const router = Router();

router.use('/lists', listsRouter);
router.use('/tasks', tasksRouter);


router.get('*', (req, res) => res.json(`404, you fucking idiot. Don't go to ${req.originalUrl} again.`));

export default router;