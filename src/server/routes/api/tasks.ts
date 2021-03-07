import { Router } from 'express';
import { uuid } from 'uuidv4';
import { tasks as db_tasks } from '../../db';
import { isLoggedIn } from '../../../utils/security/roles';

const router = Router();



router.get('/', isLoggedIn, async (req, res) => {
    const tasks = await db_tasks.all();
    res.json(tasks);
});

router.post('/', /* auth, */ async (req, res) => {
    try {
        const id = uuid();
        console.log(id);

        // const {} = req.body; // do some req.body validation
        
        const newTask = {id, ...req.body};
        console.log(newTask);
        const result = await db_tasks.create(newTask);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

export default router;