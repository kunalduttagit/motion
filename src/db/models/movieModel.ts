import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id: Number,
    title: String,
    overview: String,
    genres: [String],
    keywords: [String],
    actors: [String],
    director: String,
    adult: Boolean,
    imdb_id: String,
    backdrop_path: String,
    poster_path: String,
    original_language: String,
    release_date: Date,
    runtime: Number,
    content_based_recs: [Number],
    collaborative_based_recs: [Number],
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
export default Movie;