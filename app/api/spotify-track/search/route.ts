// /app/api/spotify-track/search/route.ts

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url || "");
  const song = searchParams.get("song");
  const artist = searchParams.get("artist");

  if (!song || !artist) {
    return NextResponse.json(
      { error: "Missing query params" },
      { status: 400 }
    );
  }

  // STEP 1: Get Spotify Token
  const authRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const authData = await authRes.json();

  if (!authData.access_token) {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }

  const accessToken = authData.access_token;

  // STEP 2: Search for the track
  const searchRes = await fetch(
    `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(
      song
    )}+artist:${encodeURIComponent(artist)}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const searchData = await searchRes.json();
  const track = searchData.tracks?.items?.[0];

  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      url: track.external_urls.spotify,
      image: track.album.images?.[0]?.url || "",
    },
    { status: 200 }
  );
}
