import { Router } from 'express';
import { uuid } from 'uuidv4';
import { createHash } from '../../../utils/passwords';
import { users } from '../../db';
import { validate } from '@atlc/hibp';

const router = Router();

router.post('/', async (req, res) => {
    const id = uuid();
    const { username, email, password } = req.body;

    if (username && email && password) {
        const [usernameIsRegistered] = await users.find('username', username);
        const [emailIsRegistered] = await users.find('email', email);

        if (usernameIsRegistered) {
            res.status(401).json({ message: "That username is already registered." });
        } else if (emailIsRegistered) {
            res.status(401).json({ message: "That email is already registered." });
        } else {
            const newPassword = await validate(password);
            if (newPassword.isPwned) {
                res.status(400).json({ message: `Your password was found in ${newPassword.breaches.toLocaleString()} breaches per HaveIBeenPwned.com. Please consider utilizing secure, unique passwords and a password manager application like Bitwarden or Lastpass.` });
            } else {
                const hashed = await createHash(password);
                try {
                    const newUser = await users.register({ id, username, email, hashed });
                    if (newUser.affectedRows === 1) {
                        res.status(201).json({ message: "User created successfully." })
                    } else {
                        res.status(500).json({ message: "Database unable to accept registration information" });
                    }
                } catch (error) {
                    res.status(500).json({ message: "Something went wrong registering. Please try again.", error })
                }
            }
        }
    } else {
        res.status(400).json({ message: "One or more fields are missing" });
    }
});

export default router;