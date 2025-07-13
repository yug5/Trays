import React from "react";

export default function Quote() {
  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400 p-4 flex flex-col justify-between">
      <h1 className="text-4xl mx-auto mt-3 font-bold text-gray-700 mb-4">
        Quote of the Day
      </h1>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-gray-500 text-2xl mb-4 w-[90%] h-[90%] overflow-y-auto  rounded-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-xl font-bold text-gray-700 mb- 4 p-5">
              "The only limit to our realization of tomorrow is our doubts of
              today."
            </h1>
            <p className="text-lg text-gray-600 text-end justify-end mb-8 p-5">
              - Franklin D. Roosevelt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
