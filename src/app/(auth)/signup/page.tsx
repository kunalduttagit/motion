'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLottie } from "lottie-react";
import animationData from '../../../../public/lottie/a2.json';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Signup() {
    const options = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const { View } = useLottie(options);

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false,
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (
            user.username.length > 0 &&
            user.password.length > 0 &&
            user.email.length > 0 &&
            user.confirmPassword.length > 0 &&
            user.termsAndConditions
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(false);
        }
    }, [user]);

    const signupHandler = async (e: any) => {
        e.preventDefault();
        const { email, password, confirmPassword, username, termsAndConditions } = user;

        if (!email || !password || !username) {
            alert('Please enter all details');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!termsAndConditions) {
            alert('Please accept the terms and conditions');
            return;
        }

        const config = {
            headers: {
                'content-type': 'application/json',
            },
        };

        try {
            setLoading(true);
            const { data } = await axios.post(
                '/api/auth/signup',
                { email: user.email, password: user.password, username: user.username },
                config
            );
            router.push('/home')

        } catch (error: any) {
             if (error.response && error.response.status === 409) {
                 // User already exists
                 alert('You already have an account. Try login instead.');
                 router.push('/login');
             } else {
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
        <div className='bg-[rgb(250,250,250)] max-md:w-full lg:w-[40%] h-screen text-black'>
            <div className='flex flex-col h-full justify-start items-center'>

                <div className='p-10 w-full md:w-3/4 flex flex-col items-center'>
                    <img src='/icons/logo.png' className='w-16 h-auto my-[4vh] brightness-0' />
                    <h1 className='text-3xl font-semibold'>Create your account</h1>
                    <p className='mt-2 text-gray-500'>Welcome to Motion</p>
                    <form className='lex justify-center items-start flex-col w-full mt-12'>
                    <label htmlFor='username' className='mb-1'>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={user.username}
                        onChange={e => setUser({ ...user, username: e.target.value })}
                        className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                        placeholder='kunaldutta'
                    />

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
                        className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                        placeholder='••••••••••'
                    />

                    <label htmlFor='confirmPassword' className='mb-1'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        name='confirmPassword'
                        value={user.confirmPassword}
                        onChange={e => setUser({ ...user, confirmPassword: e.target.value })}
                        className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                        placeholder='••••••••••'
                    />

                    <label htmlFor='termsAndConditions' className='mb-1'>
                        <input
                            type='checkbox'
                            name='termsAndConditions'
                            checked={user.termsAndConditions}
                            onChange={e => setUser({ ...user, termsAndConditions: e.target.checked })}
                        />{' '}
                        I accept <Dialog>
                            <DialogTrigger>
                                <p className='font-semibold hover:underline'>Privacy Policy</p>
                            </DialogTrigger>
                            <DialogContent>
                                
                                <DialogHeader>
                                
                                <DialogDescription>
                                <div className=" p-6 rounded-lg text-white h-[60vh] overflow-y-scroll">
                                    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                                    <p className="mb-4">Effective Date: 24/02/2024</p>
                                    <p className="mb-4">Welcome to Motion, a web application developed by Kunal Dutta, CEO at Kunal.co, situated in Indore, IN. This Privacy Policy outlines how we collect, use, store, and safeguard your personal data when you use our web application.</p>

                                    <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
                                    <p className="mb-4">We collect the following types of information:</p>
                                    <ul className="list-disc list-inside mb-4">
                                        <li>Personal Information:Email address, and username.</li>
                                        <li>Usage Data: Information on how you use our application, including your interactions and preferences.</li>
                                    </ul>

                                    <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                                    <p className="mb-4">We use the collected information for the following purposes:</p>
                                    <ul className="list-disc list-inside mb-4">
                                        <li>To provide and maintain our service.</li>
                                        <li>To notify you about changes to our service.</li>
                                        <li>To provide customer support.</li>
                                        <li>To gather analysis or valuable information so that we can improve our service.</li>
                                        <li>To monitor the usage of our service.</li>
                                    </ul>

                                    <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
                                    <p className="mb-4">We take the security of your data seriously and implement appropriate measures to protect it. All personal data is encrypted and stored securely. We use industry-standard security protocols to safeguard your information.</p>

                                    <h2 className="text-2xl font-semibold mb-2">4. Data Sharing</h2>
                                    <p className="mb-4">We do not share your personal data with third parties except as necessary to provide our services or as required by law.</p>

                                    <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
                                    <p className="mb-4">You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at [Insert Contact Email].</p>

                                    <h2 className="text-2xl font-semibold mb-2">6. Changes to This Privacy Policy</h2>
                                    <p className="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                                    <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
                                    <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                                    <ul className="list-disc list-inside mb-4">
                                        <li>Email: kunalduttaedu@gmail.com</li>
                                        <li>Instagram: @_kunaldutta</li>
                                    </ul>

                                    <p className="mb-4">Thank you for using Motion. We are committed to protecting your privacy and ensuring a safe and secure user experience.</p>
                                    </div>
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="button">
                                        I understand
                                        </Button>
                                    </DialogClose>
                                    </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </label>

                    <button
                        onClick={signupHandler}
                        className='w-full my-4 bg-black rounded-md py-4 text-white hover:bg-black/90 font-semibold'
                        disabled={buttonDisabled ? true : false}
                    >
                        {loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : 'Sign up'}
                    </button>
                </form>

                </div>
                <div className='text-gray-600 w-full flex justify-center'>
                    Already have an account??{' '}
                    <Link href='/login' className='text-black font-semibold ml-1'>
                        Login
                    </Link>
                </div>
            </div>
        </div>

        <div className='w-[60%] h-screen flex justify-center items-center rounded-md max-md:hidden'>
                <div className='w-[70vh] rounded-3xl overflow-hidden'>{View}</div>
        </div>
        
    </div>
    );
}
