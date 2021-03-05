import { Status } from '../../../utils/models';
import { MySQL_Res } from '../../../utils/types';
import { Query } from '../../db';

const add_name = (id: Status["id"], name: Status["name"]) => Query<MySQL_Res>('INSERT INTO Statuses SET ?', [{ id, name }]);
const all = () => Query<Status[]>('SELECT * FROM Statuses');
const one = (field, value) => Query<Status[]>('SELECT * FROM Statuses WHERE ?? = ?', [field, value]);

export default {
    add_name,
    all,
    one
}