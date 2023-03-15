import courseModel from "@/models/courseModel";
import userModel from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";

const matchUsers = async (searchText: string) => {
    const users = await userModel.scan().where('name').contains(searchText).exec();
    return users;
}

const matchCourses = async (searchText: string) => {
    const courses = await courseModel.scan().where('name').contains(searchText).exec();
    return courses;
}

export async function getMatches(req: NextApiRequest, res: NextApiResponse) {
    const searchText = req.query.searchText as string;

    const results1 = await matchUsers(searchText);
    const results2 = await matchCourses(searchText);

    return res.status(200).json({
        'users': results1,
        'courses': results2
    });
}

export default {
    getMatches
};

