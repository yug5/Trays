import React from "react";
import Image from "next/image";
export default function Profile() {
  return (
    <div className="relative  md:fixed  md:scale-100 scale-75 md:top-4 md:right-8   rounded-full  z-50">
      <button className="text-black flex flex-col items-center justify-center rounded">
        <Image src="/pfp.png" alt="Profile" width={50} height={50} />
        <p className="text-xl text-black font-bold mt-4">user</p>
      </button>
    </div>
  );
}
