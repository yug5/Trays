import React, { useState } from "react";

type WriteProps = {
  content: string;
  setContent: (val: string) => void;
  mood: string;
  setMood: (val: string) => void;
  refetchJournal: () => void;
};

export default function Write({
  content,
  setContent,
  mood,
  setMood,
  refetchJournal,
}: WriteProps) {
  const [isSaving, setIsSaving] = useState(false);

  const Close = () => {
    const modal = document.getElementById("add");
    if (modal) {
      modal.classList.add("hidden");
    }
  };

  const handleSave = async () => {
    if (!content) {
      alert("Please write something before saving.");
      return;
    }
    setIsSaving(true);
    const response = await fetch("/api/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, mood }),
    });
    setIsSaving(false);
    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
      return;
    }
    const data = await response.json();
    if (data.journal) {
      alert("Journal entry saved successfully!");
    } else {
      alert("Failed to save journal entry.");
    }
    refetchJournal();
    Close();
  };

  return (
    <div
      id="add"
      className="hidden fixed inset-0 z-40 flex items-center justify-center bg-white bg-opacity-90"
    >
      <div className="md:absolute  md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rounded-[5%] bg-white shadow-2xl w-screen h-screen flex flex-col items-center p-10  md:w-[30%] md:h-[70%] z-50">
        <h1 className="text-3xl  text-gray-700 font-bold">Journal Entry</h1>
        <div className="text-gray-500 text-sm ">~ add to your day</div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full whitespace-pre-wrap m-5 p-5 text-gray-700 bg-gray-100 rounded-lg  outline-dashed outline-gray-300  resize-none focus:outline-gray-400  "
          placeholder="Write your thoughts here..."
        ></textarea>
        <div className="flex justify-end gap-4 w-full mt-5">
          <button
            onClick={handleSave}
            className="bg-green-500   text-white px-4 py-1 rounded-lg hover:bg-green-600 transition duration-200"
            disabled={isSaving}
          >
            {isSaving ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
            ) : (
              "✔"
            )}
          </button>
          <button
            onClick={Close}
            className="bg-red-500  text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200"
          >
            ✗
          </button>
        </div>
      </div>
    </div>
  );
}
