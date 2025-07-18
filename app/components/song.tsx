import React, { useState, useEffect } from "react";
type MoodProps = {
  name: string;
  artist: string;
};
export default function Song({ name, artist }: MoodProps) {
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [spotifyPoster, setSpotifyPoster] = useState("");
  const fetchSpotifyTrack = async (song: string, artist: string) => {
    try {
      const res = await fetch(
        `/api/spotify-track/search?song=${encodeURIComponent(
          song
        )}&artist=${encodeURIComponent(artist)}`
      );

      const text = await res.text();
      console.log("Raw API response:", text); // ✅ log raw response

      if (!res.ok) {
        console.error("Response not OK:", res.status);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse JSON:", err, "Raw text:", text);
        return;
      }

      console.log("Spotify API Parsed Response:", data);

      if (data && data.url && data.image) {
        setSpotifyUrl(data.url);
        setSpotifyPoster(data.image);
      } else {
        console.warn("Missing song poster or url in response");
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
  };

  useEffect(() => {
    fetchSpotifyTrack(name, artist);
  }, [name, artist]);

  return (
    <div className="bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400 p-5 flex flex-col ">
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-3xl mx-auto mt-3 font-bold text-gray-700 mb-4">
          Spotify Suggestion
        </h1>
      </div>
      <div className="text-gray-500 hover:scale-105 shadow-lg hover:shadow-slate-500 duration-300 text-2xl m-4 mx-auto w-[90%] h-[60%] outline-double outline-4 outline-gray-400 rounded-lg">
        {spotifyPoster && (
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <img
              src={spotifyPoster}
              alt="Spotify Track Poster"
              className="rounded-lg w-full  h-full my-auto mx-auto p-1 object-cover "
            />
          </a>
        )}
      </div>
      <p className="text-lg text-gray-600 text-center ">
        ~ {name} <span className="text-sm text-gray-400">({artist})</span>
      </p>

      <button className="text-4xl text-gray-500 text-center mb-2">
        ─•────
      </button>
      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center"
      >
        <button className="px-6 py-2 mx-auto outline outline-2 outline-gray-300 text-gray-600  rounded-full hover:bg-gray-100 justify-center items-center transition-colors duration-200">
          ▶︎·၊၊||၊|။|||| |
        </button>
      </a>
    </div>
  );
}
