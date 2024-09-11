'use client';
import SearchComponent from "@/components/ui/search";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

export default function Navbar({children,}: { children: React.ReactNode}) {

  const [navbarColor, setNavbarColor] = useState('transparent');
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState({
    username : "",
    avatar: 1
  })
  const [device, setDevice] = useState({
    mac: true,
    windows: false,
    others: false
  });

  useEffect(() => {
    getOperatingSystem();
    fetchUser();
  }, [])

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user');
     
        const { username, avatar } = data;
        user.username = username;
        user.avatar = avatar;

      } catch (error: any) {
          console.log(error);
      }
  }

  const changeNavbarColor = () => {
    if (window.scrollY + 400 >= window.innerHeight) {
      setNavbarColor('black'); // change to your color
    } else {
      setNavbarColor('transparent');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor);
    return () => {
      window.removeEventListener('scroll', changeNavbarColor);
    };
  }, []);

  const fetchRecs = async () => {
    try {
      const { data } = await axios.get('/api/movie/getRecs');
    } catch (err: any) {
      console.log(err);
    }
  };

  function getOperatingSystem() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'Mac'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE', 'Win'];
      if (macosPlatforms.indexOf(platform) !== -1) {
        device.mac = true;
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        device.windows = true;
        device.mac = false;
      } else {
        device.others = true //iOS and Android
        device.mac = false;
      }

  }

    return (
      <section className="transition ease-linear duration-1000">
       <SearchComponent open={showSearch}/>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav className={` fixed top-0 left-0 right-0  h-20 flex lg:px-20 px-5 items-center justify-between z-[2000] bg-${navbarColor}`}>
            <div>
              <Link href='/home'>
                <img src={'/icons/logo.png'} width={45} alt="m" className="mr-3"/>
              </Link>
            </div>
            <div className="flex space-x-4 lg:space-x-6 w-[60%] lg:w-[20%]">
                <button className="background-blur px-2 rounded-md flex justify-between items-center w-[80%]" onClick={() => {setShowSearch(!showSearch)}}>
                  <div className="flex items-center">
                    <Image src={'/icons/search.png'} alt='Search' width={26} height={20} className="invert-[80%]"/><p className="text-sm text-[hsl(0 0% 30%)]">Search...</p>
                  </div>
                  <div className="flex items-center">
                    {device.mac && <p>⌘</p>}
                    {/* {device.mac && <Image src={'/icons/cmd.png'} alt='Search' width={20} height={10} className="invert-[80%] mr-1"/>} */}
                    {device.windows && <p>Ctrl</p>}
      
                    {(device.mac || device.windows) && <p className="ml-0.5 text-[hsl(0 0% 30%)]">K</p>}
                  </div>
                </button>
                {user && 
                  <div>
                    <Link href="/home/profile/" >
                        <Image src={`/avatar/${user.avatar}.png`} width={64} height={64} alt="Avatar" className='object-cover rounded-full w-11 h-10'/>
                    </Link>

                  </div>
                }
            </div>
        </nav>
   
        {children}
        <Toaster />
      </section>
    )
  }
