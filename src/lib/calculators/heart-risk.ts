// Simplified Framingham 10-year heart risk
// Reference: NHLBI Framingham Risk Score tables

export type Gender = "male" | "female";

export interface HeartInputs {
  age: number;
  gender: Gender;
  totalChol: number; // mg/dL
  hdl: number; // mg/dL
  systolicBP: number; // mmHg
  onBPMeds: "yes" | "no";
  smoker: "yes" | "no";
  diabetic: "yes" | "no";
}

// Points tables (simplified)
function agePoints(age: number, gender: Gender): number {
  const m = [[20, -9], [35, -4], [40, 0], [45, 3], [50, 6], [55, 8], [60, 10], [65, 11], [70, 12], [75, 13]];
  const f = [[20, -7], [35, -3], [40, 0], [45, 3], [50, 6], [55, 8], [60, 10], [65, 12], [70, 14], [75, 16]];
  const table = gender === "male" ? m : f;
  let pts = table[0][1];
  for (const [cutoff, p] of table) if (age >= cutoff) pts = p;
  return pts;
}

function cholPoints(chol: number, age: number, gender: Gender): number {
  const m = age < 40 ? [[160, 0], [200, 4], [240, 7], [280, 9], [999, 11]]
    : age < 50 ? [[160, 0], [200, 3], [240, 5], [280, 6], [999, 8]]
    : age < 60 ? [[160, 0], [200, 2], [240, 3], [280, 4], [999, 5]]
    : age < 70 ? [[160, 0], [200, 1], [240, 1], [280, 2], [999, 3]]
    : [[160, 0], [200, 0], [240, 0], [280, 1], [999, 1]];
  const f = age < 40 ? [[160, 0], [200, 4], [240, 8], [280, 11], [999, 13]]
    : age < 50 ? [[160, 0], [200, 3], [240, 6], [280, 8], [999, 10]]
    : age < 60 ? [[160, 0], [200, 2], [240, 4], [280, 5], [999, 7]]
    : age < 70 ? [[160, 0], [200, 1], [240, 2], [280, 3], [999, 4]]
    : [[160, 0], [200, 1], [240, 1], [280, 2], [999, 2]];
  const t = gender === "male" ? m : f;
  for (const [c, p] of t) if (chol < c) return p;
  return 0;
}

function hdlPoints(hdl: number): number {
  if (hdl >= 60) return -1;
  if (hdl >= 50) return 0;
  if (hdl >= 40) return 1;
  return 2;
}

function bpPoints(sbp: number, onMeds: boolean, gender: Gender): number {
  const m_off = [[120, 0], [130, 1], [140, 1], [160, 1], [999, 2]];
  const m_on = [[120, 0], [130, 2], [140, 2], [160, 2], [999, 3]];
  const f_off = [[120, 0], [130, 1], [140, 2], [160, 3], [999, 4]];
  const f_on = [[120, 0], [130, 3], [140, 4], [160, 5], [999, 6]];
  const table = gender === "male" ? (onMeds ? m_on : m_off) : (onMeds ? f_on : f_off);
  for (const [c, p] of table) if (sbp < c) return p;
  return 0;
}

function smokerPoints(smoker: boolean, age: number, gender: Gender): number {
  if (!smoker) return 0;
  if (gender === "male") {
    return age < 40 ? 8 : age < 50 ? 5 : age < 60 ? 3 : age < 70 ? 1 : 1;
  }
  return age < 40 ? 9 : age < 50 ? 7 : age < 60 ? 4 : age < 70 ? 2 : 1;
}

function pointsToRisk(points: number, gender: Gender): number {
  // Approximate 10-year risk %
  const m = [[-10, 1], [0, 1], [5, 2], [6, 2], [8, 5], [10, 10], [12, 16], [14, 25], [16, 30], [999, 30]];
  const f = [[-10, 1], [0, 1], [9, 1], [12, 2], [14, 5], [17, 10], [19, 17], [21, 25], [23, 30], [999, 30]];
  const t = gender === "male" ? m : f;
  for (const [cutoff, r] of t) if (points <= cutoff) return r;
  return 30;
}

export interface HeartRiskResult {
  riskPercent: number;
  category: "Low" | "Moderate" | "High";
  color: string;
  heartAge: number;
  diabeticBonus: boolean;
  modifiable: { name: string; impact: string }[];
}

export function calculateHeartRisk(i: HeartInputs): HeartRiskResult {
  const pts =
    agePoints(i.age, i.gender) +
    cholPoints(i.totalChol, i.age, i.gender) +
    hdlPoints(i.hdl) +
    bpPoints(i.systolicBP, i.onBPMeds === "yes", i.gender) +
    smokerPoints(i.smoker === "yes", i.age, i.gender);

  let risk = pointsToRisk(pts, i.gender);
  if (i.diabetic === "yes") risk = Math.min(60, risk * 2);

  const category: HeartRiskResult["category"] =
    risk < 10 ? "Low" : risk < 20 ? "Moderate" : "High";
  const color = risk < 10 ? "#10b981" : risk < 20 ? "#f59e0b" : "#ef4444";

  // Heart age: approximate by solving for age at which non-smoker/ideal levels match
  const ideal = agePoints(i.age, i.gender) + 0 + 0 + 0 + 0;
  const heartAge = Math.round(i.age + (pts - ideal) * 0.8);

  const modifiable = [];
  if (i.smoker === "yes") modifiable.push({ name: "Quit smoking", impact: "Cuts risk by ~50% within 1 year" });
  if (i.totalChol >= 240) modifiable.push({ name: "Lower cholesterol", impact: "Each 10mg/dL drop = 2% lower risk" });
  if (i.systolicBP >= 140) modifiable.push({ name: "Control BP", impact: "Getting below 130 cuts risk by 25%" });
  if (i.hdl < 40) modifiable.push({ name: "Boost HDL via exercise", impact: "Exercise 30 min/day raises HDL" });
  if (i.diabetic === "yes") modifiable.push({ name: "Control diabetes", impact: "HbA1c <7% halves heart risk" });

  return { riskPercent: risk, category, color, heartAge: Math.max(i.age, heartAge), diabeticBonus: i.diabetic === "yes", modifiable };
}
