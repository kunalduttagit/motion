'use client';

import { Button } from '@/components/ui/button';
import { DesktopWatchlistCard } from '@/components/ui/card';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


import axios from 'axios';
import Image from 'next/image';
import { useRouter, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"


export default function Profile({ params }: any) {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        avatar: 1,
        email: '',
    });
    const [loading, setLoading] = useState(true);
    const [watchlist, setWatchlist] = useState([]);
    const [changeUsername, setChangeUsername] = useState("");
    const [changeEmail, setChangeEmail] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        fetchUser();
        fetchWatchlist();
    }, [user]);

    const handleLogout = (e: any) => {
        try {
            axios.get('/api/auth/logout');
            alert('logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error);
        }
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user');
            if (!data) {
                notFound();
            } else {
                const { username, avatar, email } = data;
                user.username = username;
                user.avatar = avatar;
                user.email = email;
                setChangeEmail(email);
                setChangeUsername(username)
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWatchlist = async () => {
        try {
            const { data } = await axios.get('/api/movie/watchlist/detailedwatchlist');
            setWatchlist(data.movies);

            }  catch (error: any) {
            console.log(error)
        }
    }
    
    const changeUserInfo = async () => {
    	try {
     		if(changeEmail.length == 0) setChangeEmail(user.email);
     		if(changeUsername.length == 0) setChangeUsername(user.username);
       		if(!changeEmail.length && !changeUsername.length) return;
        	console.log(changeEmail, changeUsername)
     		const { data } = await axios.put('/api/user', {newUsername: changeUsername, newEmail: changeEmail});
	            toast({
	            	title: "Success!",
	             	description: "Changes saved successfully.",
	              	duration: 8000
	            })
				user.username = data.username;
				user.email = data.email;
	     } catch (error: any) {
			if (error.response.data.message == 'emailExists') {
                toast({
                	title: "Failed!",
                 	description: "An account with this email already exists. Please log in or use a different email address.",
                  	duration: 10000
                })
            } else if (error.response.data.message === 'usernameExists') {
	            toast({
	            	title: "Failed!",
	             	description: "This username is already taken. Please try again with a different username",
	              	duration: 10000
	            }) 
            }
            else {
				toast({
	            	title: "Error!",
	             	description: error.response.data.error,
	              	duration: 8000
	            })
            }
	     	console.log(error)
	     }
    }
    
    const logoutHandler = async () => {
    	try{
	     	await axios.get('/api/auth/logout');
	      	toast({
	       		title: "See you again :)"
	       })
		   router.push('/')
		 router
	     } catch (error: any){
		     toast({
		    	title: "Sorry!",
		       	description: "There is some problem with our servers at this moment. Please try again after sometime."
	      	 })
	     }
    }

    let imageUrl: string = 'https://image.tmdb.org/t/p/w500/AcoVfiv1rrWOmAdpnAMnM56ki19.jpg'
    let backdropUrl: string = 'https://image.tmdb.org/t/p/w1280/ehumsuIBbgAe1hg343oszCLrAfI.jpg'

    return (
        <main className="h-[100vh] w-full bg-black bg-dot relative">
            <div className="absolute z-[1000] overflow-y-scroll -top-8 md:top-[10%] w-full flex flex-col lg:flex-row justify-center items-center" >
                
                {/* User Profile */}
                <section className='flex justify-center w-screen lg:w-2/5 mx-0 lg:mx-2 mb-10 lg:mb-0'>
                    <div className='background-bur w-full md:w-[90%] flex flex-col justify-between items-center rounded-xl py-8'>
                        <Image src={`/avatar/${user.avatar}.png`} width={480} height={320} alt="Avatar" className='object-cover mb-12 md:rounded-full w-full rounded-b-[50%] md:w-[240px] md:h-[240px] sm:max-md:avatar'/>
                        {/* <p className='text-4xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500'>{user.username}</p> */}
                        <div className='flex w-[90%] flex-col items-center '>
	                        <p className='gif-bg text-6xl md:7xl font-bold'>{user.username}</p>
	                        <p className='pt-2 text-xl sm:text-2xl text-indigo-400'>{user.email}</p>
                        </div>
                        
                        <div className='flex w-full justify-center space-x-6 m-12'>
                          <div className='text-base w-1/3 h-12'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="secondary" className='w-full h-full'>Edit Profile</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit profile</DialogTitle>
                                  <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                      Username
                                    </Label>
                                    <Input id="username" value={changeUsername} defaultValue={user.username} className="col-span-3" placeholder={`@${user.username}`} onChangeCapture={e => setChangeUsername(e.currentTarget.value)}/>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                      Email
                                    </Label>
                                    <Input id="email" value={changeEmail} defaultValue={user.email} placeholder={`${user.email}`} className="col-span-3" onChangeCapture={e => setChangeEmail(e.currentTarget.value)}/>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button onClick={() => changeUserInfo()}>Save changes</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className='text-base w-1/3 h-12'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant='destructive' className='w-full h-full bg-[#b23b3b]' style={{ width: '100%', height: '100%' }}>Logout</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you sure?</DialogTitle>
                                  <DialogDescription>
                                    If you log out now, you will need to enter your login credentials again the next time you visit.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                  <DialogClose asChild>
                                    <div className='flex w-full justify-center md:justify-start'>
                                      <Button type="button" variant="secondary">
                                        Cancel
                                      </Button>
                                      <Button onClick={() => logoutHandler()} type='button' variant="destructive" className='ml-4'>
                                        Logout
                                      </Button>
                                    </div>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>


                    </div>
                </section>

                {/* watchlist */}

                <section className=' z-[20] w-[95%] lg:w-3/5 flex justify-center '>
                    <div className='w-[90%] flex flex-col background-blur rounded-xl'>
                        <p className='text-2xl px-4 my-4 font-bold'>Your List</p>
                        <hr className='border-t-2 border-gray-500'/>
                        <ul className='h-[80vh] divide-y-2 overflow-y-scroll flex flex-col hide-scroll-bar no-scrollbar'>
                            {watchlist?.map((movie : any) => (
                                <li key={movie._id}>
                                    <DesktopWatchlistCard  id={movie._id} imageUrl={movie.pimage} backdropUrl={movie.image} title={movie.title} genres={movie.genres} date={movie.date} language={movie.original_language} runtime={movie.runtime} />
                                </li>
                            ))}
                        </ul>
                    </div>

                </section>

            </div>

        </main>
    );
}

{/* <section className='flex justify-center items-center'>
                    <div className='mr-6 lg:mr-20 mt-4'>
                        <Image src={`/avatars/${user.avatar}.png`} width={120} height={120} alt="Avatar" className='rounded-full lg:w-[180px] lg:h-[180px]'/>
                    </div>
                    <div>
                        <p className='text-4xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500'>{user.username}</p>
                        <p className='pt-2 text-xl sm:text-2xl text-indigo-400'>{user.email}</p>
                    </div>
                </section> */}

{/* <div className='flex justify-around'>

<section className='w-[300px] h-[300px] z-[20] flex flex-col justify-center items-center background-blur rounded-xl'>
    <Image src={`/avatars/${user.avatar}.png`} width={160} height={160} alt="Avatar" className='rounded-full'/>
    <p>{user.username}</p>
    <p>{user.email}</p>
    
</section>

<section className='w-40 h-64 z-[20] flex justify-center items-center background-blur rounded-xl'>

</section>
</div>

<div className='flex justify-center'>
<section className='w-40 h-64 z-[20] flex justify-center items-center background-blur rounded-xl'>

</section>
</div> */}

 {/* <p className='flex flex-col justify-start align-top'>
                Hello {params.username}. If you see same username below. CONGRATULATIONS.
                <button
                    className='bg-red-400 w-20 rounded-md p-3 hover:bg-red-600'
                    type='submit'
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <div className='text-2xl'>
                    {loading ? (
                        'Loading Your Account...'
                    ) : (
                        <p>
                            <p>
                                Hey {user.username}. Your avatar is {user.avatar}
                            </p>
                        </p>
                    )}
                </div>
            </p> */}
