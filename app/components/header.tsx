import React, { useState , useEffect } from 'react'
import Image from 'next/image'
export default function Header() {
    const [loaded , setLoaded] = useState(false);
    useEffect(()=>{
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);
  return (
    <div className={`fixed left-1/2  ${loaded ? "top-0 scale-100": "top-1/2 scale-150  -translate-y-1/2" } 
    -translate-x-1/2 z-50 transition-all duration-700 ease-in-out`}>
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
    </div>
  )
}
