// app/lib/getJournalInsights.ts
export async function getJournalInsights(content: string, mood: string) {
  const prompt = `
Journal Entry: ${content}
Mood: ${mood}

Give me a valid JSON response only. Do not include any explanation.
Format:
{
  "suggestion": ["...", "...", "..."], 
  "quote": ["Quote Text", "Author"], 
  "song": ["Song Name" , "Artist"]
}
`;

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-tiny",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that only returns valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await response.json();

  try {
    const content = data.choices[0].message.content.trim();

    console.log("Raw Mistral response:", content); // 🧠 Check output in terminal

    // Optional: sanitize and extract JSON only
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");
    const json = content.slice(jsonStart, jsonEnd + 1);

    const result = JSON.parse(json);
    return result;
  } catch (error) {
    console.error("Error parsing Mistral response:", error);
    return {
      suggestion: ["Stay positive", "Take a deep breath", "Smile more"],
      quote: ["This too shall pass.", "Unknown"],
      song: ["Luka Chippi", " Seedhe Maut"],
    };
  }
}
