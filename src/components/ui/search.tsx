'use client';

import axios from "axios"
import { useHotkeys } from 'react-hotkeys-hook';
import { useState, useEffect, useRef, LegacyRef, ChangeEvent, Dispatch, SetStateAction } from 'react';
import Image from "next/image";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {ObjectId} from 'mongodb';

type Props = {
    open: boolean
}

export default function SearchComponent({open} : Props) {
    const [searchResults, setSearchResults] = useState([{
        _id: '', title: ''
    }]);
    const [searchParam, setSearchParam] = useState('');
    const inputRef = useRef() as LegacyRef<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState({} as { [key: string]: boolean });

    useEffect(() => {
        setIsOpen(true);
    }, [open]);

    //*identify if the webpage through Link element has changed
    const pathname = usePathname()
    const searchparamchange = useSearchParams();
    useEffect(() => {
        setSearchParam('')
        setIsOpen(false);
        setLoading({})
    }, [pathname, searchparamchange]);

    useHotkeys('mod+k', () => setIsOpen(!isOpen));

    useEffect(() => {
        const searchMovies = async () => {
            try {
                if (searchParam.length > 0) {
                    const { data } = await axios.get(`/api/movie/search?movie=${searchParam}`);
                    setSearchResults(data.results);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        const timer = setTimeout(() => {
            searchMovies();
        }, 500);
    
        return () => clearTimeout(timer);
    }, [searchParam]);

    const handleLoading = (id : string) => {
        // Set loading true for the specific item
        setLoading({[id]: true });
    };


    // const searchMovies = async () => {
    //     try{
    //         if(searchParam.length > 0) {
    //             const { data } = await axios.get(`/api/movie/search?movie=${searchParam}`);
    //             setSearchResults(data.results);
    //         }
    //     } catch (error){
    //         console.log(error);
    //     }       
    // }

    const removeSpinner = (id: string) => {
        const timer = setTimeout(() => {
            setLoading({[id]: false});
        }, 4000);

        return () => clearTimeout(timer);
    }

    return (
        <div className={`z-[3000] flex items-center ${!isOpen? "" : "overlay"} `}>
            {isOpen && 
            <div className="absolute w-[90%] left-[5%] lg:w-[40%] lg:left-[30%] bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg text-[hsl(var(--foreground))]">
                <div className='flex flex-col justify-center'>
                    <div className="flex rounded-md items-center h-12">
                        <Image src={'/icons/search.png'} alt='Search' width={26} height={20} className="invert-[80%] mx-2"/>
                        <input
                                type="text"
                                placeholder="Search..."
                                value={searchParam}
                                ref = {inputRef}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchParam(e.currentTarget.value)}
                                autoFocus
                                onKeyDown={e => e.key == 'Escape' && setIsOpen(false)}
                                className="h-10 w-full bg-transparent outline-none"
                            />
                            <div className="flex items-center w-20">
                                <Label htmlFor="adv_search" className="mr-2">Pro</Label>
                                <Switch id="adv_search" />
                            </div>
                            <button className="w-12 mx-2" onClick={() => setIsOpen(false)}>
                                <Image src="/icons/close.png" width={26} height={20} alt='close' className="invert-[80%]"/>
                            </button>
                    </div>
                    <hr />
                    {/* //Todo: Implement Pro serach */}
                    <div className="flex flex-col text-sm text-left my-2">
                        {searchParam.length > 0 && (
                            searchResults.map(result => (
                                <Link key={result._id} href={`/home/movie/${result._id}`} onClick={() => removeSpinner(result._id)}>
                                    <div onClick={() => handleLoading(result._id)} className="py-3 pl-8 hover:bg-[hsl(var(--muted))] mx-2 rounded-md">
                                    {loading[result._id] && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                                    {result.title}
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
