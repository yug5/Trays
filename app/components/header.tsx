import React, { useState , useEffect } from 'react'
import Image from 'next/image'
export default function Header() {
    const [loaded , setLoaded] = useState(false);
    useEffect(()=>{
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);
  return (
    <div className={`fixed left-1/2  ${loaded ? "-top-4 md:top-0 scale-75 md:scale-100 bg-white/50 md:bg-transparent  rounded-[190%]": "top-1/2 scale-150  -translate-y-1/2" } 
    -translate-x-1/2 z-50 transition-all duration-700 ease-in-out`}>
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
    </div>
  )
}
