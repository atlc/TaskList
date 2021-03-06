import { hash, compare, genSalt } from 'bcrypt';

export const createHash = async (password: string) => {
    const salt = await genSalt(12);
    return hash(password, salt);
}

export const compareBetween = async (password: string, hashed: string) => {
    return compare(password, hashed);
}
