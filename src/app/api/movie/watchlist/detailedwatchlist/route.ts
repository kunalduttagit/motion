import {connect} from '@/db/dbConfig';
import Movie from '@/db/models/movieModel';
import User from '@/db/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
    const id = request.headers.get('x-user-id');
    if (!id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }
    try {
        const user = await User.findById(id).populate({path: 'watchList', model: Movie});
        const movies = [];

        for(const movie of user.watchList) {
            const {_id, title, genres, release_date, poster_path, backdrop_path, runtime, original_language} = movie;
            const dateObject = new Date(release_date);
            const monthShort = dateObject.toLocaleString('en-US', { month: 'short' }); // e.g., "Dec"
            const month = dateObject.toLocaleString('en-US', { month: 'long' }); // e.g., "Dec"
            const year = dateObject.getFullYear(); // e.g., 2023
            const day = dateObject.getDate(); // e.g., 20
            const date = `${day} ${month} ${year}`;

            const pimage = 'https://image.tmdb.org/t/p/w500' + poster_path;
            const image = 'https://image.tmdb.org/t/p/w1280' + backdrop_path;
            const createdMovie = {_id, title, genres, year, date, pimage, image, runtime, original_language}
            movies.push(createdMovie);
        }

        return NextResponse.json({movies}, {status: 200});
    } catch (error: any) {
        console.log(error.message);
        throw new Error(error);
    }
}
