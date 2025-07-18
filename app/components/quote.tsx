import React from "react";
type QuoteProps = {
  quote: string[];
};
function splitQuoteAndAuthor(text: string): [string, string] {
  const separators = [" - ", " — ", " – ", "--", "—", "–", "-"];
  for (const sep of separators) {
    const idx = text.lastIndexOf(sep);
    if (idx !== -1) {
      const quote = text
        .slice(0, idx)
        .trim()
        .replace(/^["']|["']$/g, "");
      const author = text.slice(idx + sep.length).trim();
      return [quote, author];
    }
  }
  return [text.trim(), "Unknown"];
}

export default function Quote({ quote }: QuoteProps) {
  const [q, author] = splitQuoteAndAuthor(quote[0]);

  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400 p-4 flex flex-col justify-between">
      <h1 className="text-4xl mx-auto mt-3 font-bold text-gray-700 mb-4">
        Quote of the Day
      </h1>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-gray-500 text-2xl mb-4 w-[90%] h-[90%] overflow-y-auto  rounded-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-xl font-bold text-gray-700 mb- 4 p-5">{q}</h1>
            <p className="text-lg text-gray-600 text-end justify-end mb-3 p-5">
              - {author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
