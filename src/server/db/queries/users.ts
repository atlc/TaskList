import { User } from '../../../utils/architecture/models';
import { MySQL_Res } from '../../../utils/architecture/types';
import { Query } from '../index';

const register = (user: User) => Query<MySQL_Res>('INSERT INTO Users SET ?', [{ ...user }]);
const find = (field, value) => Query<User[]>('SELECT * FROM Users WHERE ?? = ?', [field, value]);

export default {
    register,
    find
}