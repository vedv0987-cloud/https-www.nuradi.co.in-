// Indian Thali Builder — add foods and see live nutrition totals

export type ThaliCategory = "roti" | "rice" | "dal" | "sabzi" | "extras" | "drinks";

export interface ThaliItem {
  id: string;
  name: string;
  category: ThaliCategory;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number; // mg
}

export const THALI_ITEMS: ThaliItem[] = [
  // ─ Roti ─
  { id: "roti-wheat", name: "Wheat Roti", category: "roti", emoji: "🫓", calories: 85, protein: 3, carbs: 16, fat: 1, fiber: 2, sodium: 180 },
  { id: "roti-missi", name: "Missi Roti", category: "roti", emoji: "🫓", calories: 120, protein: 5, carbs: 20, fat: 3, fiber: 3, sodium: 220 },
  { id: "paratha", name: "Paratha (plain)", category: "roti", emoji: "🥞", calories: 165, protein: 4, carbs: 22, fat: 7, fiber: 2, sodium: 300 },
  { id: "naan", name: "Butter Naan", category: "roti", emoji: "🥖", calories: 250, protein: 7, carbs: 36, fat: 9, fiber: 1, sodium: 380 },
  // ─ Rice ─
  { id: "rice-plain", name: "Plain Rice", category: "rice", emoji: "🍚", calories: 130, protein: 3, carbs: 28, fat: 0, fiber: 0, sodium: 5 },
  { id: "rice-jeera", name: "Jeera Rice", category: "rice", emoji: "🍚", calories: 160, protein: 3, carbs: 29, fat: 4, fiber: 1, sodium: 220 },
  { id: "biryani", name: "Veg Biryani", category: "rice", emoji: "🍛", calories: 290, protein: 7, carbs: 42, fat: 10, fiber: 3, sodium: 480 },
  // ─ Dal ─
  { id: "dal-toor", name: "Toor Dal", category: "dal", emoji: "🍲", calories: 120, protein: 8, carbs: 18, fat: 2, fiber: 4, sodium: 320 },
  { id: "dal-moong", name: "Moong Dal", category: "dal", emoji: "🍲", calories: 105, protein: 7, carbs: 17, fat: 1, fiber: 5, sodium: 280 },
  { id: "rajma", name: "Rajma", category: "dal", emoji: "🍲", calories: 160, protein: 9, carbs: 25, fat: 3, fiber: 8, sodium: 360 },
  { id: "chole", name: "Chole", category: "dal", emoji: "🍲", calories: 175, protein: 9, carbs: 27, fat: 4, fiber: 8, sodium: 420 },
  // ─ Sabzi ─
  { id: "aloo-gobi", name: "Aloo Gobi", category: "sabzi", emoji: "🥔", calories: 140, protein: 3, carbs: 18, fat: 7, fiber: 4, sodium: 380 },
  { id: "palak-paneer", name: "Palak Paneer", category: "sabzi", emoji: "🥬", calories: 220, protein: 11, carbs: 9, fat: 16, fiber: 4, sodium: 420 },
  { id: "bhindi", name: "Bhindi Masala", category: "sabzi", emoji: "🥒", calories: 105, protein: 3, carbs: 12, fat: 6, fiber: 4, sodium: 340 },
  { id: "mix-veg", name: "Mix Veg", category: "sabzi", emoji: "🥦", calories: 120, protein: 4, carbs: 15, fat: 5, fiber: 5, sodium: 360 },
  // ─ Extras ─
  { id: "curd", name: "Curd (1 katori)", category: "extras", emoji: "🥛", calories: 60, protein: 4, carbs: 5, fat: 3, fiber: 0, sodium: 50 },
  { id: "salad", name: "Salad", category: "extras", emoji: "🥗", calories: 25, protein: 1, carbs: 5, fat: 0, fiber: 2, sodium: 10 },
  { id: "pickle", name: "Pickle", category: "extras", emoji: "🫙", calories: 30, protein: 0, carbs: 2, fat: 2, fiber: 0, sodium: 850 },
  { id: "papad", name: "Papad (roasted)", category: "extras", emoji: "🫓", calories: 40, protein: 3, carbs: 6, fat: 0, fiber: 1, sodium: 380 },
  { id: "raita", name: "Cucumber Raita", category: "extras", emoji: "🥒", calories: 75, protein: 3, carbs: 6, fat: 4, fiber: 1, sodium: 80 },
  // ─ Drinks ─
  { id: "chaas", name: "Chaas (Buttermilk)", category: "drinks", emoji: "🥛", calories: 50, protein: 3, carbs: 4, fat: 2, fiber: 0, sodium: 120 },
  { id: "lassi", name: "Sweet Lassi", category: "drinks", emoji: "🥛", calories: 180, protein: 4, carbs: 28, fat: 5, fiber: 0, sodium: 70 },
  { id: "nimbu", name: "Nimbu Pani", category: "drinks", emoji: "🍋", calories: 45, protein: 0, carbs: 11, fat: 0, fiber: 0, sodium: 20 },
  { id: "chai", name: "Masala Chai", category: "drinks", emoji: "☕", calories: 80, protein: 2, carbs: 12, fat: 3, fiber: 0, sodium: 40 },
];

export type ThaliGoal = "balanced" | "weight-loss" | "diabetes" | "high-protein" | "heart";

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export function sumNutrition(items: ThaliItem[]): NutritionTotals {
  return items.reduce(
    (acc, i) => ({
      calories: acc.calories + i.calories,
      protein: acc.protein + i.protein,
      carbs: acc.carbs + i.carbs,
      fat: acc.fat + i.fat,
      fiber: acc.fiber + i.fiber,
      sodium: acc.sodium + i.sodium,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 }
  );
}

export const GOAL_TARGETS: Record<ThaliGoal, NutritionTotals & { label: string }> = {
  balanced: { label: "Balanced Meal", calories: 600, protein: 25, carbs: 75, fat: 20, fiber: 10, sodium: 800 },
  "weight-loss": { label: "Weight Loss", calories: 450, protein: 30, carbs: 45, fat: 15, fiber: 12, sodium: 700 },
  diabetes: { label: "Diabetes-Friendly", calories: 500, protein: 25, carbs: 55, fat: 18, fiber: 12, sodium: 700 },
  "high-protein": { label: "High Protein", calories: 650, protein: 40, carbs: 60, fat: 22, fiber: 10, sodium: 800 },
  heart: { label: "Heart-Healthy", calories: 550, protein: 25, carbs: 70, fat: 15, fiber: 12, sodium: 600 },
};
