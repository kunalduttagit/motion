import {connect} from '@/db/dbConfig';
import User from '@/db/models/userModel';
import Movie from '@/db/models/movieModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
    const id = request.headers.get('x-user-id');
    const username = request.headers.get('x-user-name');
    try {
        const user = await User.findById(id).populate('watchList');
        user.watchList.sort((a: { timestamp: number; }, b: { timestamp: number; }) => b.timestamp - a.timestamp);
        const latestMovies = user.watchList.slice(0, 20);
        const allRecs = [];
        for(const movie of latestMovies) {
            const movieDataCbf = await Movie.find({id: {$in: movie.content_based_recs }});
            if(movieDataCbf.length == 10) {
                allRecs.push(movieDataCbf);
            }
            const movieDataCf = await Movie.find({id: {$in: movie.collaborative_based_recs }});
            if(movieDataCf.length == 10) {
                allRecs.push(movieDataCf);
            }
            
        }

        let recs = [];
        let seenIds = new Set();
        
        for (let col = 0; col < allRecs[0].length; col++) {
            for (let row = 0; row < allRecs.length; row++) {
                const { _id, title, genres, release_date, poster_path, backdrop_path } = allRecs[row][col];
                const genre = genres[0];
                const dateObject = new Date(release_date);
                const year = dateObject.getFullYear();
                const pimage = 'https://image.tmdb.org/t/p/w500' + poster_path;
                const image = 'https://image.tmdb.org/t/p/w1280' + backdrop_path;
                
                // Only add the movie if it hasn't been seen before
                if (!seenIds.has(title)) {
                    const createdMovie = { _id, title, genre, year, pimage, image };
                    recs.push(createdMovie);
                    seenIds.add(title);
                }
            }
            if (recs.length >= 20) break;
        }
        return NextResponse.json({recs, username}, {status: 200});
    } catch (error: any) {
        console.log(error.message);
        throw new Error(error);
    }  

}
