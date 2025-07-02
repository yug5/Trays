"use client"
import { useEffect, useRef, useState} from "react";
import Header from "./components/header";
import Write from "./components/write";
import Journal from "./components/Journal";
import Mood from "./components/mood";
import Song from "./components/song";
import Quote from "./components/quote";
export default function Home() {
  const [loaded , setLoaded] = useState(false);
      useEffect(()=>{
          const timer = setTimeout(() => {
              setLoaded(true);
          }, 900);
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


const [activeTab, setActiveTab] = useState("home");
const tabs = [
  { name: "Today's Vibe", id: "home" },
  { name: "About Month", id: "about" },
]
  return (
    <div className="relative min-h-screen bg-white  ">

    <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[length:32px_32px]">

      <div ref={darkGridRef} className=" hidden md:block pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[length:32px_32px] mask-radial-highlight"></div>


      <Header/>
      
      
      
      {loaded && <div  >
      

      <div className="flex items-center mx-auto rounded-full bg-gray-200  justify-center w-fit mt-28 md:mt-40 ">
        {tabs.map((tab) => (
          <button
          key={tab.id}
          className={`px-4 py-2 text-sm md:text-md font-semibold transition-colors duration-200 ${
              activeTab === tab.id
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } rounded-full m-2`}
            onClick={() => setActiveTab(tab.id)}
            >
            {tab.name}
          </button>
        ))}  

      </div>
    {activeTab === "home" && (
  <>
    <div className="hidden md:grid grid-cols-5 grid-rows-5 gap-4 px-32 py-8 min-h-[80vh] w-full z-50">
      <div className="col-span-2 row-span-5"><Journal /></div>
      <div className="col-span-2 row-span-3 col-start-3"><Mood /></div>
      <div className="row-span-3 col-start-5"><Song /></div>
      <div className="col-span-3 row-span-2 col-start-3 row-start-4"><Quote /></div>
    </div>

    <div className="md:hidden flex flex-col gap-6 px-6 py-8 w-full z-50">
      <div><Journal /></div>
      <div><Mood /></div>
      <div><Song /></div>
      <div><Quote /></div>
    </div>
  </>
)}

      
      <button className="fixed bottom-6 right-6 md:bottom-16  md:right-16 z-50 bg-gray-800 text-white md:p-7 p-5 text-3xl rounded-full shadow-lg hover:bg-gray-900 transition duration-200 " onClick={() => document.getElementById('add')?.classList.remove('hidden')}>✍︎</button>
        
        <Write/>
      </div>

      }
      
    </div>
    </div>
            
  );
}



// <div className="flex flex-col items-center justify-center min-h-screen">
//         <h1 className="text-4xl font-bold text-gray-700 mb-4">Welcome to Trays</h1>
//         <p className="text-lg text-gray-600 mb-8">Your personal space for thoughts and ideas</p>
//         <p className="text-sm text-gray-500 mb-4">Click the ✍︎ button to start writing</p></div>