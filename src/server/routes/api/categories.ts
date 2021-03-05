import { Router } from 'express';
import { uuid } from 'uuidv4';
import { categories as db_categories } from '../../db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const queryParams = req.query;
        if (!!Object.keys(queryParams).length) {
            const { id, name } = queryParams;
            if (id) {
                const [category] = await db_categories.one('id', id);
                res.json(category);
            } else if (name) {
                const [category] = await db_categories.one('name', name);
                res.json(category);
            } else {
                throw new Error('A query parameter of either "id" or "name" must be provided');
            }
        } else {
            const categories = await db_categories.all();
            res.json(categories);
        }
    } catch (error) {
        res.json(error);
    }
});

router.post('/', async (req, res) => {
    const id = uuid();
    const name = req.body.name;

    try {
        const response = await db_categories.create(id, name);
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
