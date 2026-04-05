// Single source of truth for all calculators/tools shown on /tools hub.
// Add new tool → append here → card appears on /tools automatically.

export type ToolCategory =
  | "body-weight"
  | "nutrition"
  | "disease-risk"
  | "womens-health"
  | "lifestyle"
  | "daily-trackers";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string; // emoji
  estimatedTime: string; // "30 sec", "2 min"
  usageCount: string; // "12.5K", "890"
  status: "live" | "coming-soon";
  popular?: boolean;
  isNew?: boolean;
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  "body-weight": "Body & Weight",
  nutrition: "Nutrition",
  "disease-risk": "Disease Risk",
  "womens-health": "Women's Health",
  lifestyle: "Lifestyle",
  "daily-trackers": "Daily Trackers",
};

export const TOOLS: Tool[] = [
  // ── EXISTING 9 TOOLS ──
  {
    slug: "bmi",
    name: "BMI Calculator",
    description: "Check if your weight is healthy for your height.",
    category: "body-weight",
    icon: "⚖️",
    estimatedTime: "30 sec",
    usageCount: "47.2K",
    status: "live",
    popular: true,
  },
  {
    slug: "biological-age",
    name: "Biological Age",
    description: "How old is your body really? Based on 25+ lifestyle factors.",
    category: "lifestyle",
    icon: "🧬",
    estimatedTime: "3 min",
    usageCount: "18.9K",
    status: "live",
    popular: true,
  },
  {
    slug: "sleep-score",
    name: "Sleep Score",
    description: "Rate your sleep quality and get personalized tips.",
    category: "daily-trackers",
    icon: "🌙",
    estimatedTime: "1 min",
    usageCount: "22.1K",
    status: "live",
    popular: true,
  },
  {
    slug: "gut-health",
    name: "Gut Health Check",
    description: "Assess your digestive health from daily symptoms.",
    category: "disease-risk",
    icon: "🫃",
    estimatedTime: "2 min",
    usageCount: "14.8K",
    status: "live",
  },
  {
    slug: "mood-tracker",
    name: "Mood Tracker",
    description: "Log your mood, spot patterns, improve mental health.",
    category: "daily-trackers",
    icon: "😊",
    estimatedTime: "15 sec",
    usageCount: "31.4K",
    status: "live",
  },
  {
    slug: "water-tracker",
    name: "Water Tracker",
    description: "Track daily hydration and hit your water goal.",
    category: "daily-trackers",
    icon: "💧",
    estimatedTime: "10 sec",
    usageCount: "28.3K",
    status: "live",
  },
  {
    slug: "food-nutrition",
    name: "Food Nutrition",
    description: "Look up calories, protein, and macros for any food.",
    category: "nutrition",
    icon: "🥗",
    estimatedTime: "20 sec",
    usageCount: "35.6K",
    status: "live",
    popular: true,
  },
  {
    slug: "generic-medicine",
    name: "Generic Medicine Finder",
    description: "Find cheaper generic alternatives to branded drugs.",
    category: "disease-risk",
    icon: "💊",
    estimatedTime: "15 sec",
    usageCount: "41.7K",
    status: "live",
    popular: true,
  },
  {
    slug: "emergency-qr",
    name: "Emergency QR Card",
    description: "Create a medical emergency card with your vitals.",
    category: "lifestyle",
    icon: "🆘",
    estimatedTime: "2 min",
    usageCount: "9.2K",
    status: "live",
  },

  // ── PHASE 1 — HIGH SEARCH VOLUME ──
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator (TDEE)",
    description: "Daily calories you need using Mifflin-St Jeor equation.",
    category: "nutrition",
    icon: "🔥",
    estimatedTime: "1 min",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "protein-calculator",
    name: "Protein Calculator",
    description: "How much protein you need + Indian food chart.",
    category: "nutrition",
    icon: "🥚",
    estimatedTime: "45 sec",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat % Calculator",
    description: "U.S. Navy method + visual estimate.",
    category: "body-weight",
    icon: "💪",
    estimatedTime: "1 min",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "period-tracker",
    name: "Period & Ovulation Tracker",
    description: "Predict next cycle + fertile window + ovulation.",
    category: "womens-health",
    icon: "🌸",
    estimatedTime: "30 sec",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "ideal-weight",
    name: "Ideal Weight Calculator",
    description: "Your target weight range from 4 classic formulas.",
    category: "body-weight",
    icon: "🎯",
    estimatedTime: "30 sec",
    usageCount: "new",
    status: "live",
    isNew: true,
  },

  // ── PHASE 2 — VIRAL ──
  {
    slug: "smoking-cost",
    name: "Smoking Cost Calculator",
    description: "Money + years of life lost to smoking.",
    category: "lifestyle",
    icon: "🚭",
    estimatedTime: "1 min",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "diabetes-risk",
    name: "Diabetes Risk Score",
    description: "Indian-specific 10-question diabetes risk check.",
    category: "disease-risk",
    icon: "🩸",
    estimatedTime: "2 min",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "thali-builder",
    name: "Indian Thali Builder",
    description: "Build a balanced Indian meal, see live nutrition.",
    category: "nutrition",
    icon: "🍽️",
    estimatedTime: "2 min",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "fitness-age",
    name: "Fitness Age Calculator",
    description: "Your actual age vs your fitness age.",
    category: "body-weight",
    icon: "🏃",
    estimatedTime: "2 min",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "vitamin-check",
    name: "Vitamin Deficiency Checker",
    description: "26 symptoms → likely deficiencies + foods.",
    category: "disease-risk",
    icon: "💊",
    estimatedTime: "2 min",
    usageCount: "new",
    status: "live",
    isNew: true,
  },

  // ── PHASE 3 — UTILITY ──
  {
    slug: "due-date",
    name: "Pregnancy Due Date",
    description: "Due date from LMP, conception, or IVF.",
    category: "womens-health",
    icon: "🤰",
    estimatedTime: "20 sec",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "heart-risk",
    name: "Heart Attack Risk",
    description: "10-year heart risk using Framingham score.",
    category: "disease-risk",
    icon: "❤️",
    estimatedTime: "1 min",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "kids-dosage",
    name: "Kids Medicine Dosage",
    description: "Safe dose in ml for common child medicines.",
    category: "disease-risk",
    icon: "👶",
    estimatedTime: "30 sec",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "blood-group",
    name: "Blood Group Compatibility",
    description: "Who can donate to you + baby blood group chart.",
    category: "disease-risk",
    icon: "🩸",
    estimatedTime: "15 sec",
    usageCount: "new",
    status: "live",
    isNew: true,
  },
  {
    slug: "hydration",
    name: "Hydration Calculator",
    description: "Daily water target for your weight + climate.",
    category: "daily-trackers",
    icon: "💧",
    estimatedTime: "30 sec",
    usageCount: "new",
    status: "live",
    isNew: true,
  },

  // ── PHASE 4 — ENGAGEMENT ──
  {
    slug: "fasting-timer",
    name: "Intermittent Fasting Timer",
    description: "Live 16:8 / 18:6 / OMAD countdown + streak.",
    category: "daily-trackers",
    icon: "⏱️",
    estimatedTime: "10 sec",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
  {
    slug: "calorie-deficit",
    name: "Calorie Deficit Planner",
    description: "Calories to cut daily to hit your weight goal.",
    category: "nutrition",
    icon: "📉",
    estimatedTime: "1 min",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
  {
    slug: "eye-strain",
    name: "Eye Strain Score",
    description: "Digital eye strain from your screen habits.",
    category: "lifestyle",
    icon: "👁️",
    estimatedTime: "1 min",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
  {
    slug: "sitting-calculator",
    name: "Sitting Disease Risk",
    description: "Hours sitting vs healthy benchmark.",
    category: "lifestyle",
    icon: "🪑",
    estimatedTime: "30 sec",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
  {
    slug: "alcohol-impact",
    name: "Alcohol Impact Calculator",
    description: "Yearly calories + money + liver risk from alcohol.",
    category: "lifestyle",
    icon: "🍺",
    estimatedTime: "1 min",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },

  // ── PHASE 5 — UNIQUE ──
  {
    slug: "heart-rate-zones",
    name: "Heart Rate Zones",
    description: "Your 5 training zones with Karvonen formula.",
    category: "body-weight",
    icon: "💓",
    estimatedTime: "30 sec",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
  {
    slug: "pregnancy-weight",
    name: "Pregnancy Weight Gain",
    description: "Healthy weekly weight gain by your BMI.",
    category: "womens-health",
    icon: "👶",
    estimatedTime: "30 sec",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
  {
    slug: "insurance-estimate",
    name: "Health Insurance Estimator",
    description: "Estimated premium for your age + coverage.",
    category: "lifestyle",
    icon: "🛡️",
    estimatedTime: "1 min",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
  {
    slug: "urine-color",
    name: "Urine Color Hydration",
    description: "Hydration level from urine color chart.",
    category: "daily-trackers",
    icon: "💧",
    estimatedTime: "5 sec",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
  {
    slug: "poop-check",
    name: "Bristol Stool Checker",
    description: "Gut health from Bristol stool scale.",
    category: "daily-trackers",
    icon: "🚽",
    estimatedTime: "10 sec",
    usageCount: "new",
    status: "coming-soon",
    isNew: true,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory | "all"): Tool[] {
  if (category === "all") return TOOLS;
  return TOOLS.filter((t) => t.category === category);
}

export function getRelatedTools(slug: string, limit = 3): Tool[] {
  const current = getToolBySlug(slug);
  if (!current) return [];
  return TOOLS.filter(
    (t) => t.category === current.category && t.slug !== slug && t.status === "live"
  ).slice(0, limit);
}
