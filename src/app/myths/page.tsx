"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Search, Brain, XCircle, CheckCircle2 } from "lucide-react";

interface Myth {
  id: number;
  myth: string;
  truth: string;
  category: string;
  emoji: string;
}

const MYTHS: Myth[] = [
  // ── Nutrition (1-10) ──
  { id: 1, myth: "Eggs raise cholesterol dangerously", truth: "Dietary cholesterol in eggs has minimal impact on blood cholesterol for most people. Eggs are nutrient-dense and safe in moderation.", category: "Nutrition", emoji: "🥚" },
  { id: 2, myth: "Brown sugar is healthier than white sugar", truth: "Brown sugar is just white sugar with molasses added. The nutritional difference is negligible — both are sugar.", category: "Nutrition", emoji: "🍬" },
  { id: 3, myth: "Eating fat makes you fat", truth: "Healthy fats are essential for the body. Weight gain comes from excess calories overall, not from fat alone.", category: "Nutrition", emoji: "🧈" },
  { id: 4, myth: "Detox diets cleanse toxins from your body", truth: "Your liver and kidneys already detox your body 24/7. Most detox diets have no scientific backing and can be harmful.", category: "Nutrition", emoji: "🥤" },
  { id: 5, myth: "You must drink 8 glasses of water a day", truth: "Water needs vary by person, activity level, and climate. Drink when thirsty — your body is good at signaling its needs.", category: "Nutrition", emoji: "💧" },
  { id: 6, myth: "Microwaved food is radioactive", truth: "Microwaves use non-ionizing radiation that heats food — it does not make food radioactive or destroy nutrients more than other cooking methods.", category: "Nutrition", emoji: "📡" },
  { id: 7, myth: "Organic food is always healthier", truth: "Organic food has fewer pesticide residues, but nutritional differences are minimal. Conventional produce is still safe and nutritious.", category: "Nutrition", emoji: "🥕" },
  { id: 8, myth: "Carrots fix night vision", truth: "Carrots contain vitamin A which supports eye health, but they won't give you superhuman night vision. This myth originated from WWII propaganda.", category: "Nutrition", emoji: "🥕" },
  { id: 9, myth: "Breakfast is the most important meal of the day", truth: "This claim was popularized by cereal companies. Meal timing matters less than overall diet quality — skipping breakfast isn't harmful for everyone.", category: "Nutrition", emoji: "🥣" },
  { id: 10, myth: "MSG is dangerous", truth: "Decades of research show MSG is safe for the general population. It occurs naturally in tomatoes, cheese, and many other foods.", category: "Nutrition", emoji: "🧂" },

  // ── Exercise (11-20) ──
  { id: 11, myth: "No pain, no gain", truth: "Pain during exercise is a warning sign of injury, not progress. Effective workouts can be challenging without being painful.", category: "Exercise", emoji: "💪" },
  { id: 12, myth: "Spot reduction works — target fat in specific areas", truth: "You cannot burn fat from a specific body part by exercising it. Fat loss occurs systemically across the whole body.", category: "Exercise", emoji: "🎯" },
  { id: 13, myth: "More sweat means more fat burned", truth: "Sweat is your body's cooling mechanism, not an indicator of fat burning. You can burn plenty of calories without drenching your shirt.", category: "Exercise", emoji: "💦" },
  { id: 14, myth: "Lifting weights makes women bulky", truth: "Women have far less testosterone than men, making it very difficult to bulk up. Strength training helps build lean, toned muscle.", category: "Exercise", emoji: "🏋️" },
  { id: 15, myth: "Stretching before exercise prevents injury", truth: "Static stretching before exercise can actually reduce performance. Dynamic warm-ups are more effective at injury prevention.", category: "Exercise", emoji: "🤸" },
  { id: 16, myth: "Running ruins your knees", truth: "Research shows runners actually have lower rates of knee osteoarthritis than non-runners. Running strengthens joint cartilage over time.", category: "Exercise", emoji: "🏃" },
  { id: 17, myth: "Morning exercise is the best time to work out", truth: "The best time to exercise is whenever you can do it consistently. There is no magic hour — consistency matters more than timing.", category: "Exercise", emoji: "🌅" },
  { id: 18, myth: "Crunches will give you a six-pack", truth: "Abs are revealed by reducing body fat through diet and overall exercise, not by doing thousands of crunches alone.", category: "Exercise", emoji: "🔥" },
  { id: 19, myth: "Cardio is the best exercise for weight loss", truth: "While cardio burns calories, strength training builds muscle which increases resting metabolism. A combination of both is most effective.", category: "Exercise", emoji: "🚴" },
  { id: 20, myth: "You need protein within 30 minutes of exercise", truth: "The 'anabolic window' is much wider than 30 minutes. Total daily protein intake matters far more than exact timing.", category: "Exercise", emoji: "🥛" },

  // ── Diabetes (21-30) ──
  { id: 21, myth: "Eating sugar directly causes diabetes", truth: "Type 1 is autoimmune; Type 2 is caused by insulin resistance from genetics, obesity, and lifestyle — not sugar intake alone.", category: "Diabetes", emoji: "🍭" },
  { id: 22, myth: "Only overweight people get diabetes", truth: "While obesity is a risk factor, thin and normal-weight people can and do develop Type 2 diabetes due to genetics and other factors.", category: "Diabetes", emoji: "⚖️" },
  { id: 23, myth: "Needing insulin means you've failed to manage diabetes", truth: "Insulin is a necessary treatment, not a failure. Type 2 diabetes is progressive, and insulin helps maintain healthy blood sugar levels.", category: "Diabetes", emoji: "💉" },
  { id: 24, myth: "Diabetics can't eat fruit", truth: "Fruits contain natural sugars but also fiber, vitamins, and antioxidants. Diabetics can enjoy fruit in moderation as part of a balanced diet.", category: "Diabetes", emoji: "🍎" },
  { id: 25, myth: "Type 2 diabetes can never be reversed", truth: "Many people achieve remission of Type 2 diabetes through significant lifestyle changes, weight loss, and medical intervention.", category: "Diabetes", emoji: "🔄" },
  { id: 26, myth: "Diabetes is not a serious disease", truth: "Unmanaged diabetes can lead to heart disease, kidney failure, blindness, amputations, and death. It requires lifelong management.", category: "Diabetes", emoji: "⚠️" },
  { id: 27, myth: "Bitter gourd (karela) cures diabetes", truth: "Bitter gourd may have mild blood-sugar-lowering effects, but it is not a cure or replacement for medical treatment.", category: "Diabetes", emoji: "🥒" },
  { id: 28, myth: "Only old people get diabetes", truth: "Type 1 often appears in childhood, and Type 2 is increasingly diagnosed in young adults and even teenagers.", category: "Diabetes", emoji: "👶" },
  { id: 29, myth: "Diabetics must eat special 'diabetic' food", truth: "People with diabetes can eat normal, healthy food. 'Diabetic' branded products are often expensive and not necessary.", category: "Diabetes", emoji: "🍽️" },
  { id: 30, myth: "Insulin is addictive", truth: "Insulin is a naturally occurring hormone, not an addictive substance. Your body either needs external insulin or it doesn't.", category: "Diabetes", emoji: "💊" },

  // ── Skin & Hair (31-40) ──
  { id: 31, myth: "Shaving makes hair grow back thicker", truth: "Shaving cuts hair at the surface, creating a blunt edge that feels coarse. It doesn't change hair thickness, color, or growth rate.", category: "Skin & Hair", emoji: "🪒" },
  { id: 32, myth: "Chocolate causes acne", truth: "Current research shows diet can influence acne, but chocolate alone isn't a direct cause. Hormones and genetics play bigger roles.", category: "Skin & Hair", emoji: "🍫" },
  { id: 33, myth: "You only need sunscreen on sunny days", truth: "UV rays penetrate clouds and cause skin damage year-round. Sunscreen should be worn daily, regardless of weather.", category: "Skin & Hair", emoji: "☀️" },
  { id: 34, myth: "Toothpaste cures pimples", truth: "Toothpaste contains ingredients that can irritate and dry out skin, potentially making breakouts worse. Use proper acne treatments.", category: "Skin & Hair", emoji: "🦷" },
  { id: 35, myth: "Oiling your scalp cures baldness", truth: "Hair oil can condition existing hair but cannot reverse genetic hair loss or regrow hair from dormant follicles.", category: "Skin & Hair", emoji: "🧴" },
  { id: 36, myth: "Drinking lots of water fixes dry skin", truth: "Hydration helps overall health, but dry skin is primarily treated with topical moisturizers. Drinking water alone won't cure dry skin.", category: "Skin & Hair", emoji: "🚰" },
  { id: 37, myth: "Getting a tan is a sign of good health", truth: "A tan is actually skin damage. UV exposure increases the risk of skin cancer, premature aging, and hyperpigmentation.", category: "Skin & Hair", emoji: "🏖️" },
  { id: 38, myth: "Natural/herbal skincare products are always safe", truth: "Natural ingredients can cause allergic reactions and irritation. 'Natural' doesn't mean safe — poison ivy is natural too.", category: "Skin & Hair", emoji: "🌿" },
  { id: 39, myth: "Stress causes grey hair", truth: "Genetics primarily determine when you grey. However, recent studies suggest extreme stress may accelerate greying in some cases.", category: "Skin & Hair", emoji: "🧓" },
  { id: 40, myth: "Dandruff means you have a dirty scalp", truth: "Dandruff is caused by a yeast-like fungus, dry skin, or sensitivity to hair products — not poor hygiene.", category: "Skin & Hair", emoji: "❄️" },

  // ── Mental Health (41-50) ──
  { id: 41, myth: "Depression is just feeling sad", truth: "Depression is a complex medical condition involving brain chemistry changes, affecting energy, sleep, appetite, and ability to function.", category: "Mental Health", emoji: "🧠" },
  { id: 42, myth: "Mental illness is rare", truth: "One in four people worldwide will experience a mental health condition in their lifetime. It is extremely common.", category: "Mental Health", emoji: "📊" },
  { id: 43, myth: "Therapy is only for weak people", truth: "Seeking therapy is a sign of strength and self-awareness. It's a proven medical treatment, like seeing a doctor for a physical ailment.", category: "Mental Health", emoji: "🛋️" },
  { id: 44, myth: "Children can't have depression or anxiety", truth: "Mental health conditions can affect people of all ages, including young children. Early intervention is crucial for better outcomes.", category: "Mental Health", emoji: "👧" },
  { id: 45, myth: "Positive thinking alone can cure mental illness", truth: "Mental illness involves neurochemical and structural brain changes. While positivity helps, it cannot replace professional treatment.", category: "Mental Health", emoji: "😊" },
  { id: 46, myth: "ADHD is just laziness or lack of discipline", truth: "ADHD is a neurodevelopmental disorder with measurable differences in brain structure and function. It is not a character flaw.", category: "Mental Health", emoji: "⚡" },
  { id: 47, myth: "Anxiety is not a real illness", truth: "Anxiety disorders are medically recognized conditions with real physical symptoms including heart palpitations, breathing difficulties, and more.", category: "Mental Health", emoji: "😰" },
  { id: 48, myth: "Psychiatric medication changes your personality", truth: "Properly prescribed medication helps restore normal brain function. It treats symptoms so your true personality can come through.", category: "Mental Health", emoji: "💊" },
  { id: 49, myth: "Only traumatic events cause PTSD", truth: "PTSD can develop from various experiences including prolonged stress, medical events, or witnessing trauma — not just combat or assault.", category: "Mental Health", emoji: "🔔" },
  { id: 50, myth: "People with mental illness are violent and dangerous", truth: "People with mental illness are far more likely to be victims of violence than perpetrators. Most violent acts are by people without mental illness.", category: "Mental Health", emoji: "🚫" },

  // ── Pregnancy (51-60) ──
  { id: 51, myth: "Pregnant women must eat for two", truth: "Pregnancy only requires about 300 extra calories per day in later trimesters, not double portions. Quality matters more than quantity.", category: "Pregnancy", emoji: "🤰" },
  { id: 52, myth: "Exercise is dangerous during pregnancy", truth: "Moderate exercise during pregnancy is recommended by doctors. It reduces complications and helps with labor and recovery.", category: "Pregnancy", emoji: "🧘" },
  { id: 53, myth: "Coffee is completely banned during pregnancy", truth: "Moderate caffeine intake (about 200mg/day) is considered safe during pregnancy. Complete elimination is not necessary.", category: "Pregnancy", emoji: "☕" },
  { id: 54, myth: "Heartburn during pregnancy means the baby has lots of hair", truth: "Heartburn is caused by hormonal changes and the growing uterus pressing on the stomach, not by fetal hair.", category: "Pregnancy", emoji: "🔥" },
  { id: 55, myth: "Full moon triggers labor", truth: "Multiple large studies have found no correlation between lunar cycles and birth rates or labor onset.", category: "Pregnancy", emoji: "🌕" },
  { id: 56, myth: "Morning sickness only happens in the morning", truth: "Nausea during pregnancy can occur at any time of day or night. The name 'morning sickness' is misleading.", category: "Pregnancy", emoji: "🤢" },
  { id: 57, myth: "Cocoa butter prevents stretch marks", truth: "Stretch marks are largely determined by genetics and skin elasticity. No cream has been proven to prevent them.", category: "Pregnancy", emoji: "🧴" },
  { id: 58, myth: "Flying is dangerous during pregnancy", truth: "Flying is safe for most pregnancies until around 36 weeks. Airlines restrict late-term travel as a precaution, not due to proven risk.", category: "Pregnancy", emoji: "✈️" },
  { id: 59, myth: "Spicy food induces labor", truth: "There is no scientific evidence that spicy food triggers labor. It may cause heartburn but won't start contractions.", category: "Pregnancy", emoji: "🌶️" },
  { id: 60, myth: "You can tell the baby's gender by belly shape", truth: "Belly shape is determined by muscle tone, body structure, and baby's position — it has nothing to do with the baby's sex.", category: "Pregnancy", emoji: "👶" },

  // ── General Health (61-70) ──
  { id: 61, myth: "Cold weather causes colds and flu", truth: "Colds are caused by viruses, not cold temperatures. People get sick more in winter because they spend more time indoors spreading germs.", category: "General Health", emoji: "🥶" },
  { id: 62, myth: "Cracking your knuckles causes arthritis", truth: "Studies show no link between knuckle cracking and arthritis. The sound comes from gas bubbles popping in joint fluid.", category: "General Health", emoji: "🤞" },
  { id: 63, myth: "Reading in dim light permanently damages your eyes", truth: "Reading in low light can cause eye strain and fatigue, but it does not cause permanent damage to your vision.", category: "General Health", emoji: "📖" },
  { id: 64, myth: "We only use 10% of our brains", truth: "Brain imaging shows we use virtually all parts of our brain, and most of the brain is active most of the time.", category: "General Health", emoji: "🧠" },
  { id: 65, myth: "Antibiotics cure viral infections like colds and flu", truth: "Antibiotics only work against bacteria. Using them for viruses contributes to antibiotic resistance — a major global health threat.", category: "General Health", emoji: "💊" },
  { id: 66, myth: "Vaccines cause autism", truth: "This claim originated from a fraudulent, retracted study. Massive research involving millions of children confirms vaccines do not cause autism.", category: "General Health", emoji: "💉" },
  { id: 67, myth: "Hair and nails continue to grow after death", truth: "Skin dehydrates and retracts after death, making hair and nails appear longer. No actual growth occurs after death.", category: "General Health", emoji: "💀" },
  { id: 68, myth: "You lose most body heat through your head", truth: "You lose heat proportionally from any uncovered body part. The head accounts for about 10% of body surface area.", category: "General Health", emoji: "🎩" },
  { id: 69, myth: "Feed a cold, starve a fever", truth: "Your body needs nutrition and hydration when fighting any illness. Starving yourself during a fever can slow recovery.", category: "General Health", emoji: "🤒" },
  { id: 70, myth: "Blood is blue inside your veins", truth: "Blood is always red. Veins appear blue through the skin due to how light penetrates and is absorbed by tissue.", category: "General Health", emoji: "🩸" },

  // ── Indian Health Myths (71-80) ──
  { id: 71, myth: "Don't eat curd (dahi) at night", truth: "There is no scientific evidence that curd at night causes cold or mucus. It's a probiotic food that can be eaten anytime.", category: "Indian Health Myths", emoji: "🥛" },
  { id: 72, myth: "AC (air conditioning) causes cold and cough", truth: "Viruses cause colds, not cold air. Poorly maintained ACs may spread allergens, but the cool air itself doesn't make you sick.", category: "Indian Health Myths", emoji: "❄️" },
  { id: 73, myth: "Sitting on a cold floor causes piles", truth: "Piles (hemorrhoids) are caused by increased pressure in rectal veins from straining, constipation, or pregnancy — not cold surfaces.", category: "Indian Health Myths", emoji: "🪑" },
  { id: 74, myth: "Hot water with lemon detoxes your body", truth: "Your liver and kidneys handle detoxification. Lemon water is hydrating but has no special detox powers.", category: "Indian Health Myths", emoji: "🍋" },
  { id: 75, myth: "Applying hair oil regularly prevents hair fall", truth: "Oil can condition hair and reduce breakage, but it cannot treat genetic or hormonal hair loss. Results are limited to cosmetic benefits.", category: "Indian Health Myths", emoji: "💆" },
  { id: 76, myth: "Eating non-veg food during periods is harmful", truth: "There is zero scientific basis for this. Protein-rich foods like meat and eggs are actually beneficial during menstruation.", category: "Indian Health Myths", emoji: "🍗" },
  { id: 77, myth: "Tulsi (holy basil) water cures all diseases", truth: "Tulsi has some antioxidant and anti-inflammatory properties, but it is not a cure-all and cannot replace medical treatment.", category: "Indian Health Myths", emoji: "🌱" },
  { id: 78, myth: "Neem is a proven anti-cancer agent", truth: "While neem shows some promise in lab studies, there is no proven clinical evidence that it prevents or cures cancer in humans.", category: "Indian Health Myths", emoji: "🌿" },
  { id: 79, myth: "Sleeping right after eating increases weight", truth: "Weight gain depends on total caloric intake vs. expenditure, not meal timing. However, lying down after eating may worsen acid reflux.", category: "Indian Health Myths", emoji: "😴" },
  { id: 80, myth: "Don't wash your hair during periods", truth: "There is no medical reason to avoid washing hair during menstruation. This is a cultural taboo with no scientific basis.", category: "Indian Health Myths", emoji: "🚿" },
];

const CATEGORIES = [
  "All",
  "Nutrition",
  "Exercise",
  "Diabetes",
  "Skin & Hair",
  "Mental Health",
  "Pregnancy",
  "General Health",
  "Indian Health Myths",
] as const;

export default function MythsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return MYTHS.filter((m) => {
      const matchesCategory =
        activeCategory === "All" || m.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        m.myth.toLowerCase().includes(search.toLowerCase()) ||
        m.truth.toLowerCase().includes(search.toLowerCase()) ||
        m.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-black" />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Health Myths — Busted
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {MYTHS.length} common health myths debunked with science
          </p>

          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search myths..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-gray-300 bg-gray-50 text-black placeholder:text-gray-400 focus-visible:ring-black"
            />
          </div>

          {/* Category Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full text-xs transition-all",
                  activeCategory === cat
                    ? "bg-black text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Cards */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <XCircle className="mx-auto mb-3 h-10 w-10" />
            <p className="text-lg font-medium">No myths found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Top row: emoji + category */}
              <div className="flex items-center justify-between">
                <span className="text-2xl">{m.emoji}</span>
                <Badge
                  variant="outline"
                  className="border-gray-300 text-[11px] font-medium text-gray-500"
                >
                  {m.category}
                </Badge>
              </div>

              {/* Myth */}
              <div className="mt-3 flex items-start gap-2">
                <Badge className="mt-0.5 shrink-0 bg-red-600 text-[10px] font-bold text-white hover:bg-red-600">
                  MYTH
                </Badge>
                <p className="text-base font-semibold leading-snug text-gray-800 line-through decoration-red-500/60 decoration-2">
                  {m.myth}
                </p>
              </div>

              {/* Truth */}
              <div className="mt-3 flex items-start gap-2">
                <Badge className="mt-0.5 shrink-0 bg-emerald-600 text-[10px] font-bold text-white hover:bg-emerald-600">
                  TRUTH
                </Badge>
                <p className="text-sm leading-relaxed text-gray-600">
                  {m.truth}
                </p>
              </div>

              {/* Check icon */}
              <div className="mt-3 flex justify-end">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer count */}
        {filtered.length > 0 && (
          <p className="mt-8 text-center text-xs text-gray-400">
            Showing {filtered.length} of {MYTHS.length} myths
          </p>
        )}
      </main>
    </div>
  );
}
