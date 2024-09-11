import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WatchlistButton } from './watchlistButton';
// export function Banner({ image }: { image: string }) {
//     return (
//         <>
//             <div className='relative'>
//                 <Image src={`/backdrops/${image}.jpeg`} width={1920} height={1080} alt='Avatar' className='w-full' />

//                 <div className='absolute bottom-0 left-0 w-full h-[100%] bg-gradient-to-t from-black to-transparent pointer-events-none'></div>
//             </div>
//         </>
//     );
// }

const movies = ['65ce6a264968b47edf6233ab', '65ce6a264968b47edf6235c4', '65ce6a264968b47edf623435', '65ce6a264968b47edf6233ff', '65ce6a264968b47edf6234b3', '65ce6a264968b47edf6237f8', '65ce6a264968b47edf62339c', '65ce6a264968b47edf62341b', '65ce6a264968b47edf6233c7']

export function Banner({ id, year, time, rating, genres, image, title, description, watchList }:any) {
    return (

            <div className='relative'>
                <Image src={image} width={1920} height={1080} alt='Avatar' className='w-full object-cover movie-detail-banner' />
                {/* <div className='absolute bottom-0 left-0 w-full h-[100%]  pointer-events-none'>Hello</div> */}

                {/* Text content */}
                <div className='absolute z-50 top-[26%] left-20'>
                    {title && <h1 className={`${(title.length > 13) ? "text-6xl w-[65%]" : "text-8xl"} text-white font-semibold`}>{title}</h1>}
                    <div className='mt-5 font-extralight'>
                        <span className='mx-1 font-medium text-lg'>{year}</span>•
                        <span className='mx-2 font-light text-base px-2 py-1 border border-gray-400 rounded-md'>{rating}</span>•
                        <span className='mx-1 font-medium text-lg'>{time}</span>•
                        <span className='mx-1 font-medium text-lg'>{genres[0]}</span>
                    </div>
                    {description && <p className='w-[60%] line-clamp-2 mt-5 text-gray-300'>{description}</p>}
                    <div className='mt-6 flex space-x-6 font-semibold text-sm items-center'>
                        <WatchlistButton id={id.toString()} watchList={watchList} banner={true}/>
                        <Link href={`/home/movie/${id}`} className='button-blur rounded-md px-7 py-2'>
                            See More
                        </Link>
                    </div>
                </div>
            </div>
    );
}

export function MobileBanner({ id, image, title, description, buttonText, variant }:any) {
    return (
        <Link href={`/home/movie/${id}`}>
            <div className='relative flex justify-center items-center mx-6 mt-20 mb-4 border border-white rounded-lg overflow-hidden'>
                <Image src={image} width={720} height={1080} alt='Avatar' className='w-full' />

                {/* Text content */}
                {/* <div className='absolute z-50 bottom-[16%] w-full flex items-center justify-center'> */}
                   
                

                {/* <WatchlistButton id={id.toString()} watchList={true} banner={true}/> */}

                {/* </div> */}
            </div>
        </Link>
    );
}

// bg-gradient-to-t from-black to-transparent
