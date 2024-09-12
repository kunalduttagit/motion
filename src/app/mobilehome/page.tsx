'use client';

import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import Autoplay from 'embla-carousel-autoplay';
import { Card, Card2, CardMobile, CardList, MobileCardList } from '@/components/ui/card';

import { Banner, MobileBanner } from '@/components/ui/banner';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/bannercarousel';
import { carouselMovies } from '@/utils/languageMap';
import { GradientName } from '@/components/ui/gradientName';
import { watch } from 'fs';

type Movie = {
    _id: string,
    title: string,
    genre: string,
    year: string,
    image: string,
    pimage: string
}

type MovieTypes = {
    popular: Movie[],
    drama: Movie[],
    comedy: Movie[],
    animation: Movie[],
    fantasy: Movie[],
    romance: Movie[],
    sciencefiction: Movie[],
    music: Movie[],
    horror: Movie[],
    thriller: Movie[],
    crime: Movie[],
    mystery: Movie[],
    adventure: Movie[],
    family: Movie[],
    documentary: Movie[],
    [key: string]: Movie[];
}

const movieTemplate: Movie = {
    _id: ' ',
    title: '',
    genre: '',
    year: '',
    image: '',
    pimage: ''
};

export default function CarouselPlugin() {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true}));
    const images = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    const titles = ['Oppenheimer', 'Grinderwald', 'Avatar', 'Intestellar', 'SpiderMan: No way home', 'Mulan'];
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [movies, setMovies] = useState<MovieTypes>({
        popular: [{...movieTemplate}],
        drama: [{...movieTemplate}],
        comedy: [{...movieTemplate}],
        animation: [{...movieTemplate}],
        fantasy: [{...movieTemplate}],
        romance: [{...movieTemplate}],
        sciencefiction: [{...movieTemplate}],
        music: [{...movieTemplate}],
        horror: [{...movieTemplate}],
        thriller: [{...movieTemplate}],
        crime: [{...movieTemplate}],
        mystery: [{...movieTemplate}],
        adventure: [{...movieTemplate}],
        family: [{...movieTemplate}],
        documentary: [{...movieTemplate}],
    });

    const [watchlist, setWatchlist] = useState<string[]>([]);
    const [detailedWatchlist, setDetailedWatchlist] = useState<object[]>([]);
    const [recommendations, setRecommendations] = useState<object[]>([])
    const [username, setUsername] = useState<string>("");

    const fetchOnLoad = async () => {
        try {
            const { data } = await axios.get('/api/movie/card');
            setMovies(prevMovies => ({
                ...prevMovies,
                popular: data.popular,
                drama: data.genreMovies["Drama"],
                comedy: data.genreMovies["Comedy"],
                fantasy: data.genreMovies["Fantasy"],
                adventure: data.genreMovies["Adventure"],
                animation: data.genreMovies["Animation"],
                romance: data.genreMovies["Romance"],
                sciencefiction: data.genreMovies["Science Fiction"],
                music: data.genreMovies["Music"],
                horror: data.genreMovies["Horror"],
                thriller: data.genreMovies["Thriller"],
                crime: data.genreMovies["Crime"],
                mystery: data.genreMovies["Mystery"],
                family: data.genreMovies["Family"],
                documentary: data.genreMovies["Documentary"],
            }));
        } catch (error: any) {
            console.log("Server error: " + error)
        }
    }

    const genres = ['Adventure', 'Comedy', 'Drama', 'Animation', 'Fantasy', 'Romance', 'Science Fiction', 'Music', 'Horror', 'Thriller', 'Crime', 'Mystery', 'Family', 'Documentary'];


    const fetchWatchlist = async () => {
        try {
            let response = await axios.get('/api/movie/watchlist');
            setWatchlist(response.data.watchList)
            response = await axios.get('/api/movie/watchlist/detailedwatchlist')
            setDetailedWatchlist(response.data.movies)
        } catch (error: any) {
            console.log(error)
        }
    }

    const fetchRecommendations = async () => {
        try {
            const { data } = await axios.get('/api/movie/getRecs')
            setRecommendations(data.recs);
            setUsername(data.username)
        } catch(error: any){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOnLoad();
        fetchWatchlist();
        fetchRecommendations(); 
        
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const percentage = (window.scrollY / window.innerHeight) * 140;
            setScrollPercentage(percentage);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const opacity = 1 - scrollPercentage / 100;
    
    const renderMovies = () => {
      return Object.keys(movies).some(category => movies[category].length > 4);
    };

    let imageUrl: string = 'https://image.tmdb.org/t/p/w500/AcoVfiv1rrWOmAdpnAMnM56ki19.jpg'
    let backdropUrl: string = 'https://image.tmdb.org/t/p/w1280/ehumsuIBbgAe1hg343oszCLrAfI.jpg'
    return (
        <main className='w-screen text-white footer-wrap'>
            {/* <h1 className='z-[4000] fixed'>Scroll Percentage: {scrollPercentage.toFixed(2)}%</h1> */}
            {/* <div className='rem:mobile-carousel'>
            <Carousel
                plugins={[plugin.current]}
                className={`w-full fixed -z-10 opacity-[0.${Math.floor(scrollPercentage)}]`}
                style={{ opacity }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className='w-full relative'>
                    {carouselMovies.map((movie, index) => (
                        <CarouselItem key={index}>
                            <Banner
                                id={movie._id}
                                image={`/backdrops/${index+1}.jpeg`}
                                title={movie.title}
                                description={movie.overview}
                                year={movie.year}
                                time={movie.time}
                                rating={movie.rating}
                                genres={movie.genres}
                                watchList={watchlist?.includes(movie._id)}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            </div> */}
            <div className='desktop-carousel'>
                <Carousel
                    plugins={[plugin.current]}
                    className={`w-full fixed -z-10 opacity-[0.${Math.floor(scrollPercentage)}]`}
                    style={{ opacity }}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent className='w-full relative'>
                        {carouselMovies.map((movie, index) => (
                            <CarouselItem key={index}>
                                <MobileBanner
                                id={movie._id}
                                image={movie.image}
                                title={movie.title}
                                description={movie.overview}
                                buttonText='Mobile'
                                variant='secondary'
                            />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            {/* <div className=' text-9xl absolute  bg-gradient-to-b from-transparent from-5% via-black via-30% to-black to-95% top-[70vh] h-[100%] bottom-0 left-0 right-0'></div> */}
           {renderMovies() && (<div className={`text-white text-9xl absolute  ${scrollPercentage > 100 ? "bg-black " : "bg-gradient-to-b from-transparent from-5% via-black via-20% to-black to-95%  "} top-[74vh] h-[100%] bottom-0 left-0 right-0`} >

                <div className='text-2xl ml-6 font-semibold'>
                    {movies.popular.length > 1 && <>Popular on Motion</>}
                </div>
                <div className='ml-6'>

                    <ul className='mt-2 flex overflow-x-scroll pb-10 hide-scroll-bar no-scrollbar'>
                        {movies.popular?.map((movie:any) => (
                                <li key={movie._id}>
                                    <CardMobile id={movie._id} imageUrl={movie.pimage} title={movie.title} genres={movie.genre} year={movie.year} watchListProp={watchlist?.includes(movie._id)}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Top pics for username */}
                {recommendations.length > 0 && (<div>
	                 <div className='text-3xl ml-3 font-semibold flex w-[100vw] justify-start'>
	                     {recommendations.length > 1 && <><span className=''>Top pics for</span> <GradientName username={username}/> </>}
	                 </div>
	                 <div className=' background-blur-list p-3 mt-1'>
	                     <ul className='mt-2 flex overflow-x-scroll hide-scroll-bar no-scrollbar'>
	                         {recommendations?.map((movie:any) => (
	                                 <li key={movie._id}>
	                                     <MobileCardList id={movie._id} imageUrl={movie.pimage} title={movie.title} genres={movie.genre} year={movie.year} watchListProp={watchlist?.includes(movie._id)}/>
	                                 </li>
	                             ))
	                         }
	                     </ul>
	                 </div>
                 </div>)}

                 {
                    detailedWatchlist && (
                        <div className={`${(detailedWatchlist.length > 0) ? "mt-12" : ""} -mb-6`}>
                            <div className='text-2xl ml-6 font-semibold'>
                                {detailedWatchlist.length > 1 && <>Your List</>}
                            </div>
                            <div className='ml-6'>
                                <ul className='mt-2 flex overflow-x-scroll pb-10 hide-scroll-bar no-scrollbar'>
                                    {detailedWatchlist.map((movie:any) => (
                                        <li key={movie._id}>
                                            <CardMobile
                                                id={movie._id}
                                                imageUrl={movie.pimage}
                                                title={movie.title}
                                                genres={movie.genre}
                                                year={movie.year}
                                                watchListProp={watchlist?.includes(movie._id)}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                }
                

                {
                    genres?.map((genre: string, index) => (
                        <div key={index} className='ml-6'>
                            <hr className='mt-6'/>
                            <div className='mt-4 text-2xl font-semibold'>
                                {movies.popular.length > 1 && genre}
                            </div>

                            <div>
                                <ul className='mt-3 flex overflow-x-scroll hide-scroll-bar no-scrollbar'>
                                {movies[genre.replaceAll(' ', '').toLowerCase()]?.map((movie: Movie) => (
                                    <li key={movie._id}>
                                        <CardMobile id={movie._id} imageUrl={movie.pimage} genres='' title={movie.title} year={movie.year} watchListProp={watchlist?.includes(movie._id)} />
                                    </li>

                                ))}
                                </ul>
                            </div>
                        </div>
                    ))
                }

            </div>)}
        </main>
    );
}


// Top picks for username
// Watchlist
// Popular on motion numbered
