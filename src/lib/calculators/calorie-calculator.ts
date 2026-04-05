// Mifflin-St Jeor TDEE calculator
// https://pubmed.ncbi.nlm.nih.gov/2305711/

export type Gender = "male" | "female";
export type Activity =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extreme";
export type Goal = "lose" | "maintain" | "gain";

export const ACTIVITY_MULTIPLIERS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extreme: 1.9,
};

export const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 500,
};

export interface CalorieInputs {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: Activity;
  goal: Goal;
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  goalCalories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}

export function calculateCalories(i: CalorieInputs): CalorieResult {
  const bmr =
    i.gender === "male"
      ? 10 * i.weightKg + 6.25 * i.heightCm - 5 * i.age + 5
      : 10 * i.weightKg + 6.25 * i.heightCm - 5 * i.age - 161;

  const tdee = bmr * ACTIVITY_MULTIPLIERS[i.activity];
  const goalCalories = tdee + GOAL_ADJUSTMENTS[i.goal];

  // Macro split by goal
  const split: Record<Goal, { p: number; c: number; f: number }> = {
    lose: { p: 0.4, c: 0.3, f: 0.3 },
    maintain: { p: 0.3, c: 0.4, f: 0.3 },
    gain: { p: 0.3, c: 0.45, f: 0.25 },
  };
  const { p, c, f } = split[i.goal];

  const proteinG = Math.round((goalCalories * p) / 4);
  const carbsG = Math.round((goalCalories * c) / 4);
  const fatG = Math.round((goalCalories * f) / 9);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    goalCalories: Math.round(goalCalories),
    proteinG,
    carbsG,
    fatG,
    proteinPct: Math.round(p * 100),
    carbsPct: Math.round(c * 100),
    fatPct: Math.round(f * 100),
  };
}

export function projectWeightWeeks(
  startWeightKg: number,
  dailyDeficit: number,
  weeks = 12
): { week: number; weight: number }[] {
  const kgPerWeek = (dailyDeficit * 7) / 7700;
  return Array.from({ length: weeks + 1 }, (_, w) => ({
    week: w,
    weight: +(startWeightKg - kgPerWeek * w).toFixed(1),
  }));
}
