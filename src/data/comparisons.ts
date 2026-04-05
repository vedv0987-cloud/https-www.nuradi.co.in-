export type CompareCategory = "food" | "exercise" | "lifestyle" | "product";

export interface CompareMetric {
  label: string;
  a: string;
  b: string;
  winner: "a" | "b" | "tie";
}

export interface Comparison {
  slug: string;
  a: string;
  b: string;
  category: CompareCategory;
  metrics: CompareMetric[];
  verdict: string;
  emoji_a: string;
  emoji_b: string;
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "brown-rice-vs-white-rice",
    a: "Brown Rice", b: "White Rice",
    category: "food", emoji_a: "🍚", emoji_b: "🍚",
    metrics: [
      { label: "Calories (per 100g)", a: "130", b: "130", winner: "tie" },
      { label: "Protein", a: "2.7g", b: "2.4g", winner: "a" },
      { label: "Fiber", a: "1.8g", b: "0.4g", winner: "a" },
      { label: "Glycemic Index", a: "50 (Low)", b: "72 (High)", winner: "a" },
      { label: "Iron", a: "0.8mg", b: "0.2mg", winner: "a" },
      { label: "Cooking Time", a: "40 min", b: "20 min", winner: "b" },
      { label: "Price per kg", a: "₹80", b: "₹50", winner: "b" },
    ],
    verdict: "Brown rice wins for health. Use white rice occasionally for convenience or festive meals.",
  },
  {
    slug: "roti-vs-rice",
    a: "Wheat Roti (1)", b: "Rice (1 katori)",
    category: "food", emoji_a: "🫓", emoji_b: "🍚",
    metrics: [
      { label: "Calories", a: "85", b: "130", winner: "a" },
      { label: "Protein", a: "3g", b: "3g", winner: "tie" },
      { label: "Carbs", a: "16g", b: "28g", winner: "a" },
      { label: "Fiber", a: "2g", b: "0g", winner: "a" },
      { label: "Glycemic Index", a: "55 (Low)", b: "72 (High)", winner: "a" },
      { label: "Fullness Factor", a: "High", b: "Medium", winner: "a" },
    ],
    verdict: "Roti is better for weight loss & blood sugar control. Rice is fine in moderation.",
  },
  {
    slug: "paneer-vs-tofu",
    a: "Paneer", b: "Tofu",
    category: "food", emoji_a: "🧀", emoji_b: "🧊",
    metrics: [
      { label: "Calories (100g)", a: "265", b: "76", winner: "b" },
      { label: "Protein", a: "18g", b: "8g", winner: "a" },
      { label: "Fat", a: "21g", b: "4.8g", winner: "b" },
      { label: "Calcium", a: "208mg", b: "350mg", winner: "b" },
      { label: "Lactose", a: "Yes", b: "No", winner: "b" },
      { label: "Taste in Indian food", a: "Better", b: "OK", winner: "a" },
    ],
    verdict: "Tofu wins for weight loss & vegans. Paneer wins for muscle building & taste.",
  },
  {
    slug: "curd-vs-greek-yogurt",
    a: "Curd (Indian)", b: "Greek Yogurt",
    category: "food", emoji_a: "🥣", emoji_b: "🥛",
    metrics: [
      { label: "Calories (100g)", a: "60", b: "97", winner: "a" },
      { label: "Protein", a: "4g", b: "10g", winner: "b" },
      { label: "Probiotics", a: "Yes", b: "Yes", winner: "tie" },
      { label: "Carbs", a: "5g", b: "4g", winner: "tie" },
      { label: "Price", a: "₹40/kg", b: "₹250/kg", winner: "a" },
      { label: "Availability", a: "Everywhere", b: "Urban stores", winner: "a" },
    ],
    verdict: "Curd is better daily choice. Greek yogurt wins if you need extra protein.",
  },
  {
    slug: "honey-vs-sugar",
    a: "Honey", b: "Sugar",
    category: "food", emoji_a: "🍯", emoji_b: "🍬",
    metrics: [
      { label: "Calories (1 tsp)", a: "21", b: "16", winner: "b" },
      { label: "Glycemic Index", a: "58", b: "65", winner: "a" },
      { label: "Antioxidants", a: "Yes", b: "No", winner: "a" },
      { label: "Minerals", a: "Trace", b: "None", winner: "a" },
      { label: "Still sugar?", a: "Yes", b: "Yes", winner: "tie" },
    ],
    verdict: "Honey is marginally better. Both should be limited — your body treats both as sugar.",
  },
  {
    slug: "jaggery-vs-white-sugar",
    a: "Jaggery (Gur)", b: "White Sugar",
    category: "food", emoji_a: "🟤", emoji_b: "⚪",
    metrics: [
      { label: "Iron", a: "11mg/100g", b: "0mg", winner: "a" },
      { label: "Magnesium", a: "70mg/100g", b: "0mg", winner: "a" },
      { label: "Potassium", a: "1050mg/100g", b: "2mg", winner: "a" },
      { label: "Glycemic Index", a: "85 (High)", b: "65", winner: "b" },
      { label: "Calories (1 tsp)", a: "20", b: "16", winner: "tie" },
    ],
    verdict: "Jaggery has real minerals. But GI is high — still limit intake.",
  },
  {
    slug: "walking-vs-running",
    a: "Walking (30 min)", b: "Running (30 min)",
    category: "exercise", emoji_a: "🚶", emoji_b: "🏃",
    metrics: [
      { label: "Calories burned (70kg)", a: "150", b: "350", winner: "b" },
      { label: "Joint impact", a: "Low", b: "High", winner: "a" },
      { label: "Age-friendly", a: "All ages", b: "<60 mostly", winner: "a" },
      { label: "Injury risk", a: "Low", b: "Medium", winner: "a" },
      { label: "Heart benefit", a: "Good", b: "Excellent", winner: "b" },
      { label: "Daily sustainability", a: "Easy", b: "Moderate", winner: "a" },
    ],
    verdict: "Walking beats 'no exercise' every time. Add running 2-3x/week for heart + weight loss.",
  },
  {
    slug: "yoga-vs-gym",
    a: "Yoga", b: "Gym",
    category: "exercise", emoji_a: "🧘", emoji_b: "🏋️",
    metrics: [
      { label: "Flexibility", a: "Excellent", b: "OK", winner: "a" },
      { label: "Muscle building", a: "Moderate", b: "Excellent", winner: "b" },
      { label: "Stress relief", a: "Excellent", b: "Good", winner: "a" },
      { label: "Calorie burn", a: "200-300/hr", b: "400-600/hr", winner: "b" },
      { label: "Equipment", a: "Just a mat", b: "Weights needed", winner: "a" },
      { label: "Cost", a: "Free/low", b: "₹500-2000/mo", winner: "a" },
    ],
    verdict: "Best approach: combine both. Yoga 3x/week + gym 3x/week.",
  },
  {
    slug: "morning-vs-evening-workout",
    a: "Morning Workout", b: "Evening Workout",
    category: "exercise", emoji_a: "🌅", emoji_b: "🌆",
    metrics: [
      { label: "Fat burn", a: "Higher (fasted)", b: "Moderate", winner: "a" },
      { label: "Strength levels", a: "Lower", b: "Peak", winner: "b" },
      { label: "Consistency", a: "Easier to stick to", b: "Often skipped", winner: "a" },
      { label: "Sleep impact", a: "Improves sleep", b: "May disrupt", winner: "a" },
      { label: "Mood boost", a: "All day", b: "Stress relief", winner: "a" },
    ],
    verdict: "Morning wins for habit & fat loss. Evening wins for strength days.",
  },
  {
    slug: "cold-vs-hot-shower",
    a: "Cold Shower", b: "Hot Shower",
    category: "lifestyle", emoji_a: "🥶", emoji_b: "🔥",
    metrics: [
      { label: "Alertness boost", a: "Yes (instant)", b: "No", winner: "a" },
      { label: "Muscle recovery", a: "Good", b: "OK", winner: "a" },
      { label: "Immunity boost", a: "Proven", b: "No", winner: "a" },
      { label: "Before bed", a: "Bad", b: "Good", winner: "b" },
      { label: "Sore muscles", a: "Good", b: "Relaxing", winner: "tie" },
      { label: "Indian climate comfort", a: "Great summer", b: "Great winter", winner: "tie" },
    ],
    verdict: "Cold morning + warm evening = ideal combo.",
  },
  {
    slug: "6-vs-8-hours-sleep",
    a: "Sleeping 6 hours", b: "Sleeping 8 hours",
    category: "lifestyle", emoji_a: "😪", emoji_b: "😴",
    metrics: [
      { label: "Memory & focus", a: "Impaired", b: "Sharp", winner: "b" },
      { label: "Immunity", a: "Weakened", b: "Strong", winner: "b" },
      { label: "Weight gain risk", a: "+55%", b: "Baseline", winner: "b" },
      { label: "Heart disease risk", a: "+48%", b: "Lowest", winner: "b" },
      { label: "Mood & anxiety", a: "Worse", b: "Better", winner: "b" },
    ],
    verdict: "8 hours wins on every metric. Sleep is free medicine.",
  },
  {
    slug: "standing-vs-sitting-desk",
    a: "Standing Desk", b: "Sitting Desk",
    category: "lifestyle", emoji_a: "🧍", emoji_b: "🪑",
    metrics: [
      { label: "Calories burned (8hr)", a: "+350", b: "Baseline", winner: "a" },
      { label: "Back pain", a: "Less", b: "More", winner: "a" },
      { label: "Heart disease risk", a: "Lower", b: "Higher", winner: "a" },
      { label: "Leg fatigue", a: "Higher", b: "Lower", winner: "b" },
      { label: "Productivity", a: "Similar", b: "Similar", winner: "tie" },
    ],
    verdict: "Alternate: 30 min standing, 30 min sitting is ideal.",
  },
  {
    slug: "paracetamol-vs-ibuprofen",
    a: "Paracetamol (Crocin)", b: "Ibuprofen (Brufen)",
    category: "product", emoji_a: "💊", emoji_b: "💊",
    metrics: [
      { label: "Fever reduction", a: "Excellent", b: "Good", winner: "a" },
      { label: "Pain relief", a: "Good", b: "Excellent", winner: "b" },
      { label: "Anti-inflammatory", a: "No", b: "Yes", winner: "b" },
      { label: "Stomach friendly", a: "Yes", b: "Can irritate", winner: "a" },
      { label: "Empty stomach OK?", a: "Yes", b: "No — with food", winner: "a" },
      { label: "Kidney safety", a: "Safer", b: "Avoid if weak", winner: "a" },
    ],
    verdict: "Paracetamol for fever, ibuprofen for muscle/joint pain + inflammation.",
  },
  {
    slug: "filter-vs-ro-water",
    a: "Filter Water", b: "RO Water",
    category: "product", emoji_a: "💧", emoji_b: "💧",
    metrics: [
      { label: "Removes bacteria", a: "Yes", b: "Yes", winner: "tie" },
      { label: "Removes heavy metals", a: "Some", b: "Yes", winner: "b" },
      { label: "Keeps minerals", a: "Yes", b: "No (removes)", winner: "a" },
      { label: "Cost", a: "₹2-4K upfront", b: "₹8-20K + filters", winner: "a" },
      { label: "Water wastage", a: "None", b: "3-4 liters wasted/liter", winner: "a" },
      { label: "If municipal water is hard", a: "Not enough", b: "Essential", winner: "b" },
    ],
    verdict: "RO only needed if TDS >500. Otherwise filter water is healthier.",
  },
  {
    slug: "brown-bread-vs-white-bread",
    a: "Brown Bread", b: "White Bread",
    category: "food", emoji_a: "🍞", emoji_b: "🥖",
    metrics: [
      { label: "Fiber", a: "3g/slice", b: "0.8g/slice", winner: "a" },
      { label: "Glycemic Index", a: "55", b: "75", winner: "a" },
      { label: "B vitamins", a: "Preserved", b: "Lost", winner: "a" },
      { label: "Often marketed brown", a: "May be fake", b: "Clear", winner: "b" },
    ],
    verdict: "Check label — only 'whole wheat' or 'multigrain' is truly healthier. Colored brown ≠ healthy.",
  },
];
