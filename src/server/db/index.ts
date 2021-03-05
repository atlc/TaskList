import * as mysql from 'mysql';
import { sqlConfig } from '../config';

const pool = mysql.createPool(sqlConfig);

const Query = <T = any>(query: string, values?: any[]) => {    
    const queryString = mysql.format(query, values);

    console.log('\x1b[43m\x1b[30m%s\x1b[0m', 'SQL LOG:');
    console.log('\x1b[33m\x1b[40m%s\x1b[0m', queryString);

    return new Promise<T>((resolve, reject) => {
        pool.query(queryString, (err, data) => {
             if (err) {
                reject(err);
             } else {
                resolve(data);
             }
        });
    });
};

export {
    Query
}

import statuses from './queries/statuses';
import categories from './queries/categories';

export {
    statuses,
    categories
}