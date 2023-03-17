import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export const checkTokenValidity = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Unauthorized request!'
        });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized request!'
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
        return res.status(401).json({
            message: 'Unauthorized request!'
        });
    }

    next(decoded);
}

export const checkOwner = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    checkTokenValidity(req, res, (decoded: any) => {
        if (decoded['id'] === req.body.ownerId) {
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorized request!'
            });
        }
    });
}