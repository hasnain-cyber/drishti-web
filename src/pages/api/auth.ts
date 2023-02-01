import type { NextApiRequest, NextApiResponse } from 'next';
import authController from '@/controllers/authController';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            authController.loginUser(req, res);
            break;
        case 'POST':
            authController.registerUser(req, res);
            break;
        case 'PUT':
            authController.updateUser(req, res);
            break;
        case 'DELETE':
            authController.deleteUser(req, res);
            break;
        default:
            res.status(405).json({
                'message': 'Method not allowed',
            });
    }
}