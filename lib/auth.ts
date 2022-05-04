import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const secret = process.env.JWT_SECRET;
        const token = req.cookies.jwt_token_access;
        if (token) {
            let user;
            try {
                const {id} = jwt.verify(token, secret);
                user = await prisma.user.findUnique({
                    where: {id},
                })
                if (!user) {
                    throw new Error('User not found')
                }
            }
            catch (e) {
            res.status(401);
            res.json({error: `${e}`});
            return;  

            }
            return handler(req, res, user)
        }
        res.status(401);
        res.json({error: 'Unauthorised user'});
        return 
    }
}

export const validateToken = (token) => {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
}