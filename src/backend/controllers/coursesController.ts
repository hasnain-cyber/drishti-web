import courseModel from "@/backend/models/courseModel";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { checkTokenValidity } from "../middlewares";
import httpStatusCodes from "http-status-codes";

export const generateClientSideCourse = (id: string, name: string, description: string, topics: any[], ownerId: string) => {
    return {
        id,
        name,
        description,
        topics,
        ownerId
    };
}

export async function getAllCourses(req: NextApiRequest, res: NextApiResponse) {
    const courses = await courseModel.scan().exec();
    res.status(httpStatusCodes.OK).json({
        courses: courses
    });
}

export async function addCourse(req: NextApiRequest, res: NextApiResponse) {
    checkTokenValidity(req, res, async (user: any) => {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(httpStatusCodes.BAD_REQUEST).end();
        }

        const ownerId = user['id'];
        console.log("🚀 ~ file: coursesController.ts:32 ~ checkTokenValidity ~ ownerId:", ownerId)
        try {
            const course = await courseModel.create({
                id: crypto.randomUUID(),
                name,
                description,
                topics: [],
                ownerId
            });
            const clientSideCourse = generateClientSideCourse(course.id, course.title, course.description, course.topics, course.ownerId);
            return res.status(httpStatusCodes.CREATED).json({
                course: clientSideCourse
            });
        } catch (err) {
            console.log("🚀 ~ file: coursesController.ts:44 ~ checkTokenValidity ~ err:", err)
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    })
}

export async function getCourseById(req: NextApiRequest, res: NextApiResponse) {
    const courseId = req.query.id;
    if (!courseId) {
        res.status(400).json({ message: 'Course id is required.' });
        return;
    }

    const course = await courseModel.query('id').eq(courseId).exec();
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course not found.' });
    }
}

export async function updateCourse(req: NextApiRequest, res: NextApiResponse) {
    return res.status(httpStatusCodes.OK).end();
    // checkOwner(req, res, async () => {
    //     const courseId = req.body.id;
    //     if (!courseId) {
    //         res.status(400).json({ message: 'Course id is required.' });
    //         return;
    //     }

    //     const courses = await courseModel.scan().where('id').eq(courseId).exec();
    //     if (courses.length > 0) {
    //         const course = courses[0];
    //         // update only the required fields
    //         if (req.body.name) {
    //             course['name'] = req.body.name;
    //         }
    //         if (req.body.description) {
    //             course['description'] = req.body.description;
    //         }
    //         if (req.body.topics) {
    //             course['topics'] = req.body.topics;
    //         }
    //         await courseModel.update(course);
    //         res.status(200).json(course);
    //     } else {
    //         res.status(404).json({ message: 'Course not found.' });
    //     }
    // })
}

export async function deleteCourse(req: NextApiRequest, res: NextApiResponse) {
    checkTokenValidity(req, res, async (user: any) => {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(httpStatusCodes.BAD_REQUEST).end();
        }

        const ownerId = user['id'];
        try {
            const courses = await courseModel.query('id').eq(courseId).exec();
            if (courses.length === 0) {
                return res.status(httpStatusCodes.NOT_FOUND).end();
            }

            const course = courses[0];
            if (course.ownerId !== ownerId) {
                return res.status(httpStatusCodes.UNAUTHORIZED).end();
            }

            await courseModel.delete(course);
            return res.status(httpStatusCodes.OK).end();
        } catch (err) {
            console.log("🚀 ~ file: coursesController.ts:44 ~ checkTokenValidity ~ err:", err)
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    });
}

export default {
    getAllCourses,
    addCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
};