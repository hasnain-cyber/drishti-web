import { NextApiRequest, NextApiResponse } from "next";
import professorModel from '../models/userModels/professorModel';
import crypto from "crypto";
import { generateSignedToken } from "./authController";
import { LoggedInUser } from "@/frontend/hooks/useAuth";

export async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
    const users = await professorModel.scan().exec();
    res.status(200).json(users);
}

export async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, email, department, institute, contactNumber, linkedIn, about } = req.body;

    if (!id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }

    const existingUser = await professorModel.query().where('id').eq(id).exec();
    if (existingUser.length > 0) {
        const requiredUser = existingUser[0];
        if (name) {
            requiredUser.name = name;
        }
        if (email) {
            requiredUser.email = email;
        }
        if (department) {
            requiredUser.department = department;
        }
        if (institute) {
            requiredUser.institute = institute;
        }
        if (contactNumber) {
            requiredUser.contactNumber = contactNumber;
        }
        if (linkedIn) {
            requiredUser.linkedIn = linkedIn;
        }
        if (about) {
            requiredUser.about = about;
        }

        await requiredUser.save();
        const clientSideUser: LoggedInUser = {
            id: requiredUser.id,
            name: requiredUser.name,
            email: requiredUser.email,
            department: requiredUser.department,
            institute: requiredUser.institute,
            contactNumber: requiredUser.contactNumber,
            linkedIn: requiredUser.linkedIn,
            about: requiredUser.about,
            token: generateSignedToken(requiredUser.id)
        }

        res.status(200).json({
            user: clientSideUser
        });
    } else {
        res.status(404).json({ message: 'User does not exist.' });
        return;
    }
}

export async function updatePassword(req: NextApiRequest, res: NextApiResponse) {
    const { password, newPassword } = req.body;
    const id = req.query.id as string;

    if (!id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }

    const existingUser = await professorModel.query().where('id').eq(id).exec();
    if (existingUser.length === 0) {
        res.status(404).json({ message: 'User does not exist.' });
        return;
    }

    const requiredUser = existingUser[0];
    const hashedPassword = crypto.pbkdf2Sync(password, requiredUser['salt'], 1000, 64, 'sha512').toString('hex');
    if (hashedPassword !== requiredUser['hashedPassword']) {
        res.status(400).json({ message: 'Password is incorrect.' });
        return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const newHashedPassword = crypto.pbkdf2Sync(newPassword, salt, 1000, 64, 'sha512').toString('hex');
    requiredUser.salt = salt;
    requiredUser.hashedPassword = newHashedPassword;
    const token = generateSignedToken(requiredUser.id);

    await requiredUser.save();
    const newUser: LoggedInUser = {
        id: requiredUser['id'],
        name: requiredUser['name'],
        email: requiredUser['email'],
        department: requiredUser['department'],
        institute: requiredUser['institute'],
        contactNumber: requiredUser['contactNumber'],
        linkedIn: requiredUser['linkedIn'],
        about: requiredUser['about'],
        token
    }
    res.status(200).json({
        user: newUser
    });
}

export default {
    getAllUsers,
    updateUser,
    updatePassword
};