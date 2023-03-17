import courseModel from "@/backend/models/courseModel";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { checkOwner } from "../middlewares";

export async function getAllCourses(req: NextApiRequest, res: NextApiResponse) {
    const courses = await courseModel.scan().exec();
    res.status(200).json(courses);
}

export async function createCourse(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.name) {
        res.status(400).json({ message: 'Name is required' });
        return;
    }
    if (!req.body.description) {
        res.status(400).json({ message: 'Description is required' });
        return;
    }
    if (!req.body.ownerId) {
        res.status(400).json({ message: 'Owner id is required' });
        return;
    }

    const course = new courseModel({
        id: crypto.randomUUID(),
        name: req.body.name,
        description: req.body.description,
        topics: [],
        ownerId: req.body.ownerId
    });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
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
    checkOwner(req, res, async () => {
        const courseId = req.body.id;
        if (!courseId) {
            res.status(400).json({ message: 'Course id is required.' });
            return;
        }

        const courses = await courseModel.scan().where('id').eq(courseId).exec();
        if (courses.length > 0) {
            const course = courses[0];
            // update only the required fields
            if (req.body.name) {
                course['name'] = req.body.name;
            }
            if (req.body.description) {
                course['description'] = req.body.description;
            }
            if (req.body.topics) {
                course['topics'] = req.body.topics;
            }
            await courseModel.update(course);
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'Course not found.' });
        }
    })
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