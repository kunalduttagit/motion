"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast"


export function WatchlistButton({ id, watchList, banner=false }: { id: string, watchList: boolean, banner: boolean }) {
    const [inList, setInList] = useState(watchList);
    const { toast } = useToast();

    const watchlistHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            if (inList) {
                await axios.delete(`/api/movie/watchlist?id=${id}`);
                toast({
                  title: "Removed from your list",
                  variant: "fail",
                  duration:3000
                })
            } else {
                await axios.post('/api/movie/watchlist', { movie_id: id });
                toast({
                  title: "Added to your list",
                  variant: "success",
                  duration:3000
                })
            }
            setInList(current => !current)
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
      <div>
          {banner ? (
            <button onClick={watchlistHandler}>
              {inList ? (
                <div className='px-10 py-2 bg-white text-black rounded-md hover:bg-white/80'>Added</div>
              ) : (
                <div className='px-7 py-2 bg-white text-black rounded-md hover:bg-white/80'>Add to list</div>
              )}
            </button>
          ) : (
            <button onClick={watchlistHandler} className='text-lg border-[0.5px] backdrop-filter backdrop-blur-sm bg-opacity-10 hover:bg-blue-600 bg-slate-200 border-gray-600 px-2 py-2 rounded-full'>
              {inList ? (
                <Image src='/icons/postAdd.png' width={20} height={20} alt="Added" className='invert' />
              ) : (
                <Image src='/icons/preAdd.png' width={20} height={20} alt="Add" className='invert' />
              )}
            </button>
          )}
        </div>
    )
}
