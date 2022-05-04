import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie';
import {prisma} from '../../lib/prisma';



export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const salt = bcrypt.genSaltSync();
    const {email, password, password_confirm} = req.body;
    let user;

    if (!email || !password) {
        res.status(400)
        res.json({error: 'Please enter an email and password'});
        return;
    } else if (password !== password_confirm) {
        res.status(400)
        res.json({error: 'Passwords do not match'});
        return;
    }

    try {
        user = await prisma.user.create({
            data: {
                firstName: `${user.firstName}`,
                lastName: `${user.lastName}`,
                email,
                password: bcrypt.hashSync(password, salt),
            }
        })
    } catch (e) {
        res.status(401)
        res.json({error: 'User already exists'});
        return;
    }

    const token = jwt.sign(
        {
        email:  user.email,
        id:     user.id,
        time:   Date.now()
        },
        process.env.JWT_SECRET,
        {expiresIn: '8h'}
    )

    res.setHeader(
        'Set-Cookie', 
        cookie.serialize('jwt_token_access', token, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
            expires: false, 
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',        
        })
    )

    res.json(user)
}