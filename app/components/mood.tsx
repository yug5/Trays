import React from "react";
type MoodProps = {
  mood: string;
};
export default function Mood({ mood }: MoodProps) {
  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400 p-5  ">
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-4xl mx-auto mt-3 font-bold text-gray-700 mb-4">
          Todays Vibe
        </h1>
        <div className="flex flex-col items-center justify-start m-5 h-full">
          <p className="text-9xl hover:scale-110 duration-300 ">{mood}</p>
          <p className="text-lg text-gray-600 m-8">Feeling good!</p>
        </div>
      </div>
      <h3 className="text-xl  font-semibold text-gray-700">
        Suggestion for today
      </h3>
      <ul className="text-gray-500 justify-start text-md list-disc mx-6">
        <li>Enjoying the little things</li>
        <li>Staying positive</li>
        <li>Embracing the moment</li>
      </ul>
    </div>
  );
}
