import Movie from "@/db/models/movieModel";
import { connect } from "@/db/dbConfig";
import Link from "next/link";
import { Card3 } from "@/components/ui/card";
import Image from "next/image";
import { languageMap } from "@/utils/languageMap";
import { getTokenData } from "@/utils/getTokenData";
import axios from "axios";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/db/models/userModel";
import { ClipboardEventHandler } from "react";

connect();

const getUserId = () => {
  try {
    // Access the cookies using the cookies function
    const cookieStore = cookies();
    const encodedToken = cookieStore.get("token")?.value || "";

    // Verify and decode the JWT
    const decodedToken = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!,
    ) as JwtPayload;

    // Return the decoded token data
    return {
      id: decodedToken.id,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default async function MovieDetails({ params }: any) {
  const { id } = getUserId();
  let watchList = [] as any;
  try {
    const user = await User.findById(id);
    watchList = (await user.watchList) || [];
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      cookies().delete("token");
    }

    console.log(error);
    throw new Error(error);
  }

  const movie = await Movie.findById(params.id);
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  //const response = await fetch(`https://imdb-api.projects.thetuhin.com/title/${movie.imdb_id}`);
  const response = await fetch(
    "https://imdb-api.projects.thetuhin.com/title/tt0250468",
  );
  ///console.log(response)
  //const data = await response.json();
  //const rating = data.rating; // Assuming the rating value is stored in the 'rating' property of the response JSON

  const content_based_data = await Movie.find({
    id: { $in: movie.content_based_recs },
  });
  const content_based_movies = content_based_data
    .map((movie) => {
      const { _id, title, genres, release_date, poster_path, backdrop_path } =
        movie;
      const genre = genres[0];
      const dateObject = new Date(release_date);
      const year = dateObject.getFullYear();
      const poster_image = "https://image.tmdb.org/t/p/w500" + poster_path;
      const backdrop_image = "https://image.tmdb.org/t/p/w1280" + backdrop_path;

      if (title && genre && year && backdrop_path.length > 0) {
        return { _id, title, genre, year, poster_image, backdrop_image };
      } else {
        return null;
      }
    })
    .filter((movie) => movie);

  const collaborative_based_data = await Movie.find({
    id: { $in: movie.collaborative_based_recs },
  });
  const collaborative_based_movies = collaborative_based_data
    .map((movie) => {
      const { _id, title, genres, release_date, poster_path, backdrop_path } =
        movie;
      const genre = genres[0];
      const dateObject = new Date(release_date);
      const year = dateObject.getFullYear();
      const poster_image = "https://image.tmdb.org/t/p/w500" + poster_path;
      const backdrop_image = "https://image.tmdb.org/t/p/w1280" + backdrop_path;
      if (title && genre && year && backdrop_path.length > 0) {
        return { _id, title, genre, year, poster_image, backdrop_image };
      } else {
        return null;
      }
    })
    .filter((movie) => movie);

  const backdrop_image =
    "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path;
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
            className={`${movie.title.length > 11 ? "text-5xl w-[60%]" : "text-8xl"} text-white font-bold`}
          >
            {movie.title}
          </div>

          <div className="mt-6 text-lg text-white/80 w-full">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            {" | "}
            <span className="mx-2 font-light text-base px-2 py-1 border border-gray-400 rounded-md">
              U/A 13+
            </span>
            {" | "}
            <span>
              {hours}h {minutes}m
            </span>
            {movie.original_language !== "xx" ? (
              <>
                {" | "}
                <span>{languageMap[movie.original_language]}</span>
              </>
            ) : null}
          </div>

          <div className="text-sm w-[50%] text-white/90 mt-3">
            {movie.overview || null}
          </div>

          <div className="mt-6 text-lg">
            <span className="text-white/70">Starring: </span>
            <span>{movie.actors.join(", ")}</span>
          </div>

          <div className="text-lg">
            <span className="text-white/70">Directed by: </span>
            <span>{movie.director}</span>
          </div>

          <div className="flex mt-6">
            {movie.genres?.map((genre: string) => (
              <div
                className="text-sm border-[0.5px] mr-2 backdrop-filter backdrop-blur-md bg-opacity-10 bg-slate-600 border-gray-400 px-2 py-1 rounded-full"
                key={genre}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute z-[100] flex top-[44%] transform -translate-y-1/2 right-[8%] myborder rounded-md">
      	 <Image
            src={"https://image.tmdb.org/t/p/w500"+movie.poster_path}
            alt={movie.title}
            width={250}
            height={375}
            className="w-[24vw] rounded-md"
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
                alt={movie.title}
                width={1920}
                height={1080}
            />
        </div>
        {/* below div is for putting shade on top of rotating image */}
        <div className="relative top-0  h-screen bg-gradient-to-b from-transparent from-0% via-black via-95% to-black to-100%"></div>
      </div>

      {/* Recommendations */}
      <div className="absolute top-[80vh] left-0 right-0 z-20 ">
        <div className="ml-6 text-xl font-semibold text-white/90">
          More Like This
        </div>
        <div className="ml-6 mt-2 overflow-x-scroll pb-10 hide-scroll-bar no-scrollbar">
          <ul className="flex">
            {content_based_movies ? (
              content_based_movies.map((movie: any) => (
                <li key={movie?.title}>
                  <Card3
                    id={movie?._id}
                    imageUrl={movie?.backdrop_image}
                    title={movie?.title}
                    genres={movie?.genre}
                    year={movie?.year}
                    watchListProp={watchList?.includes(movie._id)}
                  />
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>

        {collaborative_based_movies.length > 0 && (
          <>
            <div className="ml-6 text-xl font-semibold text-white/90">
              You may also like
            </div>
            <div className="ml-6 mt-2 overflow-x-scroll pb-10 hide-scroll-bar no-scrollbar">
              <ul className="flex">
                {collaborative_based_movies.map((movie: any) => (
                  <li key={movie?.title}>
                    <Card3
                      id={movie?._id}
                      imageUrl={movie?.backdrop_image}
                      title={movie?.title}
                      genres={movie?.genre}
                      year={movie?.year}
                      watchListProp={watchList?.includes(movie._id)}
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
