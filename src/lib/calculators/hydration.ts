export type Activity = "low" | "moderate" | "high";
export type Climate = "cool" | "moderate" | "hot";

export interface HydrationInputs {
  weightKg: number;
  activity: Activity;
  climate: Climate;
  exerciseMinutes: number;
  caffeineCups: number;
  pregnant: boolean;
  breastfeeding: boolean;
}

export function calculateHydration(i: HydrationInputs): number {
  let base = i.weightKg * 35; // ml
  const activityBonus = { low: 0, moderate: 200, high: 400 }[i.activity];
  const climateBonus = { cool: 0, moderate: 200, hot: 700 }[i.climate];
  const exerciseBonus = i.exerciseMinutes * 12;
  const caffeineOffset = i.caffeineCups * 100;
  const pregnancyBonus = i.pregnant ? 300 : 0;
  const breastfeedingBonus = i.breastfeeding ? 700 : 0;

  return Math.max(1500, Math.round(base + activityBonus + climateBonus + exerciseBonus + caffeineOffset + pregnancyBonus + breastfeedingBonus));
}
