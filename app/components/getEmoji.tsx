export function getEmoji(emotion: string): string {
  const map: Record<string, string> = {
    anger: "😡",
    disgust: "🤢",
    fear: "😨",
    joy: "😄",
    neutral: "😐",
    sadness: "🙁",
    surprise: "🫢",
  };

  return map[emotion.toLowerCase()] || "❓";
}
