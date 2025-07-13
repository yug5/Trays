import React from "react";

export default function TopMood() {
  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-4xl text-gray-700 text-center font-bold mb-4">
          Top Mood
        </h2>
        <p className="text-9xl text-center mt-10">😁</p>
        {/* <p className="text-7xl mb-20 text-gray-800 text-center mt-10">X?</p> */}
        <p className="text-2xl text-center m-5  text-gray-600">
          Your top mood is happy!
        </p>
        {/* <p className="text-gray-600 mx-auto text-center text-xl">Top mood's</p> */}
        <ul className="list-disc mt-10 text-3xl flex flex-wrap list-inside text-gray-600">
          <li className="w-1/3 text-center mb-2">😊</li>
          <li className="w-1/3 text-center mb-2">😃</li>
          <li className="w-1/3 text-center mb-2">😌</li>
          <li className="w-1/3 text-center mb-2">🤪</li>
          <li className="w-1/3 text-center mb-2">😌</li>
        </ul>
      </div>
    </div>
  );
}
