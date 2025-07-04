import React from "react";

export default function Streak() {
  return (
    <div className="relative md:fixed mt-2 md:mt-1 md:scale-100 scale-75 md:top-4 md:left-8   rounded-full  z-50">
      <div className=" text-2xl rounded-full p-3 outline outline-orange-500 ">
        🔥
      </div>
      <p className="text-black text-md text-center">20 </p>
    </div>
  );
}
