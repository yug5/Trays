"use client"
import { useEffect, useRef, useState} from "react";
import Header from "./components/header";
import Write from "./components/write";
export default function Home() {
  const [loaded , setLoaded] = useState(false);
      useEffect(()=>{
          const timer = setTimeout(() => {
              setLoaded(true);
          }, 100);
          return () => clearTimeout(timer);
      }, []);
  const darkGridRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;

    if (darkGridRef.current) {
      darkGridRef.current.style.setProperty("--x", x);
      darkGridRef.current.style.setProperty("--y", y);
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
  return (
    <div className="relative min-h-screen bg-white  ">

    <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[length:32px_32px]">

      <div ref={darkGridRef} className=" hidden md:block pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[length:32px_32px] mask-radial-highlight"></div>
          
      <Header/>
      <button className="fixed bottom-6 right-6 md:bottom-16  md:right-16 z-50 bg-gray-800 text-white p-7 text-3xl rounded-full shadow-lg hover:bg-gray-900 transition duration-200 " onClick={() => document.getElementById('add')?.classList.remove('hidden')}>✍︎</button>
      <Write/>
    </div>
    </div>
  );
}
