import courseModel from "@/models/courseModel";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export async function getAllCourses(req: NextApiRequest, res: NextApiResponse) {
    const courses = await courseModel.scan().exec();
    res.status(200).json(courses);
}

export async function createCourse(req: NextApiRequest, res: NextApiResponse) {
    const course = new courseModel({
        id: crypto.randomUUID(),
        ...req.body
    });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
}

export async function getCourseById(req: NextApiRequest, res: NextApiResponse) {
    const course = await courseModel.query('id').eq(req.query.id).exec();
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

export async function updateCourse(req: NextApiRequest, res: NextApiResponse) {
    const courseId = req.query.id;
    const course = await courseModel.scan().where('id').eq(courseId).exec();
    if (course.length > 0) {
        const course = await courseModel.update({
            id: courseId,
            ...req.body
        });
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

export async function deleteCourse(req: NextApiRequest, res: NextApiResponse) {
    const courses = await courseModel.scan().where('id').eq(req.query.id).exec();
    if (courses.length > 0) {
        const course = courses[0];
        courseModel.delete(course['id']);
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

export default {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
};