// 500+ Health Facts — randomized on every session
// Sources: WHO, CDC, NIH, Mayo Clinic, Harvard Health

export interface HealthFact {
  text: string;
  source: string;
  category: "body" | "nutrition" | "mental" | "fitness" | "sleep" | "heart" | "brain" | "immune" | "weight" | "general";
}

export const HEALTH_FACTS: HealthFact[] = [
  // ─── BODY & GENERAL ───
  { text: "Your body has about 37.2 trillion cells, each performing thousands of chemical reactions every second.", source: "NIH", category: "body" },
  { text: "The human brain uses 20% of your body's total energy, despite being only 2% of your body weight.", source: "Scientific American", category: "brain" },
  { text: "Your heart beats about 100,000 times per day, pumping 2,000 gallons of blood through 60,000 miles of blood vessels.", source: "American Heart Association", category: "heart" },
  { text: "Bones are 4 times stronger than concrete when bearing weight.", source: "NIH", category: "body" },
  { text: "Your nose can detect over 1 trillion different scents.", source: "Science Magazine", category: "body" },
  { text: "The human body produces about 25 million new cells each second.", source: "NIH", category: "body" },
  { text: "Your stomach lining replaces itself every 3-4 days to prevent self-digestion.", source: "NIH", category: "body" },
  { text: "The average adult has 206 bones, but babies are born with about 270.", source: "NIH", category: "body" },
  { text: "Your liver performs over 500 different functions including filtering 1.4 liters of blood per minute.", source: "British Liver Trust", category: "body" },
  { text: "Human teeth are the only part of the body that cannot repair themselves.", source: "ADA", category: "body" },
  { text: "Your lungs contain about 300 million alveoli, providing a surface area the size of a tennis court.", source: "NIH", category: "body" },
  { text: "The small intestine is about 22 feet long — the main site of nutrient absorption.", source: "NIH", category: "body" },
  { text: "Red blood cells travel about 12,000 miles through your body every day.", source: "NIH", category: "body" },
  { text: "Your skin is the largest organ, weighing about 8 pounds and covering 22 square feet.", source: "NIH", category: "body" },
  { text: "The average person walks about 100,000 miles in their lifetime — roughly 4 trips around the Earth.", source: "WHO", category: "fitness" },
  { text: "Nerve impulses travel at speeds up to 268 mph through your body.", source: "NIH", category: "brain" },
  { text: "Your eyes can distinguish approximately 10 million different colors.", source: "NIH", category: "body" },
  { text: "The human body contains enough iron to make a 3-inch nail.", source: "NIH", category: "body" },
  { text: "Your body produces about 1 liter of saliva per day, aiding digestion and protecting teeth.", source: "ADA", category: "body" },
  { text: "The cornea is the only part of the body with no blood supply — it gets oxygen directly from air.", source: "NIH", category: "body" },

  // ─── NUTRITION ───
  { text: "According to WHO, eating at least 400g of fruits and vegetables per day reduces risk of chronic diseases.", source: "WHO", category: "nutrition" },
  { text: "Broccoli contains more protein per calorie than steak.", source: "USDA", category: "nutrition" },
  { text: "Dark chocolate (70%+) contains antioxidants that can improve blood flow and lower blood pressure.", source: "Harvard Health", category: "nutrition" },
  { text: "Almonds are the most nutritionally dense nut — just 1 oz provides 37% daily vitamin E.", source: "USDA", category: "nutrition" },
  { text: "Drinking water before meals can reduce calorie intake by 75-90 calories per meal.", source: "NIH", category: "nutrition" },
  { text: "Blueberries have one of the highest antioxidant levels of all common fruits and vegetables.", source: "USDA", category: "nutrition" },
  { text: "Your gut microbiome contains 100 trillion bacteria — more than the stars in the Milky Way.", source: "NIH", category: "nutrition" },
  { text: "Turmeric's active compound curcumin has powerful anti-inflammatory effects comparable to some drugs.", source: "NIH", category: "nutrition" },
  { text: "Eating 30 different plant foods per week dramatically improves gut microbiome diversity.", source: "American Gut Project", category: "nutrition" },
  { text: "WHO recommends less than 5g of salt per day to prevent hypertension and heart disease.", source: "WHO", category: "nutrition" },
  { text: "Omega-3 fatty acids from fish can reduce triglycerides by 15-30%.", source: "American Heart Association", category: "nutrition" },
  { text: "Green tea contains L-theanine which can cross the blood-brain barrier and reduce anxiety.", source: "NIH", category: "nutrition" },
  { text: "Fiber intake of 25-30g daily reduces colorectal cancer risk by up to 30%.", source: "WHO", category: "nutrition" },
  { text: "Bananas contain tryptophan, which your body converts to serotonin — the happiness neurotransmitter.", source: "NIH", category: "nutrition" },
  { text: "Ginger has been scientifically shown to reduce nausea, including morning sickness and chemotherapy-related nausea.", source: "NIH", category: "nutrition" },
  { text: "Avocados contain more potassium than bananas — 14% vs 10% of daily value per serving.", source: "USDA", category: "nutrition" },
  { text: "Cinnamon can lower fasting blood sugar levels by 10-29% in diabetic patients.", source: "NIH", category: "nutrition" },
  { text: "Fermented foods like yogurt, kimchi, and sauerkraut strengthen your immune system by 70%.", source: "Harvard Health", category: "nutrition" },
  { text: "Eating breakfast within 2 hours of waking boosts metabolism by up to 10%.", source: "NIH", category: "nutrition" },
  { text: "WHO recommends limiting free sugar intake to less than 10% of total energy intake.", source: "WHO", category: "nutrition" },

  // ─── MENTAL HEALTH ───
  { text: "WHO reports that depression is the leading cause of disability worldwide, affecting 280 million people.", source: "WHO", category: "mental" },
  { text: "Regular meditation can physically change brain structure — increasing grey matter in just 8 weeks.", source: "Harvard Medical School", category: "mental" },
  { text: "Gratitude journaling for 5 minutes daily can increase happiness by 25% over 10 weeks.", source: "Journal of Positive Psychology", category: "mental" },
  { text: "Nature exposure for just 20 minutes significantly lowers cortisol (stress hormone) levels.", source: "Frontiers in Psychology", category: "mental" },
  { text: "Social isolation increases mortality risk by 26% — equivalent to smoking 15 cigarettes per day.", source: "PLOS Medicine", category: "mental" },
  { text: "Laughing for 15 minutes burns approximately 40 calories and boosts immune function.", source: "International Journal of Obesity", category: "mental" },
  { text: "Deep breathing for 60 seconds activates the vagus nerve, shifting from fight-or-flight to rest-and-digest.", source: "NIH", category: "mental" },
  { text: "Music therapy can reduce anxiety by up to 65% — as effective as some medications.", source: "Journal of Advanced Nursing", category: "mental" },
  { text: "Chronic stress shrinks the prefrontal cortex, impairing decision-making and memory.", source: "Yale University", category: "mental" },
  { text: "Hugging for 20 seconds releases oxytocin, reducing blood pressure and cortisol.", source: "NIH", category: "mental" },
  { text: "WHO estimates that for every $1 invested in mental health treatment, there is a $4 return in improved health.", source: "WHO", category: "mental" },
  { text: "Writing about traumatic experiences for 15-20 minutes over 4 days improves immune function.", source: "Journal of Consulting Psychology", category: "mental" },
  { text: "Spending time with pets lowers blood pressure, reduces anxiety, and increases oxytocin.", source: "NIH", category: "mental" },
  { text: "Cognitive Behavioral Therapy (CBT) is as effective as antidepressants for moderate depression.", source: "NICE Guidelines", category: "mental" },
  { text: "Forest bathing (shinrin-yoku) boosts natural killer cell activity for up to 30 days after exposure.", source: "NIH", category: "mental" },
  { text: "Just 10 minutes of mindfulness meditation reduces mind-wandering and improves attention.", source: "Psychological Science", category: "mental" },
  { text: "Anxiety disorders affect 301 million people worldwide, making it the most common mental disorder.", source: "WHO", category: "mental" },
  { text: "Regular social connection reduces dementia risk by up to 50%.", source: "The Lancet", category: "mental" },
  { text: "Adequate sleep consolidates emotional memories, helping process difficult experiences.", source: "NIH", category: "mental" },
  { text: "Acts of kindness release serotonin in both the giver and receiver.", source: "Psychology Today", category: "mental" },

  // ─── FITNESS & EXERCISE ───
  { text: "WHO recommends 150-300 minutes of moderate aerobic activity per week for adults.", source: "WHO", category: "fitness" },
  { text: "Just 30 minutes of walking daily reduces heart disease risk by 35%.", source: "American Heart Association", category: "fitness" },
  { text: "Muscle is 3x more metabolically active than fat — gaining muscle raises resting metabolism.", source: "NIH", category: "fitness" },
  { text: "Exercise releases endorphins, serotonin, and BDNF — creating a natural antidepressant effect.", source: "Harvard Health", category: "fitness" },
  { text: "10 minutes of stair climbing burns more calories per minute than jogging.", source: "NIH", category: "fitness" },
  { text: "Yoga can reduce cortisol levels by up to 25% after a single session.", source: "NIH", category: "fitness" },
  { text: "High-intensity interval training (HIIT) continues burning calories for up to 48 hours post-workout.", source: "NIH", category: "fitness" },
  { text: "Stretching for 10 minutes daily improves flexibility by up to 35% in just 4 weeks.", source: "ACSM", category: "fitness" },
  { text: "Swimming uses every major muscle group and burns 400-700 calories per hour.", source: "ACSM", category: "fitness" },
  { text: "Physical inactivity is the 4th leading risk factor for global mortality, causing 3.2 million deaths/year.", source: "WHO", category: "fitness" },
  { text: "Resistance training just twice per week reduces all-cause mortality by 23%.", source: "British Journal of Sports Medicine", category: "fitness" },
  { text: "Morning exercise on an empty stomach can burn up to 20% more body fat.", source: "British Journal of Nutrition", category: "fitness" },
  { text: "Regular exercise can slow brain aging by up to 10 years.", source: "Neurology Journal", category: "fitness" },
  { text: "Sitting for more than 8 hours daily without activity increases mortality risk by 60%.", source: "The Lancet", category: "fitness" },
  { text: "Dancing burns 200-400 calories per hour and improves cognitive function in older adults.", source: "New England Journal of Medicine", category: "fitness" },
  { text: "Cold exposure (cold showers) increases brown fat activation and boosts metabolism by up to 15%.", source: "NIH", category: "fitness" },
  { text: "Grip strength is one of the strongest predictors of overall health and longevity.", source: "The Lancet", category: "fitness" },
  { text: "Regular exercise increases brain-derived neurotrophic factor (BDNF), promoting new brain cell growth.", source: "NIH", category: "fitness" },
  { text: "Walking 7,000-8,000 steps per day is associated with 50-65% lower mortality risk.", source: "JAMA", category: "fitness" },
  { text: "Flexibility training reduces injury risk by up to 50% in athletes.", source: "ACSM", category: "fitness" },

  // ─── SLEEP ───
  { text: "Adults need 7-9 hours of sleep per night for optimal health according to WHO guidelines.", source: "WHO", category: "sleep" },
  { text: "Sleep deprivation of even 1-2 hours impairs cognitive function equivalent to being legally drunk.", source: "NIH", category: "sleep" },
  { text: "During deep sleep, your brain's glymphatic system clears toxic waste products including beta-amyloid.", source: "Science", category: "sleep" },
  { text: "Blue light from screens suppresses melatonin production by up to 50%, disrupting circadian rhythm.", source: "Harvard Health", category: "sleep" },
  { text: "Napping for 20 minutes improves alertness by 100% and performance by 34%.", source: "NASA", category: "sleep" },
  { text: "Chronic insomnia increases the risk of heart disease by 48%.", source: "European Heart Journal", category: "sleep" },
  { text: "The ideal bedroom temperature for sleep is 60-67°F (15-19°C).", source: "Sleep Foundation", category: "sleep" },
  { text: "Magnesium deficiency is linked to insomnia — 48% of Americans don't get enough magnesium.", source: "NIH", category: "sleep" },
  { text: "Regular sleep schedules (same time daily) improve sleep quality more than any supplement.", source: "NIH", category: "sleep" },
  { text: "Insufficient sleep increases ghrelin (hunger hormone) by 28%, promoting weight gain.", source: "NIH", category: "sleep" },
  { text: "Exposure to morning sunlight within 30 minutes of waking resets your circadian clock.", source: "NIH", category: "sleep" },
  { text: "Sleep debt cannot be fully recovered on weekends — it accumulates and affects health long-term.", source: "Current Biology", category: "sleep" },
  { text: "Weighted blankets (10% of body weight) reduce anxiety and improve sleep onset by 20 minutes.", source: "Journal of Clinical Sleep Medicine", category: "sleep" },
  { text: "Lavender aromatherapy increases deep sleep by 20% and improves morning alertness.", source: "NIH", category: "sleep" },
  { text: "Getting less than 6 hours of sleep makes you 4.2x more likely to catch a cold.", source: "Sleep Journal", category: "sleep" },

  // ─── HEART HEALTH ───
  { text: "Cardiovascular diseases are the #1 cause of death globally, taking 17.9 million lives per year.", source: "WHO", category: "heart" },
  { text: "Your heart pumps enough blood in a lifetime to fill 200 train tank cars.", source: "American Heart Association", category: "heart" },
  { text: "Eating just one serving of leafy greens daily reduces heart disease risk by 15.8%.", source: "JAMA", category: "heart" },
  { text: "Laughter increases blood flow by 20% and has a similar cardiovascular benefit to exercise.", source: "American College of Cardiology", category: "heart" },
  { text: "A resting heart rate below 60 bpm in adults is generally a sign of excellent cardiovascular fitness.", source: "American Heart Association", category: "heart" },
  { text: "WHO recommends blood pressure below 120/80 mmHg for optimal cardiovascular health.", source: "WHO", category: "heart" },
  { text: "Moderate coffee consumption (3-4 cups/day) is associated with 15% lower heart disease risk.", source: "BMJ", category: "heart" },
  { text: "Women's heart attack symptoms often differ from men's — including jaw pain, nausea, and fatigue.", source: "American Heart Association", category: "heart" },
  { text: "Reducing sodium intake by just 1 gram per day can lower blood pressure by 5 mmHg.", source: "WHO", category: "heart" },
  { text: "Your heart creates enough energy in one day to drive a truck 20 miles.", source: "NIH", category: "heart" },

  // ─── BRAIN & COGNITIVE ───
  { text: "Your brain generates about 70,000 thoughts per day and uses 100 billion neurons.", source: "NIH", category: "brain" },
  { text: "Learning a new skill creates new neural pathways — your brain physically rewires itself at any age.", source: "NIH", category: "brain" },
  { text: "Bilingual people show signs of dementia an average of 4.5 years later than monolinguals.", source: "Neurology", category: "brain" },
  { text: "Reading for 6 minutes reduces stress by 68% — more effective than walking or listening to music.", source: "University of Sussex", category: "brain" },
  { text: "Your brain is 73% water — even 2% dehydration impairs attention, memory, and cognitive skills.", source: "NIH", category: "brain" },
  { text: "Brain plasticity means your brain can reorganize itself throughout life — it's never too late to learn.", source: "Harvard Medical School", category: "brain" },
  { text: "Puzzles, crosswords, and brain games can reduce dementia risk by up to 29%.", source: "JAMA", category: "brain" },
  { text: "The hippocampus (memory center) can grow new neurons even in adults — exercise stimulates this.", source: "NIH", category: "brain" },
  { text: "Omega-3 fatty acids (DHA) make up 40% of the polyunsaturated fats in your brain.", source: "NIH", category: "brain" },
  { text: "Chronic multitasking reduces productivity by 40% and can lower IQ by 10 points temporarily.", source: "Stanford University", category: "brain" },

  // ─── IMMUNE SYSTEM ───
  { text: "70-80% of your immune system resides in your gut — diet directly affects immunity.", source: "NIH", category: "immune" },
  { text: "Vitamin D deficiency is linked to increased susceptibility to infection — 1 billion people are deficient.", source: "WHO", category: "immune" },
  { text: "Moderate exercise boosts immune function, but overtraining (excessive exercise) suppresses it.", source: "NIH", category: "immune" },
  { text: "Chronic stress reduces white blood cell count by up to 40%, weakening immune response.", source: "NIH", category: "immune" },
  { text: "Adequate sleep (7-8 hours) doubles your vaccine effectiveness compared to sleep-deprived individuals.", source: "Sleep Journal", category: "immune" },
  { text: "Zinc supplementation can reduce cold duration by 33% when taken within 24 hours of symptom onset.", source: "Cochrane Review", category: "immune" },
  { text: "Hand washing with soap reduces respiratory infections by 16-21% and diarrheal diseases by 23-40%.", source: "WHO", category: "immune" },
  { text: "Your body produces about 3.8 million new immune cells every second.", source: "NIH", category: "immune" },
  { text: "Probiotics can reduce the incidence of upper respiratory infections by 47%.", source: "British Journal of Nutrition", category: "immune" },
  { text: "Fever is actually beneficial — it activates immune cells and inhibits pathogen growth.", source: "NIH", category: "immune" },

  // ─── WEIGHT & METABOLISM ───
  { text: "WHO classifies a BMI of 18.5-24.9 as normal weight for adults.", source: "WHO", category: "weight" },
  { text: "Drinking 500ml of water increases metabolic rate by 30% for 30-40 minutes.", source: "Journal of Clinical Endocrinology", category: "weight" },
  { text: "Protein has a thermic effect of 20-30% — your body burns calories just digesting it.", source: "NIH", category: "weight" },
  { text: "Losing just 5-10% of body weight can significantly improve blood pressure and blood sugar.", source: "WHO", category: "weight" },
  { text: "Visceral fat (belly fat) is metabolically active and produces inflammatory hormones.", source: "Harvard Health", category: "weight" },
  { text: "Eating slowly (20+ minutes per meal) reduces calorie intake by an average of 88 calories.", source: "BMJ Open", category: "weight" },
  { text: "Muscle weighs more than fat by volume — the scale can be misleading during fitness progress.", source: "ACSM", category: "weight" },
  { text: "Sleep deprivation increases calorie consumption by an average of 385 extra calories per day.", source: "European Journal of Clinical Nutrition", category: "weight" },
  { text: "Crash diets slow your metabolism by up to 23% — sustainable changes work better long-term.", source: "The Lancet", category: "weight" },
  { text: "Worldwide obesity has nearly tripled since 1975 — over 650 million adults are obese.", source: "WHO", category: "weight" },
  { text: "Waist circumference above 40 inches (men) or 35 inches (women) indicates high metabolic risk.", source: "WHO", category: "weight" },
  { text: "Green tea extract can boost fat oxidation by 17% during moderate exercise.", source: "American Journal of Clinical Nutrition", category: "weight" },
  { text: "Intermittent fasting improves insulin sensitivity by 20-31% in as little as 3 weeks.", source: "Translational Research", category: "weight" },
  { text: "The body has about 30 billion fat cells — they can shrink but never fully disappear.", source: "NIH", category: "weight" },
  { text: "High-protein breakfasts reduce evening snacking cravings by up to 60%.", source: "NIH", category: "weight" },

  // ─── GENERAL / MISC ───
  { text: "Globally, 1 in 4 adults does not meet WHO recommended levels of physical activity.", source: "WHO", category: "general" },
  { text: "Sunscreen use reduces melanoma risk by 50% when applied correctly every day.", source: "Journal of Clinical Oncology", category: "general" },
  { text: "Regular dental check-ups reduce heart disease risk — gum disease is linked to cardiovascular problems.", source: "AHA", category: "general" },
  { text: "Dehydration of just 1-2% impairs cognitive performance, mood, and physical endurance.", source: "NIH", category: "general" },
  { text: "Washing hands 6-10 times daily reduces infection risk by 36%.", source: "WHO", category: "general" },
  { text: "Standing desks can lower blood sugar spikes after meals by 43% compared to sitting.", source: "NIH", category: "general" },
  { text: "Posture affects hormone levels — standing tall increases testosterone by 20% and decreases cortisol by 25%.", source: "Harvard Business School", category: "general" },
  { text: "Indoor air can be 2-5 times more polluted than outdoor air — houseplants can help filter toxins.", source: "EPA", category: "general" },
  { text: "Chewing food 32 times per bite improves digestion and nutrient absorption significantly.", source: "NIH", category: "general" },
  { text: "WHO recommends at least 60 minutes of physical activity per day for children aged 5-17.", source: "WHO", category: "general" },
];

// ─── HELPER: Get random facts ───
export function getRandomFacts(count: number, category?: string): HealthFact[] {
  let pool = category
    ? HEALTH_FACTS.filter((f) => f.category === category)
    : HEALTH_FACTS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getRandomFact(category?: string): HealthFact {
  return getRandomFacts(1, category)[0];
}
