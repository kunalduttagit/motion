import Image from 'next/image'
import { inter, poppins } from '@/app/font'
import Link from 'next/link'
import { WatchlistButton } from './watchlistButton'
import { languageMap } from '@/utils/languageMap'

export function Card({ imageUrl, title, genres, year }: any) {
    return (
        <div className={`lg:w-[230px] xl:w-[300px] rounded-2xl ml-10 overflow-hidden border-gray-500 hover:border-[1px] p-[4px] hover:p-[3px] ${poppins.className}`}>
            <div className='group relative overflow-hidden'>
                <div className='absolute top-1 left-3 text-lg z-10 text-white/80'>{year}</div>
                <img src={imageUrl} alt={title} className='cover transition ease-out duration-500 hover:scale-105 overflow-hidden rounded-2xl' />
                <div className='group-hover:-translate-y-24 left-4 -bottom-20 transition-transform ease-in-out right-4 border-[1px] border-gray-600 text-white absolute border-[0.5px]backdrop-filter backdrop-blur-sm bg-opacity-10 bg-slate-200 rounded-full'>
                    <div className='flex justify-between px-4 py-3 items-center'>
                        <div className='text-base'>Add to list?</div>
                        <button className='text-lg border-[0.5px] backdrop-filter backdrop-blur-sm bg-opacity-10 bg-slate-200 border-gray-600 px-2 py-2 rounded-full'><Image src='/icons/preAdd.png' width={20} height={20} alt="Add" className='invert' /></button>
                    </div>
                </div>
            </div>
            <div className='text-2xl ml-1 mt-2'>
                <div className='truncate'> {title}</div>
                <div className='text-white/60 text-lg'>{genres}</div>
            </div>
        </div>
    )
}

export function Card2({ imageUrl, title, genres, year }: any) {
    return (
        <div className={`w-[200px] rounded-md ml-10 overflow-hidden ${poppins.className}`}>
            <div className='relative group'>
                <img src={imageUrl} alt={title} className='cover' />
                <div className='absolute -right-8 bottom-2 group-hover:-translate-x-12 transition-transform ease-in-out'>
                    <button className='text-lg border-[0.5px] backdrop-filter backdrop-blur-sm bg-opacity-10 hover:bg-blue-600 bg-slate-200 border-gray-600 px-2 py-2 rounded-full'><Image src='/icons/preAdd.png' width={20} height={20} alt="Add" className='invert' /></button>
                </div>
                <div className='absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-slate-200 h-16 backdrop-filter backdrop-blur-sm'>
                    <div className='text-2xl truncate mt-4 ml-2'>{title}</div>
                </div>
            </div>
        </div>
    )
}

export function Card3({ id, imageUrl, title, genres="", year, watchListProp }: { id: string, imageUrl: string, title: string, genres: string, year: string, watchListProp: boolean }) {
    return (
        <Link href={`/home/movie/${id}`} className='group'>

            {/* <div className={`w-[260px] rounded-lg sm:ml-8 md:ml-10 overflow-hidden border-gray-500 hover:border-[1px] p-[4px] hover:p-[3px] ${poppins.className}`}> */}
            <div className={`mr-6 lg:mr-10 w-[260px] rounded-lg border-gray-500 ${poppins.className}`}>
                <div className='relative overflow-hidden rounded-lg'>
                    <div className={`absolute top-2 left-2 text-[#ff2e63] text-lg z-10`}>motion</div>
                    <div className='absolute top-2 right-2 text-sm z-10 border-[0.5px] backdrop-filter backdrop-blur-md bg-opacity-10 bg-slate-600 border-gray-400 px-2 py-1 rounded-full'>{year}</div>
                    <Image width={720} height={480} alt={title} src={imageUrl.toString()} className='cover transition ease-out duration-500 group-hover:scale-105 overflow-hidden rounded-lg' />
                    <div className='absolute -right-10 bottom-2 group-hover:-translate-x-14 transition-transform ease-linear'>
                        <WatchlistButton id={id.toString()} watchList={watchListProp} banner={false}/>
                    </div>

                </div>
                <div className='text-lg font-medium ml-1 mt-2'>
                    {genres.length == 0 ? <div className='line-clamp'> {title}</div> : <div className='truncate'> {title}</div>}
                    {genres.length > 0 && <div className='text-white/60 text-sm'>{genres}</div>}
                </div>
            </div>
        </Link>
    )
}


export function CardMobile({ id, imageUrl, title, genres="", year, watchListProp }: { id: string, imageUrl: string, title: string, genres: string, year: string, watchListProp: boolean }) {
    return (
        <Link href={`/mobilehome/movie/${id}`} className='group'>

            {/* <div className={`w-[260px] rounded-lg sm:ml-8 md:ml-10 overflow-hidden border-gray-500 hover:border-[1px] p-[4px] hover:p-[3px] ${poppins.className}`}> */}
            <div className={`mr-6 lg:mr-10 w-[140px] rounded-lg border-gray-500 ${poppins.className}`}>
                <div className='relative overflow-hidden rounded-lg'>
                    <div className={`absolute top-2 left-2 text-[#ff2e63] text-lg z-10`}>motion</div>
                    <div className='absolute top-2 right-2 text-sm z-10 border-[0.5px] backdrop-filter backdrop-blur-md bg-opacity-10 bg-slate-600 border-gray-400 px-2 py-1 rounded-full'>{year}</div>
                    <Image width={720} height={480} alt={title} src={imageUrl.toString()} className='cover transition ease-out duration-500 group-hover:scale-105 overflow-hidden rounded-lg' />
                    <div className='absolute right-2 bottom-2 transition-transform ease-linear'>
                        <WatchlistButton id={id.toString()} watchList={watchListProp} banner={false}/>
                    </div>

                </div>
                {/* <div className='text-lg font-medium ml-1 mt-2'>
                    {genres.length == 0 ? <div className='line-clamp'> {title}</div> : <div className='truncate'> {title}</div>}
                    {genres.length > 0 && <div className='text-white/60 text-sm'>{genres}</div>}
                </div> */}
            </div>
        </Link>
    )
}


export function CardList({ id, imageUrl, title, genres="", year, watchListProp }: { id: string, imageUrl: string, title: string, genres: string, year: string, watchListProp: boolean }) {
    return (
        <Link href={`/home/movie/${id}`} className='group'>

            {/* <div className={`w-[260px] rounded-lg sm:ml-8 md:ml-10 overflow-hidden border-gray-500 hover:border-[1px] p-[4px] hover:p-[3px] ${poppins.className}`}> */}
            <div className={`mr-6 lg:mr-10 w-[260px] rounded-lg border-gray-500 ${poppins.className}`}>
                <div className='relative overflow-hidden rounded-lg'>
                    <div className={`absolute top-2 left-2 text-[#ff2e63] text-lg z-10`}>motion</div>
                    <div className='absolute top-2 right-2 text-sm z-10 border-[0.5px] backdrop-filter backdrop-blur-md bg-opacity-10 bg-slate-600 border-gray-400 px-2 py-1 rounded-full'>{year}</div>
                    <Image width={480} height={720} alt={title} src={imageUrl.toString()} className='cover transition ease-out duration-500 group-hover:scale-105 overflow-hidden rounded-lg' />
                    <div className='absolute -right-10 bottom-2 group-hover:-translate-x-14 transition-transform ease-linear'>
                        <WatchlistButton id={id.toString()} watchList={watchListProp} banner={false}/>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export function MobileCardList({ id, imageUrl, title, genres="", year, watchListProp }: { id: string, imageUrl: string, title: string, genres: string, year: string, watchListProp: boolean }) {
    return (
        <Link href={`/mobilehome/movie/${id}`} className='group'>

            {/* <div className={`w-[260px] rounded-lg sm:ml-8 md:ml-10 overflow-hidden border-gray-500 hover:border-[1px] p-[4px] hover:p-[3px] ${poppins.className}`}> */}
            <div className={`mr-6 lg:mr-10 w-[140px] rounded-lg border-gray-500 ${poppins.className}`}>
                <div className='relative overflow-hidden rounded-lg'>
                    <div className={`absolute top-2 left-2 text-[#ff2e63] text-lg z-10`}>motion</div>
                    <div className='absolute top-2 right-2 text-sm z-10 border-[0.5px] backdrop-filter backdrop-blur-md bg-opacity-10 bg-slate-600 border-gray-400 px-2 py-1 rounded-full'>{year}</div>
                    <Image width={480} height={720} alt={title} src={imageUrl.toString()} className='cover transition ease-out duration-500 group-hover:scale-105 overflow-hidden rounded-lg' />
                    <div className='absolute right-2 bottom-2 transition-transform ease-linear'>
                        <WatchlistButton id={id.toString()} watchList={watchListProp} banner={false}/>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export function Card4({ id, imageUrl, title, genres="", year, watchListProp }: { id: string, imageUrl: string, title: string, genres: string, year: string, watchListProp: boolean }) {
    return (
        <Link href={`/home/movie/${id}`} className='group'>

            {/* <div className={`w-[260px] rounded-lg sm:ml-8 md:ml-10 overflow-hidden border-gray-500 hover:border-[1px] p-[4px] hover:p-[3px] ${poppins.className}`}> */}
            <div className={`mr-6 lg:mr-10 w-[260px] hover:card-background-blur rounded-lg border-gray-500 ${poppins.className}`}>
                <div className='relative overflow-hidden rounded-lg'>
                    <div className={`absolute top-2 left-2 text-[#ff2e63] text-lg z-10`}>motion</div>
                    <div className='absolute top-2 right-2 text-sm z-10 border-[0.5px] backdrop-filter backdrop-blur-md bg-opacity-10 bg-slate-600 border-gray-400 px-2 py-1 rounded-full'>{year}</div>
                    <Image width={720} height={480} alt={title} src={imageUrl.toString()} placeholder="blur" className='cover transition ease-out duration-500 group-hover:scale-105 overflow-hidden rounded-lg' />
                    <div className='absolute -right-10 bottom-2 group-hover:-translate-x-14 transition-transform ease-linear'>
                        <WatchlistButton id={id.toString()} watchList={watchListProp} banner={false}/>
                    </div>

                </div>
                <div className='text-lg font-medium ml-1 mt-2'>
                    {genres.length == 0 ? <div className='line-clamp'> {title}</div> : <div className='truncate'> {title}</div>}
                    {genres.length > 0 && <div className='text-white/60 text-sm'>{genres}</div>}
                </div>
            </div>
        </Link>
    )
}

export function DesktopWatchlistCard({ id, imageUrl, backdropUrl, title, genres, date, language, runtime }: { id: string, imageUrl: string, backdropUrl: string, title: string, genres: [string], date: string, language: string, runtime: number}) {
    const hours = Math.floor(runtime/60);
    const minutes = runtime % 60;
    return (
            <Link href={`/home/movie/${id}/`}>
                <div className='flex flex-col lg:flex-row lg:ml-6 py-4 hover:bg-[hsla(var(--mymuted))]'>
                        <div className='lg:hidden flex w-full justify-center items-center mb-4'>
                        <Image src={backdropUrl} width={320} height={80} alt="poster" className='rounded-md' />
                    </div>
                    <div className='hidden lg:block'>
                        <Image src={imageUrl} width={160} height={100} alt="poster" className='rounded-md' />
                    </div>
                    <div className='ml-8'>
                        <p className='text-3xl font-semibold mb-4'>{title}</p>

                        {/* genres */}
                        <div className="hidden lg:flex mb-4 font-semibold">
                            {genres.map((genre: string, index)=> (
                                <div className="" key={genre}>
                                    {genre}{index != genres.length - 1 && <span className='mx-1'>•</span>}
                                </div>
                            ))}
                        </div>
                        {/* for mobile just show 3 genres */}
                        <div className="flex lg:hidden mb-4 font-semibold">
                            {genres.slice(0,3).map((genre: string, index)=> (
                                <div className="" key={genre}>
                                    {genre}{index != Math.min(2, genres.length-1) && <span className='mx-1'>•</span>}
                                </div>
                            ))}
                        </div>

                        <div className='flex items-center font-semibold '>
                            Released : <p className='ml-2 font-normal'>{date}</p>
                        </div>
                        <div className=''><span className='font-semibold'>Duration : </span>{hours}h {minutes}m</div>

                        {/* language */}
                        {language !== 'xx' ?
                        <div>
                        <span className='font-semibold'>Available in : </span>{languageMap[language]}
                        </div>
                            : null
                        }

                        <button className=' my-2 border-[0.5px] hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-10 hover:bg-slate-600 border-gray-400 px-10 py-2 w-[90%] lg:w-auto rounded-sm bg-white text-black font-semibold hover:text-gray-400'>
                            Remove
                        </button>
                    </div>
                </div>
            </Link>
    )
}
