import { argon2id, hash, verify } from 'argon2';

export const createHash = async (password: string) => {
    return hash(password, {
        type: argon2id,
        memoryCost: 2 ** 14
    });
}

export const validate = async (password: string, hashed: string) => {
    return verify(hashed, password);
}