// 4 classic ideal-weight formulas (Devine, Robinson, Miller, Hamwi)
// Input is metric (cm/kg); internally converts to inches.

export type Gender = "male" | "female";

export interface IdealWeightResult {
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
  min: number;
  max: number;
  average: number;
}

export function calculateIdealWeight(
  heightCm: number,
  gender: Gender
): IdealWeightResult {
  const inches = heightCm / 2.54;
  const over60 = Math.max(0, inches - 60);

  const devine =
    gender === "male" ? 50 + 2.3 * over60 : 45.5 + 2.3 * over60;
  const robinson =
    gender === "male" ? 52 + 1.9 * over60 : 49 + 1.7 * over60;
  const miller =
    gender === "male" ? 56.2 + 1.41 * over60 : 53.1 + 1.36 * over60;
  const hamwi =
    gender === "male" ? 48 + 2.7 * over60 : 45.5 + 2.2 * over60;

  const arr = [devine, robinson, miller, hamwi];
  const min = +Math.min(...arr).toFixed(1);
  const max = +Math.max(...arr).toFixed(1);
  const average = +(arr.reduce((s, v) => s + v, 0) / 4).toFixed(1);

  return {
    devine: +devine.toFixed(1),
    robinson: +robinson.toFixed(1),
    miller: +miller.toFixed(1),
    hamwi: +hamwi.toFixed(1),
    min,
    max,
    average,
  };
}

export function weeksToReach(
  currentKg: number,
  targetKg: number,
  kgPerWeek = 0.5
): number {
  return Math.abs(Math.round((currentKg - targetKg) / kgPerWeek));
}
