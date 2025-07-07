import React from "react";

export default function Streak() {
  return (
    <div className="relative md:fixed mt-2 md:mt-1 md:scale-100 scale-75 md:top-4 md:left-8   rounded-full  z-50">
      <div className=" text-2xl rounded-full p-3 outline-dotted  outline-orange-500 outline-2 hover:bg-orange-100 transition-all duration-100 text-orange-500 font-bold flex items-center justify-center">
        🔥
      </div>
      <p className="text-black text-md p-2 text-center">20 </p>
    </div>
  );
}
