import { connect } from "@/db/dbConfig";
import Movie from "@/db/models/movieModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const movie = await Movie.findById(id);
        if(!movie){
            return NextResponse.json({message: "No Movie found"}, {status: 404});
        }

        return NextResponse.json({movie}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: "Cant fetch movie from db", message: error.message}, {status: 500});
    }
}