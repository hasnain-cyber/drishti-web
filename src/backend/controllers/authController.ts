import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import userModel, { EUserRole } from '../models/userModel';
import jsonwebtoken from 'jsonwebtoken';
import { LoggedInUser } from "@/frontend/hooks/useAuth";
import { checkTokenValidity } from "../middlewares";

const getSignedToken = (id: string, name: string, email: string, role: string) => {
    return jsonwebtoken.sign({ id, name, email, role }, process.env.JWT_SECRET as string);
}

export async function loginUser(req: NextApiRequest, res: NextApiResponse) {
    if (!req.headers.authorization) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }

    const email = req.headers.authorization.split(' ')[1].split(':')[0];
    const password = req.headers.authorization.split(' ')[1].split(':')[1];

    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }
    if (!password) {
        res.status(400).json({ message: 'Password is required' });
        return;
    }

    const existingUser = await userModel.scan().where('email').eq(email).exec();
    if (existingUser.length === 0) {
        res.status(404).json({ message: 'Email does not exist.' });
        return;
    }

    const user = existingUser[0];
    const hashedPassword = crypto.pbkdf2Sync(password, user['salt'], 1000, 64, 'sha512').toString('hex');
    if (hashedPassword !== user['hashedPassword']) {
        res.status(400).json({ message: 'Password is incorrect.' });
        return;
    }
    const token = getSignedToken(user.id, user.name, user.email, user.role);

    res.status(200).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        }
    });
}

export async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    const { name } = req.body;
    const email = req.headers.authorization?.split(' ')[1].split(':')[0];
    const password = req.headers.authorization?.split(' ')[1].split(':')[1];

    if (!name) {
        res.status(400).json({ message: 'Name is required' });
        return;
    }

    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }

    if (!password) {
        res.status(400).json({ message: 'Password is required' });
        return;
    }

    const existingUser = await userModel.scan().where('email').eq(email).exec();
    if (existingUser.length > 0) {
        res.status(400).json({ message: 'Email already in use.' });
        return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const user = new userModel({
        id: crypto.randomUUID(),
        name,
        email,
        hashedPassword,
        salt,
        verified: false,
        role: EUserRole.Professor
    });

    const clientSideUser: LoggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: getSignedToken(user.id, user.name, user.email, user.role)
    }

    await user.save();
    res.status(201).json({
        user: clientSideUser
    });
}

export async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    checkTokenValidity(req, res, async (decoded: any) => {
        const users = await userModel.scan().where('email').eq(decoded.email).exec();
        if (users.length === 0) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        // get the fields to update selectively from request body, so that someone could not maliciously modify other sensetive fields.
        const { name: newName, email: newEmail, password: newPassword } = req.body;
        const user = users[0];
        if (newName) {
            user['name'] = newName;
        }
        if (newEmail) {
            user['email'] = newEmail;
        }
        if (newPassword) {
            const salt = crypto.randomBytes(16).toString('hex');
            const hashedPassword = crypto.pbkdf2Sync(newPassword, salt, 1000, 64, 'sha512').toString('hex');
            user['hashedPassword'] = hashedPassword;
            user['salt'] = salt;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    });
}

export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
    checkTokenValidity(req, res, async (decoded: any) => {
        const users = await userModel.scan().where('email').eq(decoded.email).exec();
        if (users.length === 0) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        const user = users[0];
        await user.delete();
        res.status(200).json({
            "message": "User deleted successfully."
        });
    });
}

export default {
    loginUser,
    registerUser,
    updateUser,
    deleteUser
};