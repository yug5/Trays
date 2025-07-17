export async function getJournalInsights(content: string, mood: string) {
  const prompt = `
Journal Entry: ${content}
Mood: ${mood}

Based on this, give me:
1. One short suggestion of what the person should do today (max 15 words).
2. One motivational quote (1 sentence only).
3. A song recommendation (song name and artist only, mood appropriate).
Return only JSON format with keys: suggestion, quote, song.
`;

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-tiny", // or mistral-small if you prefer
      messages: [
        { role: "system", content: "You are a friendly, mood-aware assistant." },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await response.json();

  try {
    const content = data.choices[0].message.content;
    const result = JSON.parse(content); // expect JSON with suggestion, quote, song
    return result;
  } catch (error) {
    console.error("Error parsing Mistral response:", error);
    return {
      suggestion: "Stay positive and keep moving forward.",
      quote: "This too shall pass.",
      song: "Happy - Pharrell Williams",
    };
  }
}
