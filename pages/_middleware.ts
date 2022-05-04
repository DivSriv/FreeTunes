import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const signedInPages = [
    '/', '/playlist', '/library', '/search'
]

export default function middleware(req, res) {
    if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.jwt_token_access;
        if (!token || res.statusCode === 401) {
            return NextResponse.redirect('/signin')
        } 
    } else {
        if (res.status === 404) {
            return NextResponse.redirect('/')
        
    }}
}