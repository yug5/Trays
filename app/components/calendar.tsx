"use client";
import React, { useState } from "react";
import dayjs from "dayjs";

type CalendarProps = {
  mood?: string;
};
export default function Calendar({ mood }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();

  const startDay = startOfMonth.day();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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
              className="border  p-2 text-lg  md:pb-12  md:text-2xl hover:bg-gray-100 hover:scale-110 duration-200 hover:rounded-lg cursor-pointer"
              onClick={() =>
                alert(`Clicked ${day} ${currentDate.format("MMMM")}`)
              }
            >
              {day}

              <p className="text-center md:pt-3 m-1 text-sm md:text-xl">😊</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
