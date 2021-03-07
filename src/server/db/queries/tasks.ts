import { Task } from '../../../utils/architecture/models';
import { MySQL_Res } from '../../../utils/architecture/types';
import { Query } from '../index';

const create = (task) => Query<MySQL_Res>('INSERT INTO Tasks SET ?', [{ ...task }]);
const all = () => Query<Task[]>('SELECT * FROM Tasks');

export default {
    create,
    all
}