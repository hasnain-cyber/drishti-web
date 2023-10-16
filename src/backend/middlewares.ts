import jsonwebtoken from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import professorModel from './models/userModels/professorModel';
import httpStatusCodes from 'http-status-codes';

export const checkTokenValidity = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    if (!req.headers.authorization || !req.headers.authorization.split(' ')[1]) {
        return res.status(httpStatusCodes.UNAUTHORIZED).end();
    }

    const token = req.headers.authorization.split(' ')[1];
    let decoded: any;
    try {
        decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
        console.log(err);
        return res.status(httpStatusCodes.UNAUTHORIZED).end();
    }

    const userId = decoded['id'];
    const users = await professorModel.query('id').eq(userId).exec();
    if (users.length === 0) {
        return res.status(httpStatusCodes.NOT_FOUND).end();
    }

    next(users[0]);
}