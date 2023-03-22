import type { NextApiRequest, NextApiResponse } from 'next';
import usersController from '@/backend/controllers/usersController';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            usersController.updatePassword(req, res);
            break;
        default:
            res.status(405).json({
                'message': 'Method not allowed',
            });
    }
}
