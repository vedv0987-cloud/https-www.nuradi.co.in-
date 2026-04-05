// Fitness Age — scores 5 metrics against age benchmarks
// Adapted from the NTNU Fitness Calculator research

export type Gender = "male" | "female";

export interface FitnessInputs {
  age: number;
  gender: Gender;
  restingHR: number; // BPM
  pushupsPerMin: number;
  canTouchToes: "yes" | "no";
  kmWalkMinutes: number; // time to walk 1 km
  exerciseHoursPerWeek: number;
}

// Age benchmark tables (simplified)
// Returns "fitness years" — how many years younger/older each metric suggests
function scoreRestingHR(hr: number): number {
  // Lower = younger. 60 or below ≈ elite. 100+ ≈ poor.
  if (hr <= 55) return -12;
  if (hr <= 60) return -8;
  if (hr <= 65) return -4;
  if (hr <= 70) return 0;
  if (hr <= 75) return 2;
  if (hr <= 85) return 6;
  if (hr <= 95) return 10;
  return 15;
}

function scorePushups(count: number, age: number, gender: Gender): number {
  // Expected pushups per minute by age
  const baseline = gender === "male"
    ? age < 30 ? 30 : age < 40 ? 25 : age < 50 ? 20 : age < 60 ? 15 : 10
    : age < 30 ? 20 : age < 40 ? 16 : age < 50 ? 12 : age < 60 ? 8 : 5;
  const ratio = count / baseline;
  if (ratio >= 1.5) return -8;
  if (ratio >= 1.2) return -5;
  if (ratio >= 1.0) return 0;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.5) return 6;
  return 10;
}

function scoreFlexibility(canTouch: "yes" | "no"): number {
  return canTouch === "yes" ? -3 : 3;
}

function scoreWalkPace(minutes: number): number {
  // 1 km in minutes. <10 = excellent. >15 = slow.
  if (minutes <= 8) return -8;
  if (minutes <= 10) return -4;
  if (minutes <= 12) return 0;
  if (minutes <= 14) return 3;
  if (minutes <= 16) return 6;
  return 10;
}

function scoreExercise(hours: number): number {
  if (hours >= 7) return -6;
  if (hours >= 5) return -3;
  if (hours >= 3) return 0;
  if (hours >= 1) return 3;
  return 7;
}

export interface FitnessResult {
  actualAge: number;
  fitnessAge: number;
  diff: number; // negative = younger, positive = older
  breakdown: { name: string; points: number; good: boolean }[];
}

export function calculateFitnessAge(i: FitnessInputs): FitnessResult {
  const breakdown = [
    { name: "Resting Heart Rate", points: scoreRestingHR(i.restingHR), good: i.restingHR <= 70 },
    { name: "Pushups/Minute", points: scorePushups(i.pushupsPerMin, i.age, i.gender), good: scorePushups(i.pushupsPerMin, i.age, i.gender) <= 0 },
    { name: "Flexibility (Toe Touch)", points: scoreFlexibility(i.canTouchToes), good: i.canTouchToes === "yes" },
    { name: "Walk Pace (1 km)", points: scoreWalkPace(i.kmWalkMinutes), good: i.kmWalkMinutes <= 12 },
    { name: "Weekly Exercise", points: scoreExercise(i.exerciseHoursPerWeek), good: i.exerciseHoursPerWeek >= 3 },
  ];
  const totalAdjustment = breakdown.reduce((sum, b) => sum + b.points, 0);
  const fitnessAge = Math.max(15, Math.round(i.age + totalAdjustment));
  return {
    actualAge: i.age,
    fitnessAge,
    diff: fitnessAge - i.age,
    breakdown,
  };
}
