"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getEmoji } from "./getEmoji";

type CalendarProps = {
  mood?: string;
};
export default function Calendar({ mood }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [journal, setJournal] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editMood, setEditMood] = useState("");
  const [journalsByDay, setJournalsByDay] = useState<{ [key: number]: any }>(
    {}
  );

  const fetchMonthJournals = async () => {
    const res = await fetch(
      `/api/journal?month=${currentDate.format("YYYY-MM")}`
    );
    if (res.ok) {
      const data = await res.json();
      const map: { [key: number]: any } = {};
      if (Array.isArray(data.journals)) {
        data.journals.forEach((j: any) => {
          const day = dayjs(j.date).date();
          map[day] = j;
        });
      }
      setJournalsByDay(map);
    }
  };

  useEffect(() => {
    fetchMonthJournals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();
  const startDay = startOfMonth.day();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDayClick = async (day: number) => {
    setSelectedDay(day);
    setJournal(null);
    setError(null);
    setLoading(true);
    setShowPopup(true);
    setEditMode(false);
    const dateStr = currentDate.date(day).format("YYYY-MM-DD");
    try {
      const res = await fetch(`/api/journal?date=${dateStr}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch journal entry.");
        setLoading(false);
        setJournal(null);
        setEditContent("");
        setEditMood("");
        return;
      }
      setJournal(data.journal); // could be null
      setEditContent(data.journal?.content || "");
      setEditMood(data.journal?.mood || "");
    } catch (err) {
      setError("Error fetching journal entry.");
    }
    setLoading(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setJournal(null);
    setError(null);
    setSelectedDay(null);
    setEditMode(false);
    setEditContent("");
    setEditMood("");
  };

  // Auto-detect mood as user types
  useEffect(() => {
    if (editMode && editContent.trim()) {
      const detectMood = setTimeout(async () => {
        try {
          const res = await fetch("/api/analyze-mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: editContent }),
          });
          const data = await res.json();
          if (data.mood) setEditMood(data.mood);
        } catch {}
      }, 500); // debounce
      return () => clearTimeout(detectMood);
    }
  }, [editContent, editMode]);

  const handleEdit = () => {
    setEditMode(true);
    setEditContent(journal?.content || "");
    setEditMood(journal?.mood || "");
  };

  const handleSaveEdit = async () => {
    if (!selectedDay) return;
    setLoading(true);
    setError(null);
    const dateStr = currentDate.date(selectedDay).format("YYYY-MM-DD");
    try {
      // Always use POST for both add and edit
      const res = await fetch(`/api/journal?date=${dateStr}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent, mood: editMood }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save changes.");
      } else {
        setJournal(data.journal);
        setEditMode(false);
        setError(null);
        await fetchMonthJournals(); // <-- Refetch to update emojis for all days
      }
    } catch {
      setError("Failed to save changes.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white h-full text-gray-700 rounded-2xl outline-dashed outline-3 outline-gray-400 p-4 flex flex-col justify-between">
      <div className="w-full h-full mx-auto p-4 rounded-xl shadow border bg-white">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth}>←</button>
          <h2 className="text-4xl font-bold">
            {currentDate.format("MMMM YYYY")}
          </h2>
          <button onClick={nextMonth}>→</button>
        </div>

        <div className="grid grid-cols-7 text-center text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              className="hover:scale-125 duration-300 cursor-default"
              key={d}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 p-7 px-2 md:text-start text-center">
          {Array.from({ length: startDay }).map((_, i) => (
            <div className="" key={"empty" + i}></div>
          ))}
          {daysArray.map((day) => (
            <div
              key={day}
              className={`border p-2 text-lg md:pb-12 md:text-2xl hover:bg-gray-100 hover:scale-110 duration-200 hover:rounded-lg cursor-pointer ${
                selectedDay === day && showPopup
                  ? "bg-blue-100 outline outline-blue-500"
                  : ""
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day}
              <div className="text-center md:pt-3 m-1 text-sm md:text-xl">
                {journalsByDay[day] ? getEmoji(journalsByDay[day].mood) : ""}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="relative rounded-2xl shadow-2xl border bg-white p-8 w-full max-w-md mx-auto">
            <button
              onClick={closePopup}
              className="absolute top-4 right-6 text-xl text-gray-500 hover:text-black"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-2 text-gray-700">
              Entry for {currentDate.date(selectedDay!).format("YYYY-MM-DD")}
            </h3>
            {loading && <div className="text-gray-500">Loading...</div>}
            {error && (
              <div className="text-red-600 text-sm font-mono">{error}</div>
            )}
            {!editMode && (
              <>
                {journal ? (
                  <div>
                    <div className="mb-2 max-h-48 md:max-h-64 overflow-y-auto text-gray-700 whitespace-pre-line">
                      {journal.content}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      Mood:{" "}
                      <span className="font-semibold">{journal.mood}</span>{" "}
                      <span className="ml-2">{getEmoji(journal.mood)}</span>
                    </div>
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-400 text-center mb-2">
                      No entry for this day.
                    </div>
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      Add Entry
                    </button>
                  </div>
                )}
              </>
            )}
            {editMode && (
              <div
                id="add"
                className=" fixed inset-0 z-50 flex items-center justify-center "
              >
                <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rounded-[5%] bg-white shadow-2xl w-screen h-screen flex flex-col items-center p-10 md:w-[30%] md:h-[70%] z-50">
                  <h1 className="text-3xl text-gray-700 font-bold">
                    Journal Entry
                  </h1>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-full whitespace-pre-wrap m-5 p-5 text-gray-700 bg-gray-100 rounded-lg outline-dashed outline-gray-300 resize-none focus:outline-gray-400"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                  <div className="text-sm text-gray-500 mb-2">
                    Mood: <span className="font-semibold">{editMood}</span>{" "}
                    <span className="ml-2">{getEmoji(editMood)}</span>
                  </div>
                  <div className="flex justify-end gap-4 w-full mt-5">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition duration-200"
                      disabled={!editContent.trim() || !editMood || loading}
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      ✗
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
