import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import userModel, { EUserRole } from "@/models/userModel";

export async function loginUser(req: NextApiRequest, res: NextApiResponse) {
    const email = req.headers.authorization?.split(' ')[1].split(':')[0];
    const password = req.headers.authorization?.split(' ')[1].split(':')[1];

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

    res.status(200).json({user});
}

export async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    const { name } = req.body;
    const email = req.headers.authorization?.split(' ')[1].split(':')[0];
    const password = req.headers.authorization?.split(' ')[1].split(':')[1];

    console.log(name, email, password);

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

    const newUser = await user.save();
    res.status(201).json({user: newUser});
}

export async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    const email = req.headers.authorization?.split(' ')[1].split(':')[0];
    const password = req.headers.authorization?.split(' ')[1].split(':')[1];
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }

    const users = await userModel.scan().where('email').eq(email).exec();
    if (users.length === 0) {
        res.status(404).json({ message: 'User not found.' });
        return;
    }

    const user = users[0];
    const hashedPassword = crypto.pbkdf2Sync(password, user['salt'], 1000, 64, 'sha512').toString('hex');
    if (hashedPassword !== user['hashedPassword']) {
        res.status(400).json({ message: 'Password is incorrect.' });
        return;
    }

    // get the fields to update selectively from request body, so that someone could not maliciously modify other sensetive fields.
    const { name: newName, email: newEmail, password: newPassword } = req.body;
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
}

export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
    const email = req.headers.authorization?.split(' ')[1].split(':')[0];
    const password = req.headers.authorization?.split(' ')[1].split(':')[1];

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    const users = await userModel.scan().where('email').eq(email).exec();
    if (users.length === 0) {
        res.status(404).json({ message: 'User not found.' });
        return;
    }

    const user = users[0];
    const hashedPassword = crypto.pbkdf2Sync(password, user['salt'], 1000, 64, 'sha512').toString('hex');
    if (hashedPassword !== user['hashedPassword']) {
        res.status(400).json({ message: 'Password is incorrect.' });
        return;
    }

    await user.delete();
    res.status(200);
}

export default {
    loginUser,
    registerUser,
    updateUser,
    deleteUser
};