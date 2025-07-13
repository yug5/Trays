import React from "react";

export default function song() {
  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400 p-5 flex flex-col ">
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-3xl mx-auto mt-3 font-bold text-gray-700 mb-4">
          Spotify Suggestion
        </h1>
      </div>
      <div className="text-gray-500 text-2xl m-4 mx-auto  w-[90%] h-[60%] outline-double outline-4 outline-gray-400 rounded-lg"></div>
      <p className="text-lg text-gray-600 text-center ">~ Song name</p>
      <button className="text-4xl text-gray-500 text-center mb-2">
        ─•────
      </button>
      <button className="px-6 py-2 mx-auto outline outline-2 outline-gray-300 text-gray-600  rounded-full hover:bg-gray-100 justify-center items-center transition-colors duration-200">
        ▶︎·၊၊||၊|။|||| |
      </button>
    </div>
  );
}
