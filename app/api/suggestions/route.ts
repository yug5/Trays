//app/api/suggestions/route.ts
import { NextResponse } from "next/server";
import { getJournalInsights } from "@/app/lib/getJournalInsights.ts";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mood = searchParams.get("mood");
  const content = searchParams.get("content");

  if (!mood || !content) {
    return NextResponse.json(
      { error: "Missing mood or content" },
      { status: 400 }
    );
  }

  try {
    const aiResponse = await getJournalInsights(content, mood);
    return NextResponse.json(aiResponse);
  } catch (err) {
    console.error("Error from Mistral:", err);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
