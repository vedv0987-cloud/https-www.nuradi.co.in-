// U.S. Navy body fat percentage formula
// https://www.calculator.net/body-fat-calculator.html

export type Gender = "male" | "female";

export interface BodyFatInputs {
  gender: Gender;
  heightCm: number;
  waistCm: number;
  neckCm: number;
  hipCm?: number; // required for female
  weightKg: number;
}

export function calculateBodyFat(i: BodyFatInputs): number {
  if (i.gender === "male") {
    const bf =
      86.01 * Math.log10(i.waistCm - i.neckCm) -
      70.041 * Math.log10(i.heightCm) +
      36.76;
    return Math.max(2, Math.round(bf * 10) / 10);
  }
  // female
  const hip = i.hipCm || 0;
  const bf =
    163.205 * Math.log10(i.waistCm + hip - i.neckCm) -
    97.684 * Math.log10(i.heightCm) -
    78.387;
  return Math.max(10, Math.round(bf * 10) / 10);
}

export interface BodyFatCategory {
  name: string;
  min: number;
  max: number;
  color: string;
}

export const MALE_RANGES: BodyFatCategory[] = [
  { name: "Essential Fat", min: 2, max: 5, color: "#ef4444" },
  { name: "Athletes", min: 6, max: 13, color: "#10b981" },
  { name: "Fitness", min: 14, max: 17, color: "#22c55e" },
  { name: "Average", min: 18, max: 24, color: "#f59e0b" },
  { name: "Above Average", min: 25, max: 100, color: "#ef4444" },
];

export const FEMALE_RANGES: BodyFatCategory[] = [
  { name: "Essential Fat", min: 10, max: 13, color: "#ef4444" },
  { name: "Athletes", min: 14, max: 20, color: "#10b981" },
  { name: "Fitness", min: 21, max: 24, color: "#22c55e" },
  { name: "Average", min: 25, max: 31, color: "#f59e0b" },
  { name: "Above Average", min: 32, max: 100, color: "#ef4444" },
];

export function getCategory(bf: number, gender: Gender): BodyFatCategory {
  const ranges = gender === "male" ? MALE_RANGES : FEMALE_RANGES;
  return (
    ranges.find((r) => bf >= r.min && bf <= r.max) || ranges[ranges.length - 1]
  );
}

export function getIdealBodyFat(gender: Gender): number {
  return gender === "male" ? 15 : 22;
}
