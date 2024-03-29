import coursesController from "@/backend/controllers/coursesController";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            coursesController.getCourseById(req, res);
            break;
        default:
            res.status(405).json({
                'message': 'Method not allowed',
            });
    }
}
