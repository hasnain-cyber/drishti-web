import { NextApiRequest, NextApiResponse } from "next";
import userModel from '../models/userModel';

export async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
    const users = await userModel.scan().exec();
    res.status(200).json(users);
}

export async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, email } = req.body;

    if (!id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }

    const existingUser = await userModel.query().where('id').eq(id).exec();
    if (existingUser.length > 0) {
        const requiredUser = existingUser[0];
        if (name) {
            requiredUser.name = name;
        }
        if (email) {
            requiredUser.email = email;
        }
        await requiredUser.save();
        res.status(200).json({
            user: {
                id: requiredUser.id,
                name: requiredUser.name,
                email: requiredUser.email,
                role: requiredUser.role
            }
        });
    } else {
        res.status(404).json({ message: 'User does not exist.' });
        return;
    }
}

export default {
    getAllUsers,
    updateUser
};