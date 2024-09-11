import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/utils/getTokenData";
import User from "@/db/models/userModel";
import { connect } from "@/db/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const { username, id, email } = await getTokenData(request);
        const user = await User.findById(id).select('-password ');
        return NextResponse.json(user, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export async function PUT(request: NextRequest) {
    try {
        const {id} = getTokenData(request);
        const {newUsername, newEmail } = await request.json();
        const emailAlreadyExists = await User.findOne({ email:newEmail })!;
        const usernameAlreadyExists = await User.findOne({ username:newUsername })!;
        if (emailAlreadyExists) {
            return NextResponse.json({ message: 'emailExists' }, { status: 409 });
        }
        if (usernameAlreadyExists) {
            return NextResponse.json({ message: 'usernameExists' }, { status: 409 });
        }
        // Update the user document
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username: newUsername, email: newEmail },
            { new: true, runValidators: true } // Options to return the updated document and run validators
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
