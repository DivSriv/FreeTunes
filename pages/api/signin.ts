import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie';
import {prisma} from '../../lib/prisma';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {email},
    });

    if (user && bcrypt.compareSync(password, user.password)) {
        const salt = bcrypt.genSaltSync();
        const token = jwt.sign({
            id:     user.id,
            email:  user.email,
            time:   Date.now()
            },
            process.env.JWT_SECRET,
            {expiresIn: '8h'}
        );

        let expires = 60 * 60 * 60 * 3600 * 3600;
        res.setHeader(
            'Set-Cookie',
            cookie.serialize(
                'jwt_token_access',
                token, 
                 {
                httpOnly: true,
                expires: new Date(expires),
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production', 
                }
            )
        );
        res.setHeader(
            'Connection',
            'keep-alive'
        )
        res.json(user);
    } else {
        res.status(401);
        res.json({error: 'Invalid email or password'});
    }

}