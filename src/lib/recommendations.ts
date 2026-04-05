import type { UserProfile } from "./user-profile";
import { TOOLS, type Tool } from "./tools-registry";

// Priority-weighted tool recommendations based on profile.
// Returns tools sorted by relevance score, filtered to live ones.

interface Scored { tool: Tool; score: number; reason: string; }

export function getRecommendedTools(profile: UserProfile, limit = 6): Scored[] {
  const scores = new Map<string, { score: number; reason: string }>();

  const bump = (slug: string, delta: number, reason: string) => {
    const existing = scores.get(slug);
    if (existing) {
      existing.score += delta;
      // keep the first (most specific) reason
    } else {
      scores.set(slug, { score: delta, reason });
    }
  };

  // ── GOALS ──
  if (profile.goals.includes("lose-weight")) {
    bump("calorie-calculator", 10, "Matches your weight-loss goal");
    bump("calorie-deficit", 10, "Plan your weight loss timeline");
    bump("ideal-weight", 8, "See your healthy weight range");
    bump("fasting-timer", 7, "Intermittent fasting aids weight loss");
    bump("body-fat-calculator", 6, "Track body composition");
  }
  if (profile.goals.includes("build-muscle")) {
    bump("protein-calculator", 10, "Protein targets for muscle gain");
    bump("calorie-calculator", 9, "Calorie surplus for muscle");
    bump("body-fat-calculator", 7, "Track lean mass");
    bump("fitness-age", 6, "Benchmark your fitness");
  }
  if (profile.goals.includes("better-sleep")) {
    bump("sleep-score", 10, "Assess your sleep quality");
    bump("eye-strain", 6, "Screen habits affect sleep");
  }
  if (profile.goals.includes("less-stress")) {
    bump("mood-tracker", 10, "Log & track mood patterns");
    bump("sleep-score", 7, "Sleep protects against stress");
    bump("biological-age", 6, "Stress ages your body");
  }
  if (profile.goals.includes("eat-healthier")) {
    bump("food-nutrition", 10, "Look up foods instantly");
    bump("thali-builder", 9, "Build balanced Indian meals");
    bump("protein-calculator", 6, "Hit your protein target");
    bump("hydration", 5, "Daily water planner");
  }
  if (profile.goals.includes("track-health")) {
    bump("water-tracker", 9, "Daily hydration log");
    bump("mood-tracker", 8, "Daily mood check-in");
    bump("fasting-timer", 6, "Track fasting streaks");
  }

  // ── CONDITIONS ──
  if (profile.conditions.includes("diabetes")) {
    bump("diabetes-risk", 10, "Monitor your diabetes risk factors");
    bump("thali-builder", 9, "Diabetes-friendly meal builder");
    bump("food-nutrition", 8, "Check sugar & carbs in foods");
    bump("calorie-calculator", 6, "Manage weight with diabetes");
  }
  if (profile.conditions.includes("hypertension")) {
    bump("heart-risk", 10, "Your heart attack risk");
    bump("thali-builder", 8, "Low-sodium meal planning");
    bump("biological-age", 7, "BP affects biological age");
  }
  if (profile.conditions.includes("heart-disease")) {
    bump("heart-risk", 10, "Your 10-year risk");
    bump("heart-rate-zones", 9, "Safe exercise zones");
    bump("smoking-cost", 8, "If you smoke — quit now");
    bump("thali-builder", 7, "Heart-healthy meals");
  }
  if (profile.conditions.includes("thyroid")) {
    bump("biological-age", 8, "Thyroid affects metabolism");
    bump("bmi", 7, "Track weight changes");
  }
  if (profile.conditions.includes("pcos")) {
    bump("period-tracker", 10, "Track irregular cycles");
    bump("bmi", 9, "Weight management helps PCOS");
    bump("calorie-calculator", 8, "Manage PCOS with diet");
    bump("thali-builder", 7, "Low-GI meal planner");
  }
  if (profile.conditions.includes("asthma")) {
    bump("eye-strain", 4, "Reduce indoor triggers");
  }
  if (profile.conditions.includes("high-cholesterol")) {
    bump("heart-risk", 10, "Cholesterol drives heart risk");
    bump("thali-builder", 8, "Low-fat meal planner");
    bump("body-fat-calculator", 6, "Track body fat %");
  }

  // ── AGE ──
  if (profile.age >= 40) {
    bump("heart-risk", 8, "Heart checks matter after 40");
    bump("diabetes-risk", 7, "Diabetes risk rises after 40");
    bump("biological-age", 6, "Age vs fitness");
  }
  if (profile.age >= 50) {
    bump("biological-age", 8, "Track healthy aging");
    bump("fitness-age", 7, "Maintain fitness");
    bump("bmi", 5, "Stay in healthy range");
  }
  if (profile.age < 30) {
    bump("fitness-age", 6, "Build good habits early");
    bump("sleep-score", 5, "Sleep matters for youth too");
  }

  // ── GENDER ──
  if (profile.gender === "female") {
    bump("period-tracker", 8, "Cycle tracking");
    if (profile.age >= 20 && profile.age <= 45) {
      bump("due-date", 5, "Pregnancy planning");
      bump("pregnancy-weight", 3, "Weight gain guidance");
    }
  }

  // ── EXERCISE LEVEL ──
  if (profile.exercise === "never" || profile.exercise === "sometimes") {
    bump("fitness-age", 8, "See where you stand today");
    bump("sitting-calculator", 7, "Sitting is the new smoking");
  }
  if (profile.exercise === "regular" || profile.exercise === "daily") {
    bump("heart-rate-zones", 7, "Train in the right zone");
    bump("protein-calculator", 6, "Fuel your workouts");
  }

  // ── BMI-based ──
  const bmi = profile.heightCm && profile.weightKg
    ? profile.weightKg / ((profile.heightCm / 100) ** 2)
    : 0;
  if (bmi > 0 && bmi >= 25) {
    bump("calorie-deficit", 7, "BMI in overweight range");
    bump("bmi", 5, "Track your progress");
  }

  // Filter to live tools + sort
  const result: Scored[] = [];
  for (const [slug, { score, reason }] of scores) {
    const tool = TOOLS.find((t) => t.slug === slug && t.status === "live");
    if (tool) result.push({ tool, score, reason });
  }
  result.sort((a, b) => b.score - a.score);
  return result.slice(0, limit);
}
