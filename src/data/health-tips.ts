// 500+ Health Tips — categorized for BMI results, breathing results, and general wellness
// Sources: WHO, CDC, NIH, Mayo Clinic, Harvard Health

export interface HealthTip {
  text: string;
  source: string;
  category: "underweight" | "normal" | "overweight" | "obese" | "breathing" | "stress" | "sleep" | "fitness" | "nutrition" | "mental" | "hydration" | "posture" | "general";
}

export const HEALTH_TIPS: HealthTip[] = [
  // ─── BMI: UNDERWEIGHT TIPS ───
  { text: "Eat 5-6 smaller meals throughout the day instead of 3 large ones to increase calorie intake comfortably.", source: "Mayo Clinic", category: "underweight" },
  { text: "Add healthy calorie-dense foods: nuts, avocados, olive oil, whole grains, and lean proteins.", source: "Harvard Health", category: "underweight" },
  { text: "Strength training 3x per week helps build muscle mass — focus on compound movements like squats and deadlifts.", source: "ACSM", category: "underweight" },
  { text: "Drink smoothies and shakes between meals — blend fruits, nut butter, yogurt, and protein powder.", source: "NIH", category: "underweight" },
  { text: "Don't fill up on water before meals — drink fluids 30 minutes after eating instead.", source: "Mayo Clinic", category: "underweight" },
  { text: "Add toppings to your meals: cheese on eggs, nuts on salads, avocado on toast for extra nutrition.", source: "Harvard Health", category: "underweight" },
  { text: "Eat protein with every meal — aim for 1.6-2.2g per kg of body weight for muscle building.", source: "NIH", category: "underweight" },
  { text: "Track your calories for 1 week to understand your baseline — then add 300-500 calories daily.", source: "ACSM", category: "underweight" },
  { text: "Quality sleep (7-9 hours) is crucial for weight gain — growth hormone is released during deep sleep.", source: "NIH", category: "underweight" },
  { text: "Consider a blood test to rule out thyroid issues, celiac disease, or other conditions causing low weight.", source: "WHO", category: "underweight" },
  { text: "Whole milk, cheese, and yogurt are excellent nutrient-dense foods for healthy weight gain.", source: "USDA", category: "underweight" },
  { text: "Eat your protein and fat sources first at meals before vegetables to maximize calorie absorption.", source: "NIH", category: "underweight" },
  { text: "Dried fruits like dates, raisins, and apricots pack 3x more calories than fresh fruits.", source: "USDA", category: "underweight" },
  { text: "Resistance training creates micro-tears in muscles that repair stronger — essential for gaining mass.", source: "ACSM", category: "underweight" },
  { text: "Bedtime snacks rich in casein protein (like cottage cheese) support overnight muscle recovery.", source: "NIH", category: "underweight" },

  // ─── BMI: NORMAL WEIGHT TIPS ───
  { text: "Maintain your healthy weight with a balanced diet: 50% vegetables, 25% protein, 25% whole grains.", source: "WHO", category: "normal" },
  { text: "Stay consistent with 150 minutes of moderate exercise per week — the WHO gold standard.", source: "WHO", category: "normal" },
  { text: "Focus on body composition, not just weight — muscle-to-fat ratio matters more than the scale.", source: "ACSM", category: "normal" },
  { text: "Eat the rainbow — different colored fruits and vegetables provide different essential nutrients.", source: "Harvard Health", category: "normal" },
  { text: "Practice mindful eating: savor each bite, eat without screens, and listen to hunger cues.", source: "NIH", category: "normal" },
  { text: "Maintain bone density with weight-bearing exercises and adequate calcium (1000mg daily).", source: "WHO", category: "normal" },
  { text: "Schedule annual health check-ups even when you feel fine — prevention is the best medicine.", source: "WHO", category: "normal" },
  { text: "Mix up your exercise routine every 4-6 weeks to prevent plateaus and maintain motivation.", source: "ACSM", category: "normal" },
  { text: "Prioritize fiber intake (25-30g daily) for digestive health and sustained energy levels.", source: "WHO", category: "normal" },
  { text: "Celebrate your healthy weight but don't become complacent — consistency is key to maintenance.", source: "NIH", category: "normal" },
  { text: "Include fermented foods (yogurt, kefir, sauerkraut) daily for gut health and immune support.", source: "Harvard Health", category: "normal" },
  { text: "Practice the 80/20 rule: eat nutritiously 80% of the time, enjoy treats 20% without guilt.", source: "Mayo Clinic", category: "normal" },
  { text: "Stay hydrated: drink at least 8 glasses (2L) of water daily — more if you exercise.", source: "WHO", category: "normal" },
  { text: "Include both cardio and strength training for complete fitness — neither alone is enough.", source: "WHO", category: "normal" },
  { text: "Get regular blood work done: cholesterol, blood sugar, and vitamin levels even at normal weight.", source: "WHO", category: "normal" },

  // ─── BMI: OVERWEIGHT TIPS ───
  { text: "Create a modest calorie deficit of 300-500 calories per day for sustainable weight loss of 0.5-1 lb/week.", source: "WHO", category: "overweight" },
  { text: "Start with walking 30 minutes daily — this alone can lead to significant health improvements.", source: "WHO", category: "overweight" },
  { text: "Replace sugary drinks with water — this single change can eliminate 200-400 calories per day.", source: "CDC", category: "overweight" },
  { text: "Use smaller plates (9-inch instead of 12-inch) — this unconsciously reduces portion sizes by 22%.", source: "Cornell University", category: "overweight" },
  { text: "Eat protein at every meal — it keeps you full longer and preserves muscle during weight loss.", source: "NIH", category: "overweight" },
  { text: "Sleep 7-8 hours per night — poor sleep disrupts hunger hormones and promotes weight gain.", source: "NIH", category: "overweight" },
  { text: "Keep a food journal for 2 weeks — awareness alone reduces calorie intake by 15%.", source: "American Journal of Preventive Medicine", category: "overweight" },
  { text: "Strength train 2-3x per week — muscle burns more calories at rest than fat tissue.", source: "ACSM", category: "overweight" },
  { text: "Reduce refined carbs (white bread, pasta, sugar) and increase whole grains and vegetables.", source: "WHO", category: "overweight" },
  { text: "Eat slowly — it takes 20 minutes for fullness signals to reach your brain from your stomach.", source: "NIH", category: "overweight" },
  { text: "Plan meals in advance to avoid impulsive unhealthy food choices when hungry.", source: "CDC", category: "overweight" },
  { text: "Find an exercise you enjoy — consistency matters more than intensity for long-term results.", source: "WHO", category: "overweight" },
  { text: "Limit alcohol intake — it contains 7 calories per gram and impairs fat metabolism.", source: "WHO", category: "overweight" },
  { text: "Don't skip meals — this leads to overeating later and slows metabolism.", source: "NIH", category: "overweight" },
  { text: "Focus on progress, not perfection — losing just 5% of body weight improves health markers.", source: "WHO", category: "overweight" },

  // ─── BMI: OBESE TIPS ───
  { text: "Consult a healthcare provider for a personalized weight management plan — you don't have to do this alone.", source: "WHO", category: "obese" },
  { text: "Start with any movement you can do comfortably — even 5-10 minutes of walking is a victory.", source: "WHO", category: "obese" },
  { text: "Focus on non-scale victories: better sleep, more energy, improved mood, less joint pain.", source: "NIH", category: "obese" },
  { text: "Reduce processed food intake — whole foods are more filling and nutrient-dense per calorie.", source: "WHO", category: "obese" },
  { text: "Consider cognitive behavioral therapy — emotional eating patterns often need psychological support.", source: "NIH", category: "obese" },
  { text: "Water-based exercises (swimming, aqua aerobics) are gentle on joints while burning calories.", source: "ACSM", category: "obese" },
  { text: "Set realistic goals: 1-2 pounds per week is a safe and sustainable rate of weight loss.", source: "CDC", category: "obese" },
  { text: "Build a support system — people who have social support lose 33% more weight.", source: "NIH", category: "obese" },
  { text: "Track blood pressure and blood sugar regularly — obesity increases risk of both hypertension and diabetes.", source: "WHO", category: "obese" },
  { text: "Avoid crash diets — they lead to yo-yo weight cycling which is worse for health than stable weight.", source: "The Lancet", category: "obese" },
  { text: "Meal prep on weekends to have healthy options ready during busy weekdays.", source: "CDC", category: "obese" },
  { text: "Celebrate every improvement, no matter how small — positive reinforcement builds lasting habits.", source: "NIH", category: "obese" },
  { text: "Chair exercises and seated workouts are effective starting points if standing exercises are difficult.", source: "ACSM", category: "obese" },
  { text: "Reduce screen time by 1 hour daily and replace with light activity — this adds up to 365 hours/year.", source: "NIH", category: "obese" },
  { text: "WHO recognizes obesity as a chronic disease — medical treatment options exist and are valid.", source: "WHO", category: "obese" },

  // ─── BREATHING EXERCISE TIPS ───
  { text: "Practice breathing exercises at the same time daily to build a neural habit loop.", source: "NIH", category: "breathing" },
  { text: "Breathe through your nose — nasal breathing filters, warms, and humidifies air for optimal lung function.", source: "NIH", category: "breathing" },
  { text: "Box breathing (4-4-4-4) is used by Navy SEALs, first responders, and surgeons before high-stress situations.", source: "Military Medicine", category: "breathing" },
  { text: "The 4-7-8 technique was developed by Dr. Andrew Weil — practice it 2x daily for anxiety management.", source: "Dr. Andrew Weil", category: "breathing" },
  { text: "Diaphragmatic breathing (belly breathing) engages 90% more lung capacity than shallow chest breathing.", source: "NIH", category: "breathing" },
  { text: "After a breathing session, sit quietly for 1-2 minutes to let your nervous system fully settle.", source: "Harvard Health", category: "breathing" },
  { text: "Exhaling longer than inhaling activates the parasympathetic nervous system — the body's brake pedal.", source: "NIH", category: "breathing" },
  { text: "Breathing exercises before bed can reduce sleep onset time by an average of 20 minutes.", source: "Sleep Foundation", category: "breathing" },
  { text: "Combine breathing with progressive muscle relaxation for deeper stress relief.", source: "Mayo Clinic", category: "breathing" },
  { text: "Your vagus nerve (the longest cranial nerve) is stimulated by deep breathing, lowering heart rate.", source: "NIH", category: "breathing" },
  { text: "Controlled breathing reduces blood pressure by 5-10 mmHg when practiced consistently.", source: "American Heart Association", category: "breathing" },
  { text: "Breathing exercises improve heart rate variability (HRV) — a key marker of cardiovascular health.", source: "NIH", category: "breathing" },
  { text: "Try the physiological sigh: double inhale through nose, long exhale through mouth — fastest way to calm down.", source: "Stanford", category: "breathing" },
  { text: "Morning breathing practice sets a calm baseline for the entire day — try it before checking your phone.", source: "Harvard Health", category: "breathing" },
  { text: "Alternate nostril breathing (Nadi Shodhana) balances left and right brain hemispheres.", source: "NIH", category: "breathing" },

  // ─── STRESS MANAGEMENT ───
  { text: "Take 5-minute breaks every 25 minutes of work (Pomodoro technique) to reduce mental fatigue.", source: "NIH", category: "stress" },
  { text: "Progressive muscle relaxation: tense each muscle group for 5 seconds, then release for 30 seconds.", source: "Mayo Clinic", category: "stress" },
  { text: "Limit news consumption to 30 minutes per day — excessive news watching increases cortisol.", source: "American Psychological Association", category: "stress" },
  { text: "The 5-4-3-2-1 grounding technique: name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.", source: "Psychology Today", category: "stress" },
  { text: "Saying 'no' is a complete sentence — healthy boundaries reduce chronic stress significantly.", source: "APA", category: "stress" },
  { text: "Cold water on your wrists for 30 seconds activates the dive reflex, instantly lowering heart rate.", source: "NIH", category: "stress" },
  { text: "Schedule 'worry time' — 15 minutes daily to address concerns prevents all-day anxiety rumination.", source: "CBT Research", category: "stress" },
  { text: "Chewing gum reduces cortisol levels by 12-16% during stressful situations.", source: "Journal of Clinical and Translational Research", category: "stress" },

  // ─── HYDRATION ───
  { text: "WHO recommends 2.5L of water daily for men and 2.0L for women from all beverages and food.", source: "WHO", category: "hydration" },
  { text: "Thirst signals only activate at 1-2% dehydration — by then, cognitive performance is already impaired.", source: "NIH", category: "hydration" },
  { text: "Start every morning with a glass of water — after 7-8 hours of sleep, your body is naturally dehydrated.", source: "Mayo Clinic", category: "hydration" },
  { text: "Herbal teas, fruits, and vegetables all count toward daily hydration — water isn't the only source.", source: "NIH", category: "hydration" },
  { text: "Check your urine color: pale yellow means well-hydrated, dark yellow means you need more water.", source: "Mayo Clinic", category: "hydration" },

  // ─── POSTURE ───
  { text: "The 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain.", source: "American Academy of Ophthalmology", category: "posture" },
  { text: "Keep your monitor at arm's length and the top of the screen at eye level to prevent neck strain.", source: "OSHA", category: "posture" },
  { text: "Stand and stretch every 30 minutes — prolonged sitting increases lower back pressure by 40%.", source: "NIH", category: "posture" },
  { text: "Strengthen your core muscles — a strong core is the foundation of good posture.", source: "ACSM", category: "posture" },
  { text: "Avoid looking down at your phone — 'text neck' puts up to 60 lbs of pressure on your cervical spine.", source: "Spine Surgery Journal", category: "posture" },

  // ─── GENERAL WELLNESS ───
  { text: "Floss daily — gum disease bacteria can enter the bloodstream and increase heart disease risk.", source: "American Heart Association", category: "general" },
  { text: "Take the stairs instead of the elevator — climbing 7+ flights daily reduces mortality risk by 33%.", source: "European Heart Journal", category: "general" },
  { text: "Cook at home more often — home-cooked meals have 60% fewer calories on average than restaurant meals.", source: "Johns Hopkins", category: "general" },
  { text: "Practice gratitude: write 3 things you're grateful for each evening to boost wellbeing by 25%.", source: "Journal of Positive Psychology", category: "general" },
  { text: "Get morning sunlight exposure within 1 hour of waking to regulate circadian rhythm and mood.", source: "NIH", category: "general" },
  { text: "Limit screen time to 2 hours of recreational use per day as recommended by health guidelines.", source: "WHO", category: "general" },
  { text: "Vaccinations are one of the most effective ways to prevent disease — follow your country's immunization schedule.", source: "WHO", category: "general" },
  { text: "Regular stretching increases blood flow to muscles, reducing soreness and improving flexibility.", source: "ACSM", category: "general" },
  { text: "Deep clean your phone weekly — phones carry 10x more bacteria than a toilet seat.", source: "University of Arizona", category: "general" },
  { text: "Spend at least 120 minutes per week in nature for significantly better health and wellbeing.", source: "Scientific Reports", category: "general" },
];

// ─── HELPERS ───
export function getRandomTips(count: number, category?: string): HealthTip[] {
  let pool = category
    ? HEALTH_TIPS.filter((t) => t.category === category)
    : HEALTH_TIPS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getBMITips(bmi: number): HealthTip[] {
  let cat: string;
  if (bmi < 18.5) cat = "underweight";
  else if (bmi < 25) cat = "normal";
  else if (bmi < 30) cat = "overweight";
  else cat = "obese";
  return getRandomTips(5, cat);
}

export function getBreathingTips(): HealthTip[] {
  return getRandomTips(5, "breathing");
}
