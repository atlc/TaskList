import { Router } from 'express';
import { uuid } from 'uuidv4';
import { statuses as db_statuses } from '../../db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const queryParams = req.query;
        if (!!Object.keys(queryParams).length) {
            const { id, name } = queryParams;
            if (id) {
                const [status] = await db_statuses.one('id', id);
                res.json(status);
            } else if (name) {
                const [status] = await db_statuses.one('name', name);
                res.json(status);
            } else {
                throw new Error('A query parameter of either "id" or "name" must be provided');
            }
        } else {
            const statuses = await db_statuses.all();
            res.json(statuses);
        }
    } catch (error) {
        res.json(error);
    }
});

router.post('/', /* ADMIN-ONLY, */ async (req, res) => {
    const id = uuid();
    const name = req.body.name;

    try {
        const response = await db_statuses.add_name(id, name);
        console.log(response)
        if (response.affectedRows) {
            res.status(201).json(response);
        } else {
            throw new Error(response.sqlMessage);
        }
    } catch (error) {
        res.status(500).json({ error: error.sqlMessage });
    }
});


export default router;
