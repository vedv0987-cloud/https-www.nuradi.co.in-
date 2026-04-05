export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  readTime: string;
  date: string;
  author: string;
  img: string;
}

export const ARTICLES: Article[] = [
  {
    id: 1, slug: "10-signs-dehydrated",
    title: "10 Signs You're Dehydrated",
    excerpt: "Dehydration sneaks up on you faster than you think. From persistent headaches to dark urine, learn the warning signs your body sends when it desperately needs more water.",
    content: [
      "Dehydration happens when your body loses more fluids than you take in, disrupting nearly every system you depend on. Most people only notice it when thirsty — but by then, you're already 2% dehydrated.",
      "**1. Persistent headache** — Your brain is 75% water. When dehydrated, it temporarily contracts, pulling away from the skull and triggering pain.",
      "**2. Dark yellow urine** — Pale straw color means you're hydrated. Dark amber signals concentration and a clear warning to drink water.",
      "**3. Dry mouth and bad breath** — Saliva has antibacterial properties. Less water means less saliva, leading to bacterial overgrowth.",
      "**4. Fatigue and brain fog** — Even mild dehydration reduces cognitive performance, memory, and attention by up to 12%.",
      "**5. Muscle cramps** — Electrolyte imbalance from water loss causes sudden, painful muscle contractions, especially during exercise.",
      "**6. Dizziness when standing** — Dehydration lowers blood volume, causing temporary drops in blood pressure when you stand up quickly.",
      "**7. Dry, flaky skin** — Skin is your body's largest organ. Insufficient hydration reduces elasticity and accelerates aging.",
      "**8. Constipation** — Your colon pulls water from stool when dehydrated, leading to harder, more difficult bowel movements.",
      "**9. Rapid heartbeat** — To compensate for reduced blood volume, your heart beats faster to maintain circulation.",
      "**10. Sugar cravings** — The liver needs water to release glycogen. Without it, your body craves quick sugar fixes.",
      "**The fix?** Drink 8-10 glasses (2-2.5 liters) daily. Add more if you exercise, live in hot climates, or consume caffeine and alcohol.",
    ],
    category: "Wellness", readTime: "4 min read", date: "March 28, 2026", author: "Dr. Priya Sharma",
    img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1200&q=80",
  },
  {
    id: 2, slug: "intermittent-fasting-truth",
    title: "The Truth About Intermittent Fasting",
    excerpt: "Intermittent fasting has taken the wellness world by storm, but does it really work? We break down the science, the myths, and who should avoid it entirely.",
    content: [
      "Intermittent fasting (IF) has exploded in popularity, promising weight loss, better focus, and longevity. But separating hype from science is crucial.",
      "**How it works:** IF cycles between eating and fasting periods. The 16:8 method (fast 16 hours, eat within 8) is most popular. During fasting, insulin drops and the body starts burning stored fat.",
      "**Proven benefits:** Studies show IF can reduce body weight 3-8% over 3-24 weeks, lower LDL cholesterol, improve insulin sensitivity, and trigger autophagy (cellular cleanup).",
      "**The myths:** IF is NOT magic — calories still matter. You can't eat junk during your window and expect results. It also doesn't 'boost' metabolism dramatically.",
      "**Who should AVOID IF:** Pregnant women, diabetics on medication, people with eating disorder history, underweight individuals, and those with low blood pressure.",
      "**Indian context:** Many Indians already practice forms of fasting (ekadashi, karva chauth). IF can be adapted to cultural patterns, but skipping proper nutrition isn't fasting — it's malnutrition.",
      "**Getting started:** Begin with 12:12, then work up to 14:10 or 16:8. Drink water, black coffee, or herbal tea during fasting. Break fast with protein and vegetables, not carbs.",
      "**Bottom line:** IF is a valid eating pattern for some, but not a miracle. Sustainable habits beat restrictive protocols every time.",
    ],
    category: "Nutrition", readTime: "7 min read", date: "March 25, 2026", author: "Dr. Arjun Mehta",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
  },
  {
    id: 3, slug: "10000-steps-matters",
    title: "Why Walking 10,000 Steps Actually Matters",
    excerpt: "The 10,000-step goal isn't just a marketing gimmick. Recent studies reveal that consistent daily walking reduces cardiovascular risk by up to 30% and boosts mental clarity.",
    content: [
      "The 10,000-step target originated from a 1960s Japanese pedometer marketing campaign — but modern research validates it as a meaningful health threshold.",
      "**Cardiovascular benefits:** A 2023 Harvard study found that adults walking 8,000-10,000 daily steps had 30% lower all-cause mortality compared to sedentary individuals (under 4,000 steps).",
      "**Mental health boost:** Walking increases BDNF (brain-derived neurotrophic factor), which acts like fertilizer for brain cells. Regular walkers show 26% lower rates of depression.",
      "**Weight management:** 10,000 steps burns approximately 300-500 calories depending on weight and pace. Combined with balanced eating, it supports sustainable weight loss.",
      "**Joint health:** Unlike running, walking is low-impact. It lubricates joints, strengthens supporting muscles, and reduces arthritis risk.",
      "**The 7,000-step threshold:** Newer research suggests 7,000 steps captures most benefits. Going from 4,000 to 7,000 shows the biggest mortality reduction.",
      "**How to hit 10,000:** Park farther away, take stairs, walk during calls, post-dinner strolls, and walking meetings. Break it into 3 sessions of 3,000+ steps.",
      "**Track but don't obsess:** Use a smartphone or fitness tracker, but focus on consistency over perfection. Even 6,000 steps daily beats being sedentary.",
    ],
    category: "Fitness", readTime: "5 min read", date: "March 22, 2026", author: "Dr. Sneha Kulkarni",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80",
  },
  {
    id: 4, slug: "indian-superfoods-daily",
    title: "Indian Superfoods You Should Eat Daily",
    excerpt: "From turmeric to amla, India's traditional kitchen holds powerful superfoods backed by modern science. Discover which staples can transform your daily health.",
    content: [
      "India's 5,000-year-old food wisdom holds remarkable nutritional gems that Western science is only now validating.",
      "**Turmeric (Haldi):** Curcumin, its active compound, is one of the most studied natural anti-inflammatories. Add black pepper to boost absorption 2000%.",
      "**Amla (Indian Gooseberry):** Contains 20x more vitamin C than oranges. Boosts immunity, improves hair/skin, and supports liver detoxification. One amla daily is transformative.",
      "**Ghee:** Clarified butter rich in butyric acid, fat-soluble vitamins (A, D, E, K), and CLA. In moderation (1-2 tsp daily), it supports gut health and metabolism.",
      "**Tulsi (Holy Basil):** An adaptogen that balances cortisol. Daily tulsi tea reduces stress, boosts immunity, and has antimicrobial properties.",
      "**Moringa:** Contains 7x more vitamin C than oranges, 4x more calcium than milk, 3x more potassium than bananas. Add powder to smoothies or sabji.",
      "**Jeera (Cumin):** Aids digestion, improves iron absorption, regulates blood sugar. Start your day with jeera water for 2 weeks — notice the difference.",
      "**Curd (Dahi):** Probiotic powerhouse. One bowl daily supports gut flora, boosts immunity, and aids calcium absorption.",
      "**Bottom line:** These superfoods are already in your kitchen. Consistency beats exotic imports every time.",
    ],
    category: "Nutrition", readTime: "6 min read", date: "March 19, 2026", author: "Dr. Kavita Desai",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80",
  },
  {
    id: 5, slug: "stress-affects-body",
    title: "How Stress Affects Your Body",
    excerpt: "Chronic stress does far more than ruin your mood. It silently damages your heart, gut, and immune system. Here's what happens inside when stress goes unchecked.",
    content: [
      "Stress triggers a cascade of physical reactions designed for survival. But when chronic, this ancient response becomes destructive.",
      "**Heart:** Stress increases blood pressure and heart rate. Chronically elevated cortisol damages artery walls, raising heart attack risk by 27%.",
      "**Gut:** Your gut contains 500 million neurons. Stress disrupts gut bacteria, causes IBS, acid reflux, and alters nutrient absorption.",
      "**Immune system:** Cortisol suppresses immune function. Chronically stressed people catch 2x more colds and heal wounds 40% slower.",
      "**Brain:** Chronic stress shrinks the hippocampus (memory center) and enlarges the amygdala (fear center), increasing anxiety and impairing memory.",
      "**Skin:** Stress worsens acne, eczema, psoriasis, and hair loss. It also accelerates visible aging through oxidative damage.",
      "**Sleep:** Elevated cortisol disrupts melatonin production, making it harder to fall asleep and stay asleep. Poor sleep worsens stress — a vicious cycle.",
      "**Managing it:** Daily 10-min meditation, regular exercise, 7-8 hours sleep, social connection, and limiting caffeine all measurably reduce cortisol.",
      "**When to seek help:** If stress affects work, relationships, or sleep for 2+ weeks, consult a mental health professional.",
    ],
    category: "Mental Health", readTime: "6 min read", date: "March 16, 2026", author: "Dr. Rohan Patel",
    img: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=1200&q=80",
  },
];
