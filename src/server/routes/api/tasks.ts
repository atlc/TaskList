import { Router } from 'express';
import { uuid } from 'uuidv4';
import { tasks as db_tasks } from '../../db';
import { isLoggedIn } from '../../../utils/security/roles';
import { Task } from '../../../utils/architecture/models';

const router = Router();

router.get('/', isLoggedIn, async (req, res) => {
    const tasks = await db_tasks.all();
    res.json(tasks);
});

router.post('/create', isLoggedIn, async (req, res) => {
    try {
        const id = uuid();
        const newTask: Task = { id, ...req.body };
        const { name, description, user_id, status_id, complete_by } = newTask;

        if (name && description && user_id && status_id && complete_by) {
            const result = await db_tasks.create(newTask);
            res.status(201).json(result);
        } else {
            res.status(400).json({ message: "One or more fields are missing." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const { status_id } = req.body;

        const sqlRes = await db_tasks.update_status(id, status_id);

        console.log({sqlRes});

        if (sqlRes.changedRows === 1) {
            res.status(200).json({ message: "Task status updated successfully!" });
        } else {
            res.status(500).json({ message: "Unable to update task status." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});





export default router;