import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export const checkOwner = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Unauthorized request!'
        });
    }

    console.log(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);


    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(decoded);
    if (decoded && (decoded as any)['id'] === req.body.ownerId) {
        next();
    } else {
        return res.status(401).json({
            message: 'Unauthorized request!'
        });
    }
}