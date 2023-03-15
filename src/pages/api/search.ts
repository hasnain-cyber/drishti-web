import searchController from '@/controllers/searchController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            searchController.getMatches(req, res);
            break;
        default:
            res.status(405).json({
                'message': 'Method not allowed',
            });
    }
}