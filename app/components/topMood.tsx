import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getEmoji } from "./getEmoji";

type MoodCount = { mood: string; count: number };

export default function TopMood() {
  const [moodStats, setMoodStats] = useState<MoodCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMonthMoods() {
      setLoading(true);
      const month = dayjs().format("YYYY-MM");
      const res = await fetch(`/api/journal?month=${month}`);
      const data = await res.json();
      const moods: Record<string, number> = {};
      if (Array.isArray(data.journals)) {
        data.journals.forEach((j: any) => {
          if (j.mood) {
            moods[j.mood] = (moods[j.mood] || 0) + 1;
          }
        });
      }
      // Convert to array and sort by count desc
      const sorted = Object.entries(moods)
        .map(([mood, count]) => ({ mood, count }))
        .sort((a, b) => b.count - a.count);
      setMoodStats(sorted);
      setLoading(false);
    }
    fetchMonthMoods();
  }, []);

  const topMood = moodStats[0];
  const othersCount =
    moodStats.length > 4
      ? moodStats.slice(4).reduce((sum, m) => sum + m.count, 0)
      : 0;

  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-4xl text-gray-700 text-center font-bold mb-4">
          Top Mood
        </h2>
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading...</p>
        ) : topMood ? (
          <>
            <p className="text-9xl text-center mt-10">
              {getEmoji(topMood.mood)}
            </p>
            <p className="text-2xl text-center m-5 text-gray-600">
              Your top mood is <span className="font-bold">{topMood.mood}</span>{" "}
              ({topMood.count} times)
            </p>
            <ul className="list-none mt-10 text-xl flex flex-col items-center text-gray-600">
              {moodStats.slice(1, 4).map((m, i) => (
                <li key={m.mood} className="mb-2 flex items-center gap-2">
                  <span className="text-3xl">{getEmoji(m.mood)}</span>
                  <span className="ml-2">
                    {i + 2}nd: {m.mood} ({m.count})
                  </span>
                </li>
              ))}
              {othersCount > 0 && (
                <li className="mt-2 text-gray-500">Others: {othersCount}</li>
              )}
            </ul>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No moods found for this month.
          </p>
        )}
      </div>
    </div>
  );
}
