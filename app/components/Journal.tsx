import React from "react";

type JournalProps = {
  content?: string;
};
export default function Journal({ content }: JournalProps) {
  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400  flex flex-col justify-between">
      <h1 className="text-4xl mx-auto mt-8 font-bold text-gray-700 mb-4">
        Journal
      </h1>
      <div className="flex flex-col items-center justify-center h-full">
        <div
          className="text-gray-500 text-2xl mb-4 w-[90%] h-[90%] overflow-y-auto   outline-double outline-4 outline-gray-300 rounded-lg "
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        >
          {content ? (
            <div className="flex flex-col items-start  justify-start h-[400px] md:h-[600px]">
              <p className="whitespace-pre-wrap  text-lg text-gray-500 mb-8 p-2 md:p-6">
                {content || "No Content"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-4xl font-bold text-gray-700 mb-4  p-5">
                Welcome to Trays
              </h1>
              <p className="text-lg text-gray-600 mb-8 p-5">
                Your personal space for thoughts and ideas
              </p>
              <p className="text-sm text-gray-500 mb-4 p-5">
                Click the ✍︎ button to start writing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
