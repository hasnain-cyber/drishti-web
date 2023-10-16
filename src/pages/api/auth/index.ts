import type { NextApiRequest, NextApiResponse } from 'next';
import authController from '@/backend/controllers/authController';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'DELETE':
            authController.deleteUser(req, res);
            break;
        default:
            res.status(405).json({
                'message': 'Method not allowed',
            });
    }
}