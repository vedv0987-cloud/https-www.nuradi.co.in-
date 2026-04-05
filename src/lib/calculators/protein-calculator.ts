export type ProteinGoal = "sedentary" | "weight-loss" | "maintenance" | "muscle" | "athlete";
export type DietType = "veg" | "egg" | "nonveg" | "vegan";

export const PROTEIN_RATES: Record<ProteinGoal, { min: number; max: number; label: string }> = {
  sedentary: { min: 0.8, max: 0.8, label: "Sedentary / General Health" },
  "weight-loss": { min: 1.2, max: 1.6, label: "Weight Loss" },
  maintenance: { min: 1.0, max: 1.2, label: "Maintenance" },
  muscle: { min: 1.6, max: 2.2, label: "Muscle Building" },
  athlete: { min: 1.8, max: 2.5, label: "Athlete / Competitive" },
};

export function calculateProtein(
  weightKg: number,
  goal: ProteinGoal
): { min: number; max: number; target: number } {
  const rate = PROTEIN_RATES[goal];
  const min = Math.round(weightKg * rate.min);
  const max = Math.round(weightKg * rate.max);
  return { min, max, target: Math.round((min + max) / 2) };
}

export interface Food {
  id: string;
  emoji: string;
  name: string;
  protein: number;
  serving: string;
  diet: DietType[];
}

export const FOODS: Food[] = [
  { id: "eggs", emoji: "🥚", name: "Eggs (2 boiled)", protein: 13, serving: "2 eggs", diet: ["egg", "nonveg"] },
  { id: "paneer", emoji: "🧀", name: "Paneer", protein: 18, serving: "100g", diet: ["veg", "egg", "nonveg"] },
  { id: "chicken", emoji: "🍗", name: "Chicken Breast", protein: 25, serving: "100g", diet: ["nonveg"] },
  { id: "fish", emoji: "🐟", name: "Fish (rohu/salmon)", protein: 22, serving: "100g", diet: ["nonveg"] },
  { id: "rajma", emoji: "🫘", name: "Rajma", protein: 9, serving: "1 katori", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "moong", emoji: "🥣", name: "Moong Dal", protein: 7, serving: "1 katori", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "chana", emoji: "🫛", name: "Chana (Chickpea)", protein: 8, serving: "1 katori", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "soyabean", emoji: "🌱", name: "Soyabean", protein: 15, serving: "1 katori", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "milk", emoji: "🥛", name: "Milk", protein: 8, serving: "1 glass (250ml)", diet: ["veg", "egg", "nonveg"] },
  { id: "curd", emoji: "🍦", name: "Curd / Yogurt", protein: 6, serving: "1 katori", diet: ["veg", "egg", "nonveg"] },
  { id: "greek", emoji: "🥛", name: "Greek Yogurt", protein: 14, serving: "200g", diet: ["veg", "egg", "nonveg"] },
  { id: "peanuts", emoji: "🥜", name: "Peanuts", protein: 8, serving: "30g", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "almonds", emoji: "🌰", name: "Almonds", protein: 6, serving: "20 pieces", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "quinoa", emoji: "🌾", name: "Quinoa", protein: 8, serving: "1 katori cooked", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "oats", emoji: "🌾", name: "Oats", protein: 5, serving: "40g dry", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "tofu", emoji: "🧊", name: "Tofu", protein: 12, serving: "100g", diet: ["veg", "egg", "nonveg", "vegan"] },
  { id: "whey", emoji: "💪", name: "Whey Protein", protein: 24, serving: "1 scoop (30g)", diet: ["veg", "egg", "nonveg"] },
  { id: "tuna", emoji: "🐟", name: "Tuna (canned)", protein: 23, serving: "100g", diet: ["nonveg"] },
];
