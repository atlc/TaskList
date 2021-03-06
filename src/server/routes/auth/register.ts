import { Router } from 'express';
import { uuid } from 'uuidv4';
import { createHash } from '../../../utils/passwords';
import { users } from '../../db';

const router = Router();

router.post('/', async (req, res) => {
    const id = uuid();
    const { username, email, password } = req.body;

    if (username && email && password) {
        const [usernameIsRegistered] = await users.find('username', username);
        const [emailIsRegistered] = await users.find('email', email);

        if (usernameIsRegistered) {
            res.status(403).json({ message: "That username is already registered." });
        } else if (emailIsRegistered) {
            res.status(403).json({ message: "That email is already registered." });
        } else {
            const hashed = await createHash(password);
            try {
                const newUser = await users.register({ id, username, email, hashed });
                if (newUser.affectedRows === 1) {
                    res.status(201).json({ message: "User created successfully." })
                } else {
                    throw new Error("Database unable to accept registration information");
                }
            } catch (error) {
                res.status(403).json({ message: "Something went wrong registering. Please try again.", error })
            }
        }
    } else {
        res.status(403).json({ message: "One or more fields are missing" });
    }
});

export default router;