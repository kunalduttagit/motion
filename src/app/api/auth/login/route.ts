import { connect } from '@/db/dbConfig';
import User from '@/db/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { SignJWT } from 'jose'

connect();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        //get user
        const user = await User.findOne({ email });

        //check if user exits
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        //check if password is correct
        const passwordValid = await bcryptjs.compare(password, user.password);
        if (!passwordValid) {
            return NextResponse.json({ error: 'Unauthorized - Invalid password' }, { status: 401 });
        }
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await new SignJWT(tokenData)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('10d')
            .sign(new TextEncoder().encode(process.env.TOKEN_SECRET!));
        //delete cookie from user browser after JWT token has expired
        const expires = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
        
        //set to user cookies
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            username: user.username,
            email
        })
        response.cookies.set("motion-user-token", token, { httpOnly: true, expires });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
