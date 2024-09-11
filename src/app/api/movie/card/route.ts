import { connect } from "@/db/dbConfig";
import Movie from "@/db/models/movieModel";
import { NextRequest, NextResponse } from "next/server"; 

connect();

export async function GET() {
    try {
        const data = await Movie.find().limit(20);
        const movies = data.map(movie => {
            const {_id, title, genres, release_date, poster_path, backdrop_path } = movie;
            const genre = genres[0];
            const dateObject = new Date(release_date);
            const year = dateObject.getFullYear();
            const pimage = 'https://image.tmdb.org/t/p/w500' + poster_path;
            const image = 'https://image.tmdb.org/t/p/w1280' + backdrop_path;
            return {_id, title, genre, year, pimage, image};
        })
       
        const genresToFetch = ['Comedy', 'Adventure', 'Drama', 'Animation', 'Fantasy', 'Romance', 'Science Fiction', 'Music', 'Horror', 'Thriller', 'Crime', 'Mystery', 'Family', 'Documentary'];
        const genreMovies = {} as { [key: string]: any };
        for (const genre of genresToFetch) {
            const data = await Movie.find({ "genres.0": genre , backdrop_path: { $exists: true, $ne: '' } }).limit(6);
            const createMovie = data.map(movie => {
                const { _id, title, release_date, poster_path, backdrop_path } = movie;
                const dateObject = new Date(release_date);
                const year = dateObject.getFullYear();
                const pimage = 'https://image.tmdb.org/t/p/w500' + poster_path;
                const image = 'https://image.tmdb.org/t/p/w1280' + backdrop_path;
                return { _id, title, genre, year, pimage, image };
            });
            genreMovies[genre] = createMovie;
        }
        // console.log(genreMovies);
        return NextResponse.json({ popular: movies, genreMovies }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({error: "Cant fetch popular movies", message: error.message}, {status: 500});
    }
}

export async function POST() {
    const movs = ['65ce6a264968b47edf6233ab', '65ce6a264968b47edf6235c4', '65ce6a264968b47edf623435', '65ce6a264968b47edf6233ff', '65ce6a264968b47edf6234b3', '65ce6a264968b47edf6237f8', '65ce6a264968b47edf62339c', '65ce6a264968b47edf62341b', '65ce6a264968b47edf6233c7'];
    let movies = [] as any[];
    try {
        const data = await Movie.find({_id: {$in: movs}});
        const createMovie = data.map(mov => {
            const { _id, title, release_date, poster_path, genres, overview } = mov;
            const dateObject = new Date(release_date);
            const year = dateObject.getFullYear();
            const image = 'https://image.tmdb.org/t/p/w500' + poster_path;
            const movie = { _id, title, genres, year, image, overview };
            movies.push(movie);
        });
        return NextResponse.json({movies}, {status: 200});
    } catch (err) {
        console.log(err);
    }
}