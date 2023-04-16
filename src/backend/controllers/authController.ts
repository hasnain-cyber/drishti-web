import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import professorModel, { DBProfessorType } from '../models/userModels/professorModel';
import jsonwebtoken from 'jsonwebtoken';
import { checkTokenValidity } from "../middlewares";
import httpStatusCodes from "http-status-codes";

export const generateJWTToken = (id: string) => {
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

export const generateHashedPassword = (password: string, salt: string) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export const generateDBUser = (id: string, name: string, email: string, salt: string, hashedPassword: string, department: string, institute: string, about: string, contactNumber: string, linkedIn: { name: string, url: string }) => {
    const returnValue: DBProfessorType = {
        id, name, email, salt, hashedPassword, department, institute, about, contactNumber, linkedIn
    }
    return returnValue;
}
export const generateClientSideUser = (id: string, name: string, email: string, department: string, institute: string, about: string, contactNumber: string, linkedIn: { name: string, url: string }) => {
    return {
        id, name, email, department, institute, about, contactNumber, linkedIn,
        token: generateJWTToken(id)
    };
}

export default {
    registerUser: async (req: NextApiRequest, res: NextApiResponse) => {
        const { name, email, password } = req.body;
        console.log("🚀 ~ file: authController.ts:29 ~ registerUser: ~ name, email, password:", name, email, password)

        if (!name || !email || !password) {
            return res.status(httpStatusCodes.BAD_REQUEST).end();
        }

        try {
            const query = await professorModel.query('email').eq(email).exec();
            if (query.length > 0) {
                return res.status(httpStatusCodes.CONFLICT).end();
            }
        } catch (err) {
            console.log("🚀 ~ file: authController.ts:41 ~ registerUser: ~ err:", err)
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = generateHashedPassword(password, salt);

        const data = generateDBUser(
            crypto.randomBytes(16).toString('hex'),
            name,
            email,
            hashedPassword,
            salt,
            '',
            '',
            '',
            '',
            { name: '', url: '' }
        )
        const clientSideData = generateClientSideUser(data.id, data.name, data.email, data.department, data.institute, data.about, data.contactNumber, data.linkedIn);
        const user = await professorModel.create(data);
        res.status(httpStatusCodes.CREATED).json({
            user: clientSideData
        });
    },
    loginUser: async (req: NextApiRequest, res: NextApiResponse) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(httpStatusCodes.BAD_REQUEST).end();
        }

        try {
            const query = await professorModel.query('email').eq(email).exec();
            if (query.length === 0) {
                return res.status(httpStatusCodes.NOT_FOUND).end();
            } else {
                const user = query[0];
                console.log("🚀 ~ file: authController.ts:82 ~ loginUser: ~ user:", user)
                const hashedPassword = generateHashedPassword(password, user.salt);
                if (hashedPassword !== user['hashedPassword']) {
                    return res.status(httpStatusCodes.UNAUTHORIZED).end();
                }
                const clientSideData = generateClientSideUser(user.id, user.name, user.email, user.department, user.institute, user.about, user.contactNumber, user.linkedIn);
                res.status(httpStatusCodes.OK).json({
                    user: clientSideData
                });
            }
        } catch (err) {
            console.log("🚀 ~ file: authController.ts:41 ~ registerUser: ~ err:", err)
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    },
    deleteUser: async (req: NextApiRequest, res: NextApiResponse) => {
        checkTokenValidity(req, res, async (decoded: any) => {
            try {
                const users = await professorModel.query('id').eq(decoded.id).exec();
                if (users.length === 0) {
                    return res.status(httpStatusCodes.NOT_FOUND).end();
                }

                const user = users[0];
                await user.delete();
                return res.status(httpStatusCodes.NO_CONTENT).end();
            } catch (err) {
                console.log("🚀 ~ file: authController.ts:41 ~ registerUser: ~ err:", err)
                return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).end();
            }
        });
    }
};