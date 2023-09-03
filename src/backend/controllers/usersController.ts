import { NextApiRequest, NextApiResponse } from "next";
import professorModel from '../models/userModels/professorModel';
import crypto from "crypto";
import { generateClientSideUser, generateHashedPassword } from "./authController";
import { checkTokenValidity } from "../middlewares";
import httpStatusCodes from "http-status-codes";
import { createReadStream } from "fs";
import multer from "multer";
import { S3 } from "aws-sdk";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default {
    getAllUsers: async (req: NextApiRequest, res: NextApiResponse) => {
        const users = await professorModel.scan().exec();
        return res.status(httpStatusCodes.OK).json({
            users: users
        });
    },
    updateUserInfo: (req: NextApiRequest, res: NextApiResponse) => {
        checkTokenValidity(req, res, async (decoded: any) => {
            const { name, department, institute, contactNumber, linkedIn, about } = req.body;
            try {
                const users = await professorModel.query('id').eq(decoded.id).exec();
                if (users.length === 0) {
                    return res.status(httpStatusCodes.NOT_FOUND).end();
                }

                const user = users[0];

                if (name) {
                    user.name = name;
                }
                if (department) {
                    user.department = department;
                }
                if (institute) {
                    user.institute = institute;
                }
                if (contactNumber) {
                    user.contactNumber = contactNumber;
                }
                if (linkedIn) {
                    user.linkedIn = linkedIn;
                }
                if (about) {
                    user.about = about;
                }
                const newUser = generateClientSideUser(user.id, user.name, user.email, user.department, user.institute, user.about, user.contactNumber, user.linkedIn);
                await user.save();
                res.status(httpStatusCodes.OK).json({
                    user: newUser
                });
            }
            catch (err) {
                console.log("🚀 ~ file: usersController.ts:34 ~ updateUser: ~ err:", err)
                return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).end();
            }
        });
    },
    updatePassword: async (req: NextApiRequest, res: NextApiResponse) => {
        checkTokenValidity(req, res, async (decoded: any) => {
            const { password, newPassword } = req.body;
            const id = decoded['id'];

            const users = await professorModel.query().where('id').eq(id).exec();
            if (users.length === 0) {
                return res.status(httpStatusCodes.NOT_FOUND).end();
            }

            const user = users[0];
            const hashedPassword = generateHashedPassword(password, user.salt);
            if (hashedPassword !== user['hashedPassword']) {
                res.status(httpStatusCodes.UNAUTHORIZED).end();
                return;
            }

            const salt = crypto.randomBytes(16).toString('hex');
            const newHashedPassword = generateHashedPassword(newPassword, salt);

            user.salt = salt;
            user.hashedPassword = newHashedPassword;

            const newUser = generateClientSideUser(user.id, user.name, user.email, user.department, user.institute, user.about, user.contactNumber, user.linkedIn);
            await user.save();
            res.status(httpStatusCodes.OK).json({
                user: newUser
            });
        });
    }
};