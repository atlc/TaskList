import { Category } from '../../../utils/architecture/models';
import { MySQL_Res } from '../../../utils/architecture/types';
import { Query } from '../../db';

const create = (id: Category["id"], name: Category["name"]) => Query<MySQL_Res>('INSERT INTO Categories SET ?', [{ id, name }]);
const all = () => Query<Category[]>('SELECT * FROM Categories');
const one = (field, value) => Query<Category[]>('SELECT * FROM Categories WHERE ?? = ?', [field, value]);

export default {
    create,
    all,
    one
}