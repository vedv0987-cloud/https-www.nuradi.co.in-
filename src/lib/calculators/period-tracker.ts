// Period + ovulation cycle predictor.
// LMP = Last Menstrual Period start date.

export type DayType = "period" | "fertile" | "ovulation" | "safe";

export interface CycleInputs {
  lmp: Date; // last period start
  cycleLength: number; // 21-35 days, default 28
  periodLength: number; // 3-7 days, default 5
}

export interface CycleResult {
  nextPeriod: Date;
  ovulation: Date;
  fertileStart: Date;
  fertileEnd: Date;
  periodEnd: Date;
  daysUntilNextPeriod: number;
  daysUntilOvulation: number;
  currentPhase: "menstrual" | "follicular" | "ovulation" | "luteal";
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function daysDiff(a: Date, b: Date): number {
  const MS = 1000 * 60 * 60 * 24;
  return Math.floor((a.getTime() - b.getTime()) / MS);
}

export function calculateCycle(i: CycleInputs): CycleResult {
  const nextPeriod = addDays(i.lmp, i.cycleLength);
  const ovulation = addDays(nextPeriod, -14);
  const fertileStart = addDays(ovulation, -5);
  const fertileEnd = addDays(ovulation, 1);
  const periodEnd = addDays(i.lmp, i.periodLength - 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfLmp = new Date(i.lmp);
  startOfLmp.setHours(0, 0, 0, 0);

  const daysUntilNextPeriod = Math.max(0, daysDiff(nextPeriod, today));
  const daysUntilOvulation = daysDiff(ovulation, today);

  const dayInCycle = daysDiff(today, startOfLmp) % i.cycleLength;
  let currentPhase: CycleResult["currentPhase"];
  if (dayInCycle < i.periodLength) currentPhase = "menstrual";
  else if (dayInCycle < i.cycleLength - 16) currentPhase = "follicular";
  else if (dayInCycle >= i.cycleLength - 16 && dayInCycle <= i.cycleLength - 13)
    currentPhase = "ovulation";
  else currentPhase = "luteal";

  return {
    nextPeriod,
    ovulation,
    fertileStart,
    fertileEnd,
    periodEnd,
    daysUntilNextPeriod,
    daysUntilOvulation,
    currentPhase,
  };
}

// Classify a date across the upcoming cycle
export function classifyDay(
  date: Date,
  lmp: Date,
  cycleLength: number,
  periodLength: number
): DayType {
  const cycleStart = new Date(lmp);
  cycleStart.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  let diff = daysDiff(d, cycleStart);
  if (diff < 0) return "safe";
  diff = diff % cycleLength;

  if (diff < periodLength) return "period";

  const ovulationDay = cycleLength - 14;
  if (diff === ovulationDay) return "ovulation";
  if (diff >= ovulationDay - 5 && diff <= ovulationDay + 1) return "fertile";
  return "safe";
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
