export interface SeasonGuide {
  name: string;
  months: number[]; // 0-indexed (0=Jan, 11=Dec)
  emoji: string;
  color: string;
  risks: string[];
  tips: string[];
  foods: string[];
  recipes: string[];
}

export const SEASONS: SeasonGuide[] = [
  {
    name: "Winter",
    months: [0, 1], // Jan-Feb
    emoji: "🥶",
    color: "#3b82f6",
    risks: ["Cold & Flu", "Pneumonia", "Joint pain", "Dry skin", "Heart attacks (cold raises BP)", "Hypothermia"],
    tips: [
      "Layer clothing — multiple thin layers beat one thick one",
      "Get flu vaccine before winter starts",
      "Moisturize skin 2x daily — cold dries it out",
      "Keep joints warm — stiffness worsens in cold",
      "Eat warm foods: soups, haldi doodh, adrak chai",
      "Exercise indoors if too cold outside",
      "Heart patients: avoid sudden cold exposure",
      "Wash hands frequently — flu spreads more",
    ],
    foods: ["Carrots", "Methi (fenugreek)", "Sweet potato", "Peanuts", "Ginger", "Ghee", "Warm milk", "Dates", "Oranges", "Til (sesame)", "Bajra"],
    recipes: ["Methi Thepla", "Bajra Roti", "Sarson Ka Saag", "Gajar Halwa (healthy)"],
  },
  {
    name: "Pre-Summer",
    months: [2, 3], // Mar-Apr
    emoji: "🌡️",
    color: "#f59e0b",
    risks: ["Heatstroke (early)", "Dehydration", "Sunburn", "Food poisoning", "Pollen allergies"],
    tips: [
      "Start increasing water intake now",
      "Use sunscreen daily (SPF 30+)",
      "Eat cooling foods: curd, cucumber, watermelon",
      "Avoid street food — spoils faster",
      "Start wearing light cotton clothes",
      "Carry water bottle always",
      "Limit caffeine — it dehydrates",
    ],
    foods: ["Watermelon", "Cucumber", "Mint", "Coconut water", "Buttermilk", "Curd", "Sattu", "Lemon"],
    recipes: ["Aam Panna", "Jal Jeera", "Cucumber Raita", "Watermelon Salad"],
  },
  {
    name: "Summer",
    months: [4, 5], // May-Jun
    emoji: "☀️",
    color: "#ef4444",
    risks: ["Heatstroke", "Severe dehydration", "Sunburn", "Kidney stones (dehydration)", "UTIs", "Food poisoning", "Prickly heat"],
    tips: [
      "Drink 3-4 liters water daily",
      "Avoid direct sun 11AM-4PM",
      "Wear loose cotton clothes",
      "Eat light, avoid heavy meals",
      "Use ORS if excessive sweating",
      "Keep food refrigerated — spoils fast",
      "Bath with cool water 2x daily",
      "Use wet towel on neck/wrists to cool body",
    ],
    foods: ["Watermelon", "Muskmelon", "Aam Panna", "Nimbu Pani", "Raw onion", "Sattu drink", "Coconut water", "Buttermilk"],
    recipes: ["Sattu Drink", "Kairi Panna", "Curd Rice", "Tadka Chaas"],
  },
  {
    name: "Monsoon",
    months: [6, 7], // Jul-Aug
    emoji: "🌧️",
    color: "#0891b2",
    risks: ["Dengue", "Malaria", "Chikungunya", "Leptospirosis", "Typhoid", "Cholera", "Fungal infections", "Stomach infections"],
    tips: [
      "Empty ALL stagnant water weekly (dengue mosquito breeds there)",
      "Use mosquito repellent + nets",
      "Drink ONLY boiled or filtered water",
      "Avoid street food, cut fruits, raw salads",
      "Keep feet dry — fungal infection risk",
      "Eat home-cooked hot food",
      "Wash hands before every meal",
      "Use turmeric in cooking — boosts immunity",
    ],
    foods: ["Turmeric", "Ginger", "Garlic", "Neem", "Tulsi", "Karela (bitter gourd)", "Lauki (bottle gourd)", "Jamun"],
    recipes: ["Hot Dal Khichdi", "Ginger Tulsi Kadha", "Corn Chaat", "Methi Paratha"],
  },
  {
    name: "Festive / Post-Monsoon",
    months: [8, 9], // Sep-Oct
    emoji: "🎉",
    color: "#d97706",
    risks: ["Overeating (festivals)", "Air pollution (Diwali)", "Sugar spikes", "Weight gain", "Dengue still active", "Diabetic complications"],
    tips: [
      "Portion control during festivals",
      "Choose healthier sweets (jaggery over sugar)",
      "Limit crackers — air pollution risk",
      "Wear N95 mask during Diwali week",
      "Continue exercise routine — don't skip",
      "Stay hydrated despite cooler weather",
      "Go easy on oily/fried snacks",
    ],
    foods: ["Dry fruits (moderate)", "Makhana", "Ragi ladoo", "Seasonal fruits", "Pomegranate", "Guava"],
    recipes: ["Makhana Kheer", "Ragi Ladoo", "Baked Chakli", "Roasted Chana"],
  },
  {
    name: "Early Winter",
    months: [10, 11], // Nov-Dec
    emoji: "🍂",
    color: "#7c3aed",
    risks: ["Seasonal allergies", "Dry cough", "Vitamin D deficiency (less sun)", "Flu season begins", "Dry skin", "Asthma flare-ups"],
    tips: [
      "Get flu vaccine NOW",
      "Start Vitamin D supplement (consult doctor)",
      "Moisturize early — prevent dry skin",
      "Warm up 10 min before exercise",
      "Eat immunity-boosting foods",
      "Get 15 min morning sunlight for vitamin D",
      "Stay hydrated even without thirst",
    ],
    foods: ["Almonds", "Walnuts", "Dates", "Amla", "Honey", "Warm soups", "Palak", "Gajar"],
    recipes: ["Amla Murabba", "Almond Milk", "Chicken Soup", "Palak Corn"],
  },
];

export function getCurrentSeason(): SeasonGuide {
  const month = new Date().getMonth();
  return SEASONS.find((s) => s.months.includes(month)) || SEASONS[0];
}
