export type Season = "spring" | "summer" | "fall" | "winter";

export function getCurrentSeason(date: Date = new Date()): Season {
  const month = date.getMonth(); // 0 = January, 11 = December

  if (month >= 2 && month <= 4) {
    return "spring";
  }

  if (month >= 5 && month <= 7) {
    return "summer";
  }

  if (month >= 8 && month <= 10) {
    return "fall";
  }

  return "winter";
}