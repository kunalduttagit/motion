import { connect } from "@/db/dbConfig";
import User from "@/db/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/utils/getTokenData";

connect();

export async function GET(request: NextRequest) {
    //const token = request.cookies.get('token')?.value || '';
    const { id } = getTokenData(request);
    try {
        const user = await User.findById(id);
        const watchList = await user.watchList || [];

        return NextResponse.json({watchList}, {status: 200});
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }   
}

export async function POST(request: NextRequest) : Promise<NextResponse<{message: string;}>>  {
    const { movie_id } = await request.json();
    const { id } = getTokenData(request);
    
    try {
        await User.findByIdAndUpdate(id,
            {$addToSet: {watchList: movie_id}}
        )

        return NextResponse.json({message: 'Success: Added to Watchlist'}, {status: 200});
    } catch (error:any) {
        throw new Error(error);
    }

}

export async function DELETE(request: NextRequest) : Promise<NextResponse<{message: string;}>> {
    const movie_id = request.nextUrl.searchParams.get('id');
    const { id } = getTokenData(request);

    try {
        await User.findByIdAndUpdate(id, {$pull: {watchList: movie_id}})
        return NextResponse.json({message: 'Success: Removed from Watchlist'}, {status: 200});
    } catch (error:any) {
        throw new Error(error);
    }
}