'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import animationData from '../../../../public/lottie/a2.json';
import { isMobile } from '@/utils/isMobile';
import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("@/components/ui/loginDynamicLottie"), {
    ssr: false
});

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const loginHandler = async (e: any) => {
        e.preventDefault();
        const { email, password } = user;
        if (!email || !password) {
            alert('Please enter all the fields');
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };

            const { data } = await axios.post('/api/auth/login', user, config);
           router.push('/home/');
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                // User already exists
                alert("You don't have an account. Try signup instead.");
                console.log(error)
                router.push('/signup');
            } else if (error.response?.status === 401) {
                //Wrong password
                alert("You entered an invalid password. Please try again");
            }
            else {
                // Other errors, generic error message
                alert('Something went wrong');
                console.error('API Error:', error.response?.data?.message, error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center bg-black h-screen'>
            <div className='bg-[rgb(250,250,250)] max-md:w-full lg:w-[40%]  h-screen text-black'>
                <div className='flex flex-col h-full justify-around items-center'>

                    <div className='w-full md:w-3/4 p-10 flex flex-col items-center'>
                        <img src='/icons/logo.png' className='w-16 h-auto my-[6vh] brightness-0' />
                        <h1 className='text-4xl font-semibold'>Welcome back</h1>
                        <p className='mt-2 text-gray-500'>Please enter you details</p>
                        <form className='flex justify-center items-start flex-col w-full mt-12'>
                            <label htmlFor='email' className='mb-1'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value })}
                                className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                                placeholder='kunal@motion.com'
                            />

                            <label htmlFor='password' className='mb-1'>
                                Password
                            </label>
                            <input
                                type='password'
                                name='password'
                                value={user.password}
                                onChange={e => setUser({ ...user, password: e.target.value })}
                                className='px-3 py-2 w-full border rounded-md border-gray-300 mb-5'
                                placeholder='••••••••••'
                            />

                            <button
                                onClick={loginHandler}
                                className='w-full my-4 bg-black font-semibold rounded-md py-4 text-white hover:bg-black/90'
                                disabled={buttonDisabled ? true : false}
                            >
                                {loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : 'Sign in'}
                            </button>
                        </form>

                    </div>
                        <div className='text-gray-600 w-full flex justify-center'>
                            Don&apos;t have an account?
                            <Link href='/signup' className='text-black font-semibold ml-1'>
                                Sign up
                            </Link>
                        </div>
                </div>
            </div>

            <div className='w-[60%] h-screen flex justify-center items-center rounded-md max-md:hidden'>
                <div className='w-[70vh] rounded-3xl overflow-hidden'>
                    <LottieAnimation />
                </div>
            </div>
            
        </div>
    );
}