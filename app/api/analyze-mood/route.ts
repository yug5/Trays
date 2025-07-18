import { NextResponse } from "next/server";
function getMoodInput(text: string) {
  const t = text.trim().replace(/\s+/g, " ");
  const words = t.split(" ");
  const firstPart = words.slice(0, 50);
  const lastPart = words.slice(-20);
  return [...firstPart, ...lastPart].join(" ");
}

export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  try {
    const con = getMoodInput(content);
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: con }),
      }
    );

    const result = await hfRes.json();

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    const topLabel = result[0][0]?.label;
    const topScore = result[0][0]?.score;

    return NextResponse.json({ mood: topLabel, score: topScore });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
