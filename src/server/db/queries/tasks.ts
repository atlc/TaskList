import { Task } from '../../../utils/architecture/models';
import { MySQL_Res } from '../../../utils/architecture/types';
import { Query } from '../index';

const create = (task) => Query<MySQL_Res>('INSERT INTO Tasks SET ?', [{ ...task }]);
const all = () => Query<Task[]>('SELECT * FROM Tasks');
const update_status = (id, status_id) => Query<MySQL_Res>('UPDATE Tasks SET status_id = ? WHERE id = ?', [status_id, id]);

export default {
    create,
    all,
    update_status
}