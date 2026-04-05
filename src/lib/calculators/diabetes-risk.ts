// Indian Diabetes Risk Score (IDRS) — validated by Madras Diabetes Research Foundation
// + extended with BMI, activity, diet, BP, PCOS factors

export interface DiabetesInputs {
  ageGroup: "<35" | "35-44" | "45-54" | "55-64" | "65+";
  gender: "male" | "female";
  familyHistory: "yes" | "no";
  bmi: "normal" | "overweight" | "obese";
  waistHigh: "yes" | "no"; // M>90cm, F>80cm
  activity: "low" | "moderate" | "high";
  diet: "poor" | "mixed" | "good";
  gestational?: "yes" | "no"; // female only
  bp: "normal" | "high" | "medication";
  pcos?: "yes" | "no"; // female only
}

const SCORES = {
  age: { "<35": 0, "35-44": 1, "45-54": 2, "55-64": 3, "65+": 4 },
  familyHistory: { yes: 3, no: 0 },
  bmi: { normal: 0, overweight: 2, obese: 4 },
  waistHigh: { yes: 3, no: 0 },
  activity: { low: 2, moderate: 1, high: 0 },
  diet: { poor: 2, mixed: 1, good: 0 },
  gestational: { yes: 3, no: 0 },
  bp: { normal: 0, high: 2, medication: 3 },
  pcos: { yes: 2, no: 0 },
};

export interface DiabetesResult {
  score: number;
  maxScore: number;
  category: "Low" | "Moderate" | "High" | "Very High";
  color: string;
  percent: number;
  factors: { name: string; points: number; max: number; action: string }[];
}

export function calculateDiabetesRisk(i: DiabetesInputs): DiabetesResult {
  const factors: { name: string; points: number; max: number; action: string }[] = [
    { name: "Age", points: SCORES.age[i.ageGroup], max: 4, action: "Age is non-modifiable; monitor proactively." },
    { name: "Family History", points: SCORES.familyHistory[i.familyHistory], max: 3, action: "Screen yearly if parent/sibling diabetic." },
    { name: "BMI", points: SCORES.bmi[i.bmi], max: 4, action: "Lose 5-7% body weight (reduces risk by up to 58%)." },
    { name: "Waist Size", points: SCORES.waistHigh[i.waistHigh], max: 3, action: "Reduce belly fat — target <90cm (M) / <80cm (F)." },
    { name: "Physical Activity", points: SCORES.activity[i.activity], max: 2, action: "Walk 30+ min daily — single biggest factor you control." },
    { name: "Diet", points: SCORES.diet[i.diet], max: 2, action: "Cut sugar, white rice, maida. Add fiber & protein." },
    { name: "Blood Pressure", points: SCORES.bp[i.bp], max: 3, action: "Keep BP under 130/80 — tightly linked to diabetes." },
  ];

  if (i.gender === "female") {
    factors.push({ name: "Gestational History", points: SCORES.gestational[i.gestational || "no"], max: 3, action: "Prior gestational diabetes = lifelong screening." });
    factors.push({ name: "PCOS", points: SCORES.pcos[i.pcos || "no"], max: 2, action: "Manage insulin resistance with diet + metformin if prescribed." });
  }

  const score = factors.reduce((sum, f) => sum + f.points, 0);
  const maxScore = factors.reduce((sum, f) => sum + f.max, 0);
  const percent = Math.round((score / maxScore) * 100);

  let category: DiabetesResult["category"];
  let color: string;
  if (percent < 25) { category = "Low"; color = "#10b981"; }
  else if (percent < 50) { category = "Moderate"; color = "#f59e0b"; }
  else if (percent < 75) { category = "High"; color = "#f97316"; }
  else { category = "Very High"; color = "#ef4444"; }

  return { score, maxScore, category, color, percent, factors };
}
