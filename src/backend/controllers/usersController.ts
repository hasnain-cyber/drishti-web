import { NextApiRequest, NextApiResponse } from "next";
import userModel from '../models/userModel';

export async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
    const users = await userModel.scan().exec();
    res.status(200).json(users);
}

export default {
    getAllUsers
};