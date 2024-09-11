import { connect } from '@/db/dbConfig';
import User from '@/db/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json({ message: 'Enter all necessary information' }, { status: 400 });
        }

        //Check if user already exists in database
        const userExists = await User.findOne({ email })!;
        if (userExists) {
            return NextResponse.json({ message: 'Conflict - User already exists' }, { status: 409 });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        if (user) {
            return NextResponse.json({
                message: 'user created successfully',
                success: true,
                username,
                email,
            })            
        } else {
            return NextResponse.json({ error: "Failed to save to database" }, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to create user" + error.message }, { status: 500 });
    }
}
