// Daily rotating poll questions for the homepage widget.
// No backend: votes stored in localStorage, community results seeded with
// plausible percentages.

export interface Poll {
  id: string;
  question: string;
  options: string[];
  seedPercentages: number[]; // must sum to 100
}

export const POLLS: Poll[] = [
  { id: "water", question: "How many glasses of water do you drink daily?",
    options: ["<4", "4-6", "7-8", "8+"], seedPercentages: [22, 38, 28, 12] },
  { id: "sleep", question: "How many hours do you sleep on average?",
    options: ["<5", "5-6", "7-8", "8+"], seedPercentages: [14, 32, 44, 10] },
  { id: "exercise", question: "How often do you exercise?",
    options: ["Daily", "Few times/week", "Rarely", "Never"], seedPercentages: [18, 35, 28, 19] },
  { id: "bp", question: "Have you checked your BP this year?",
    options: ["Yes", "No", "Don't remember"], seedPercentages: [42, 37, 21] },
  { id: "breakfast", question: "Do you eat breakfast daily?",
    options: ["Always", "Most days", "Rarely", "Never"], seedPercentages: [48, 32, 14, 6] },
  { id: "fruits", question: "How many servings of fruit do you eat daily?",
    options: ["0", "1-2", "3-4", "5+"], seedPercentages: [18, 52, 24, 6] },
  { id: "screen", question: "Your daily screen time?",
    options: ["<4 hrs", "4-6 hrs", "6-10 hrs", "10+ hrs"], seedPercentages: [12, 28, 42, 18] },
  { id: "walk", question: "How many steps do you walk daily?",
    options: ["<3,000", "3-6k", "6-10k", "10k+"], seedPercentages: [22, 38, 30, 10] },
  { id: "sugar", question: "How often do you eat sweets/desserts?",
    options: ["Daily", "Weekly", "Occasionally", "Never"], seedPercentages: [28, 41, 27, 4] },
  { id: "checkup", question: "Last full body checkup?",
    options: ["This year", "1-2 yrs ago", "3+ yrs ago", "Never"], seedPercentages: [32, 28, 22, 18] },
  { id: "stress", question: "How stressed do you feel daily?",
    options: ["Not at all", "A little", "Moderate", "Very"], seedPercentages: [11, 34, 38, 17] },
  { id: "meditation", question: "Do you meditate?",
    options: ["Daily", "Sometimes", "Tried once", "Never"], seedPercentages: [9, 27, 28, 36] },
  { id: "veg", question: "Your diet preference?",
    options: ["Pure Veg", "Eggetarian", "Non-Veg", "Vegan"], seedPercentages: [38, 15, 43, 4] },
  { id: "smoking", question: "Do you smoke?",
    options: ["Never", "Quit", "Occasionally", "Regular"], seedPercentages: [62, 12, 14, 12] },
  { id: "alcohol", question: "How often do you drink alcohol?",
    options: ["Never", "Occasionally", "Weekly", "Daily"], seedPercentages: [48, 32, 16, 4] },
  { id: "junk", question: "How often do you eat outside/junk food?",
    options: ["Never", "Weekly", "2-3x/week", "Daily"], seedPercentages: [9, 38, 38, 15] },
  { id: "supplements", question: "Do you take vitamin supplements?",
    options: ["Daily", "Occasionally", "Only when sick", "Never"], seedPercentages: [22, 28, 24, 26] },
  { id: "weight-track", question: "Do you track your weight?",
    options: ["Weekly", "Monthly", "Rarely", "Never"], seedPercentages: [18, 31, 32, 19] },
  { id: "bmi-know", question: "Do you know your BMI?",
    options: ["Yes, exactly", "Approximately", "No idea"], seedPercentages: [24, 44, 32] },
  { id: "yoga", question: "Have you tried yoga?",
    options: ["Regular practice", "Occasionally", "Tried once", "Never"], seedPercentages: [16, 29, 30, 25] },
];

// Date-keyed so everyone sees the same poll today, different tomorrow
export function getTodaysPoll(): Poll {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return POLLS[dayOfYear % POLLS.length];
}
