// Symptom → deficiency pattern mapper.
// Symptom → weighted vote for each vitamin/mineral.
// Confidence = votes / max possible votes for that deficiency.

export interface Symptom {
  id: string;
  label: string;
  group: "physical" | "skin-hair" | "mental" | "digestive";
}

export const SYMPTOMS: Symptom[] = [
  // Physical
  { id: "fatigue", label: "Constant fatigue", group: "physical" },
  { id: "muscle-cramps", label: "Muscle cramps", group: "physical" },
  { id: "bone-pain", label: "Bone or joint pain", group: "physical" },
  { id: "weakness", label: "Muscle weakness", group: "physical" },
  { id: "palpitations", label: "Heart palpitations", group: "physical" },
  { id: "breathless", label: "Shortness of breath", group: "physical" },
  { id: "cold-hands", label: "Cold hands & feet", group: "physical" },
  { id: "tingling", label: "Tingling hands/feet", group: "physical" },
  { id: "restless-legs", label: "Restless legs", group: "physical" },
  // Skin & Hair
  { id: "hair-loss", label: "Hair loss", group: "skin-hair" },
  { id: "brittle-nails", label: "Brittle nails", group: "skin-hair" },
  { id: "dry-skin", label: "Dry skin", group: "skin-hair" },
  { id: "pale-skin", label: "Pale skin", group: "skin-hair" },
  { id: "easy-bruising", label: "Easy bruising", group: "skin-hair" },
  { id: "poor-wound", label: "Slow wound healing", group: "skin-hair" },
  { id: "night-blindness", label: "Night blindness", group: "skin-hair" },
  // Mental
  { id: "brain-fog", label: "Brain fog", group: "mental" },
  { id: "mood-changes", label: "Mood swings / depression", group: "mental" },
  { id: "anxiety", label: "Anxiety / irritability", group: "mental" },
  { id: "poor-memory", label: "Poor memory", group: "mental" },
  { id: "insomnia", label: "Trouble sleeping", group: "mental" },
  // Digestive / other
  { id: "mouth-ulcers", label: "Mouth ulcers", group: "digestive" },
  { id: "bleeding-gums", label: "Bleeding gums", group: "digestive" },
  { id: "cracked-lips", label: "Cracked lips corners", group: "digestive" },
  { id: "frequent-infections", label: "Frequent infections", group: "digestive" },
  { id: "loss-appetite", label: "Loss of appetite", group: "digestive" },
];

// Deficiency → associated symptom ids with weights
const DEFICIENCY_MAP: Record<
  string,
  { name: string; symptoms: Record<string, number>; foods: string[]; tests: string[] }
> = {
  "vitamin-d": {
    name: "Vitamin D",
    symptoms: {
      fatigue: 2, "bone-pain": 3, weakness: 2, "muscle-cramps": 2, "hair-loss": 1,
      "mood-changes": 2, "frequent-infections": 2,
    },
    foods: ["Sunlight (15-20 min/day)", "Fortified milk", "Eggs", "Mushrooms", "Fatty fish"],
    tests: ["25-OH Vitamin D"],
  },
  "vitamin-b12": {
    name: "Vitamin B12",
    symptoms: {
      fatigue: 3, tingling: 3, "pale-skin": 2, breathless: 2, "brain-fog": 3,
      "mood-changes": 2, "poor-memory": 3, "mouth-ulcers": 2, weakness: 2,
    },
    foods: ["Eggs", "Milk & curd", "Paneer", "Fish", "Chicken", "Fortified cereals"],
    tests: ["Serum B12", "Homocysteine"],
  },
  iron: {
    name: "Iron",
    symptoms: {
      fatigue: 3, "pale-skin": 3, breathless: 3, palpitations: 2, "hair-loss": 2,
      "brittle-nails": 2, "restless-legs": 2, "cold-hands": 2, weakness: 2,
    },
    foods: ["Spinach", "Ragi", "Jaggery", "Dates", "Chicken liver", "Rajma", "Pomegranate"],
    tests: ["Hemoglobin", "Ferritin", "Iron studies"],
  },
  calcium: {
    name: "Calcium",
    symptoms: {
      "muscle-cramps": 3, "bone-pain": 3, tingling: 2, weakness: 2, "brittle-nails": 2,
    },
    foods: ["Milk", "Curd", "Paneer", "Ragi", "Sesame seeds", "Leafy greens"],
    tests: ["Serum Calcium", "Serum Phosphorus", "Vitamin D"],
  },
  magnesium: {
    name: "Magnesium",
    symptoms: {
      "muscle-cramps": 3, fatigue: 2, insomnia: 2, anxiety: 2, palpitations: 2, "restless-legs": 2,
    },
    foods: ["Almonds", "Cashews", "Spinach", "Pumpkin seeds", "Dark chocolate", "Bananas"],
    tests: ["Serum Magnesium"],
  },
  "vitamin-c": {
    name: "Vitamin C",
    symptoms: {
      "bleeding-gums": 3, "easy-bruising": 3, "poor-wound": 2, fatigue: 1, "dry-skin": 1,
      "frequent-infections": 2,
    },
    foods: ["Amla", "Guava", "Oranges", "Lemon", "Capsicum", "Strawberries"],
    tests: ["Plasma Vitamin C"],
  },
  "vitamin-a": {
    name: "Vitamin A",
    symptoms: {
      "night-blindness": 3, "dry-skin": 2, "frequent-infections": 2, "hair-loss": 1,
    },
    foods: ["Carrots", "Sweet potato", "Spinach", "Mango", "Liver", "Egg yolk"],
    tests: ["Serum Retinol"],
  },
  zinc: {
    name: "Zinc",
    symptoms: {
      "hair-loss": 2, "poor-wound": 3, "frequent-infections": 2, "loss-appetite": 2,
      "brain-fog": 1,
    },
    foods: ["Pumpkin seeds", "Chickpeas", "Cashews", "Lentils", "Curd", "Eggs"],
    tests: ["Serum Zinc"],
  },
  "vitamin-b2": {
    name: "Vitamin B2 (Riboflavin)",
    symptoms: {
      "cracked-lips": 3, "mouth-ulcers": 2, "dry-skin": 2, "hair-loss": 1,
    },
    foods: ["Milk", "Curd", "Eggs", "Spinach", "Almonds"],
    tests: ["Erythrocyte Riboflavin"],
  },
  folate: {
    name: "Folate (B9)",
    symptoms: {
      fatigue: 2, "pale-skin": 2, "mouth-ulcers": 2, breathless: 1, "brain-fog": 1,
    },
    foods: ["Spinach", "Lentils", "Chickpeas", "Avocado", "Broccoli", "Beetroot"],
    tests: ["Serum Folate", "RBC Folate"],
  },
};

export interface DeficiencyMatch {
  id: string;
  name: string;
  confidence: number; // 0-100
  matchedSymptoms: number;
  foods: string[];
  tests: string[];
}

export function analyzeDeficiencies(
  selectedSymptomIds: string[]
): DeficiencyMatch[] {
  if (selectedSymptomIds.length === 0) return [];

  return Object.entries(DEFICIENCY_MAP)
    .map(([id, data]) => {
      const matched = selectedSymptomIds.filter((s) => data.symptoms[s]);
      const score = matched.reduce((sum, s) => sum + (data.symptoms[s] || 0), 0);
      const maxScore = Object.values(data.symptoms).reduce((s, v) => s + v, 0);
      const confidence = Math.round((score / maxScore) * 100);
      return {
        id,
        name: data.name,
        confidence,
        matchedSymptoms: matched.length,
        foods: data.foods,
        tests: data.tests,
      };
    })
    .filter((d) => d.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);
}
