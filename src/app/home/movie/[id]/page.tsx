import Movie from "@/db/models/movieModel";
import { connect } from "@/db/dbConfig";
import { Card3 } from "@/components/ui/card";
import Image from "next/image";
import { languageMap } from "@/utils/languageMap";
import { cookies } from "next/headers";
import User from "@/db/models/userModel";
import { verifyAuth } from "@/lib/auth";

connect();

const getUserId = async () =>  {
  try {
    // Access the cookies using the cookies function (Next.js 16: cookies() is now async)
    const cookieStore = await cookies();
    const encodedToken = cookieStore.get("motion-user-token")?.value || "";

    // Verify and decode the JWT
    const user = await verifyAuth(encodedToken);
    return user.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default async function MovieDetails({ params }: any) {
  // Next.js 15+: params is a Promise and must be awaited
  const { id: movieId } = await params;

  const userId = await getUserId();
  let watchList = [] as any;
  try {
    const user = await User.findById(userId);
    watchList = user?.watchList || [];
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      const cookieStore = await cookies();
      cookieStore.delete("token");
    }
    console.log(error);
    // Don't throw here — unauthenticated users can still view movie details
  }

  const movie = await Movie.findById(movieId);

  // Guard: movie not found in DB (unstructured data / bad ID)
  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-white/60">This movie could not be loaded. It may have been removed or the data is unavailable.</p>
        </div>
      </div>
    );
  }

  // Safely derive runtime — fallback to 0 if missing
  const runtime = typeof movie.runtime === "number" ? movie.runtime : 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  //const response = await fetch(`https://imdb-api.projects.thetuhin.com/title/${movie.imdb_id}`);
  const response = await fetch(
    "https://imdb-api.projects.thetuhin.com/title/tt0250468",
  );
  ///console.log(response)
  //const data = await response.json();
  //const rating = data.rating; // Assuming the rating value is stored in the 'rating' property of the response JSON

  // Safely handle missing rec arrays
  const contentBasedRecs = Array.isArray(movie.content_based_recs) ? movie.content_based_recs : [];
  const collaborativeRecs = Array.isArray(movie.collaborative_based_recs) ? movie.collaborative_based_recs : [];

  const content_based_data = contentBasedRecs.length > 0
    ? await Movie.find({ id: { $in: contentBasedRecs } })
    : [];

  const content_based_movies = content_based_data
    .map((m: any) => {
      const { _id, title, genres, release_date, poster_path, backdrop_path } = m;
      const genre = Array.isArray(genres) ? genres[0] : undefined;
      const dateObject = new Date(release_date);
      const year = dateObject.getFullYear();
      const poster_image = "https://image.tmdb.org/t/p/w500" + (poster_path || "");
      const backdrop_image = "https://image.tmdb.org/t/p/w1280" + (backdrop_path || "");

      if (title && genre && year && backdrop_path && backdrop_path.length > 0) {
        return { _id, title, genre, year, poster_image, backdrop_image };
      } else {
        return null;
      }
    })
    .filter(Boolean);

  const collaborative_based_data = collaborativeRecs.length > 0
    ? await Movie.find({ id: { $in: collaborativeRecs } })
    : [];

  const collaborative_based_movies = collaborative_based_data
    .map((m: any) => {
      const { _id, title, genres, release_date, poster_path, backdrop_path } = m;
      const genre = Array.isArray(genres) ? genres[0] : undefined;
      const dateObject = new Date(release_date);
      const year = dateObject.getFullYear();
      const poster_image = "https://image.tmdb.org/t/p/w500" + (poster_path || "");
      const backdrop_image = "https://image.tmdb.org/t/p/w1280" + (backdrop_path || "");
      if (title && genre && year && backdrop_path && backdrop_path.length > 0) {
        return { _id, title, genre, year, poster_image, backdrop_image };
      } else {
        return null;
      }
    })
    .filter(Boolean);

  const backdrop_image =
    "https://image.tmdb.org/t/p/w1280" + (movie.backdrop_path || "");

  // Safely access fields that may be absent in unstructured documents
  const movieTitle: string = movie.title || "Untitled";
  const actors: string[] = Array.isArray(movie.actors) ? movie.actors : [];
  const genres: string[] = Array.isArray(movie.genres) ? movie.genres : [];
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "—";
  const posterSrc = movie.poster_path
    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
    : "/icons/logo.png";

  return (
    <div className="text-white w-screen">
      {/* Main Movie Showcase */}
      <div className="relative overflow-hidden">
        <div className="absolute top-[28%] left-16 z-10 w-full">
          {/* <div className='text-[#ff2e63] text-2xl'><span className="font-extrabold">m</span> FILM</div> */}
          <div className=" text-white text-md font-semibold flex mb-2">
            <Image src={"/icons/logo.png"} width={45} height={45} alt="m" className="mr-3" />
            <span className="mt-0.5 tracking-[.50em]">FILM</span>
          </div>

          <div
            className={`${movieTitle.length > 11 ? "text-5xl w-[60%]" : "text-8xl"} text-white font-bold`}
          >
            {movieTitle}
          </div>

          <div className="mt-6 text-lg text-white/80 w-full">
            <span>{releaseYear}</span>
            {" | "}
            <span className="mx-2 font-light text-base px-2 py-1 border border-gray-400 rounded-md">
              U/A 13+
            </span>
            {runtime > 0 && (
              <>
                {" | "}
                <span>
                  {hours}h {minutes}m
                </span>
              </>
            )}
            {movie.original_language && movie.original_language !== "xx" ? (
              <>
                {" | "}
                <span>{languageMap[movie.original_language] ?? movie.original_language}</span>
              </>
            ) : null}
          </div>

          {movie.overview && (
            <div className="text-sm w-[50%] text-white/90 mt-3">
              {movie.overview}
            </div>
          )}

          {actors.length > 0 && (
            <div className="mt-6 text-lg">
              <span className="text-white/70">Starring: </span>
              <span>{actors.join(", ")}</span>
            </div>
          )}

          {movie.director && (
            <div className="text-lg">
              <span className="text-white/70">Directed by: </span>
              <span>{movie.director}</span>
            </div>
          )}

          {genres.length > 0 && (
            <div className="flex mt-6">
              {genres.map((genre: string) => (
                <div
                  className="text-sm border-[0.5px] mr-2 backdrop-filter backdrop-blur-md bg-opacity-10 bg-slate-600 border-gray-400 px-2 py-1 rounded-full"
                  key={genre}
                >
                  {genre}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="absolute z-[100] flex top-[44%] transform -translate-y-1/2 right-[8%] myborder rounded-md">
      	 <Image
            src={posterSrc}
            alt={movieTitle}
            width={250}
            height={375}
            className="w-[24vw] h-auto rounded-md"
        />
        </div>
        {/* <Image
          src={backdrop_image}
          // className="movie-detail-banner w-screen -z-10 blur-3x"
          className="movie-detail-banner"
          alt={movie.title}
          width={1920}
          height={1080}
        /> */}
        
       	<div className="absolute rotating blur-2xl">
            <Image
                src={backdrop_image}
                alt={movieTitle}
                width={1920}
                height={1080}
            />
        </div>
        {/* below div is for putting shade on top of rotating image */}
        <div className="relative top-0  h-screen bg-gradient-to-b from-transparent from-0% via-black via-95% to-black to-100%"></div>
      </div>

      {/* Recommendations */}
      <div className="absolute top-[80vh] left-0 right-0 z-20 ">
        {content_based_movies.length > 0 && (
          <>
            <div className="ml-6 text-xl font-semibold text-white/90">
              More Like This
            </div>
            <div className="ml-6 mt-2 overflow-x-scroll pb-10 hide-scroll-bar no-scrollbar">
              <ul className="flex">
                {content_based_movies.map((m: any) => (
                  <li key={m?._id?.toString()}>
                    <Card3
                      id={m?._id}
                      imageUrl={m?.backdrop_image}
                      title={m?.title}
                      genres={m?.genre}
                      year={m?.year}
                      watchListProp={watchList?.includes(m._id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {collaborative_based_movies.length > 0 && (
          <>
            <div className="ml-6 text-xl font-semibold text-white/90">
              You may also like
            </div>
            <div className="ml-6 mt-2 overflow-x-scroll pb-10 hide-scroll-bar no-scrollbar">
              <ul className="flex">
                {collaborative_based_movies.map((m: any) => (
                  <li key={m?._id?.toString()}>
                    <Card3
                      id={m?._id}
                      imageUrl={m?.backdrop_image}
                      title={m?.title}
                      genres={m?.genre}
                      year={m?.year}
                      watchListProp={watchList?.includes(m._id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
