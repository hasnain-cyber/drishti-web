import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import professorModel, { DBProfessorType } from '../models/userModels/professorModel';
import jsonwebtoken from 'jsonwebtoken';
import { LoggedInUser } from "@/frontend/hooks/useAuth";
import { checkTokenValidity } from "../middlewares";

export const generateSignedToken = (id: string) => {
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET as string);
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

    const existingUser = await professorModel.scan().where('email').eq(email).exec();
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
    const token = generateSignedToken(user.id);

    const clientSideData: LoggedInUser = {
        id: user['id'],
        name: user['name'],
        email: user['email'],
        department: user['department'],
        institute: user['institute'],
        about: user['about'],
        contactNumber: user['contactNumber'],
        linkedIn: user['linkedIn'],
        token
    }
    res.status(200).json({
        user: clientSideData
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

    const existingUser = await professorModel.scan().where('email').eq(email).exec();
    if (existingUser.length > 0) {
        res.status(400).json({ message: 'Email already in use.' });
        return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const data: DBProfessorType = {
        id: crypto.randomUUID(),
        name,
        email,
        hashedPassword,
        salt,
        department: "<Placeholder Department>",
        institute: "<Placeholder Institute>",
        about: "<Placeholder About>",
        contactNumber: "<Placeholder Contact Number>",
        linkedIn: {
            name: "<Placeholder LinkedIn Name>",
            url: "<Placeholder LinkedIn URL>"
        }
    }
    const user = new professorModel(data);

    const clientSideData: LoggedInUser = {
        id: user['id'],
        name: user['name'],
        email: user['email'],
        department: user['department'],
        institute: user['institute'],
        about: user['about'],
        contactNumber: user['contactNumber'],
        linkedIn: user['linkedIn'],
        token: generateSignedToken(user.id)
    }

    await user.save();
    res.status(201).json({
        user: clientSideData
    });
}

export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
    checkTokenValidity(req, res, async (decoded: any) => {
        const users = await professorModel.scan().where('email').eq(decoded.email).exec();
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
    deleteUser
};