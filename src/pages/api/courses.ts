import type { NextApiRequest, NextApiResponse } from 'next';
import coursesController from '@/controllers/coursesController';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      coursesController.getAllCourses(req, res);
      break;
    case 'POST':
      coursesController.createCourse(req, res);
      break;
    case 'PUT':
      coursesController.updateCourse(req, res);
      break;
    case 'DELETE':
      coursesController.deleteCourse(req, res);
      break;
    default:
      res.status(405).json({
        'message': 'Method not allowed',
      });
  }
}
