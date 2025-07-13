import React from "react";

export default function song() {
  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400 p-4 flex flex-col justify-between">
      <h1 className="text-2xl font-bold text-center m-2 text-gray-700">
        Spotify suggestion
      </h1>
      <div className="w-[70%] h-[70%] bg-red-300"></div>
    </div>
  );
}
