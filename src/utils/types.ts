import { User } from './models';

export interface TokenPayload {
    id: User["id"],
    username: User["username"]
}

export interface MySQL_Err {
    code?: string;
    errno?: number;
    sqlMessage?: string;
    sqlState?: string;
    index?: number;
    sql?: string;
}

export interface MySQL_Success {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    serverStatus?: number;
    warningCount?: number;
    message?: string;
    protocol41?: boolean;
    changedRows?: number;
}

export type MySQL_Res = MySQL_Success & MySQL_Err

import { Request } from 'express';
export interface RequestUser extends Request {
    user: User
} 