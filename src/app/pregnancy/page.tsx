"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Baby, Heart, Calendar, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Week {
  week: number;
  babySize: string;
  babyWeight: string;
  sizeComparison: string;
  emoji: string;
  babyDev: string;
  momChanges: string;
  tips: string[];
}

const pregnancyWeeks: Week[] = [
  { week: 1, babySize: "0.1mm", babyWeight: "<1g", sizeComparison: "Size of a vanilla seed", emoji: "\u{1F331}", babyDev: "Fertilization occurs, cells begin dividing rapidly", momChanges: "No noticeable symptoms yet, body preparing for implantation", tips: ["Start taking prenatal vitamins", "Track your cycle carefully", "Maintain a balanced diet"] },
  { week: 2, babySize: "0.2mm", babyWeight: "<1g", sizeComparison: "Size of a pinhead", emoji: "\u{2728}", babyDev: "Egg is fertilized and travels down the fallopian tube", momChanges: "Slight bloating possible, hormonal shifts beginning", tips: ["Continue folic acid supplements", "Stay hydrated", "Avoid smoking and alcohol"] },
  { week: 3, babySize: "0.3mm", babyWeight: "<1g", sizeComparison: "Size of a tiny seed", emoji: "\u{1F331}", babyDev: "Blastocyst implants into the uterine wall", momChanges: "Possible light spotting from implantation", tips: ["Rest if you notice spotting", "Keep taking folic acid", "Limit caffeine intake"] },
  { week: 4, babySize: "1mm", babyWeight: "<1g", sizeComparison: "Size of a poppy seed", emoji: "\u{1F331}", babyDev: "Heart begins to form, neural tube developing", momChanges: "Missed period, fatigue, breast tenderness", tips: ["Take folic acid daily", "Avoid alcohol completely", "Schedule your first prenatal appointment"] },
  { week: 5, babySize: "2mm", babyWeight: "<1g", sizeComparison: "Size of a sesame seed", emoji: "\u{1FAD8}", babyDev: "Heart starts beating, brain and spinal cord forming", momChanges: "Morning sickness may begin, frequent urination", tips: ["Eat small frequent meals", "Get plenty of rest", "Stay away from raw fish and deli meats"] },
  { week: 6, babySize: "5mm", babyWeight: "<1g", sizeComparison: "Size of a lentil", emoji: "\u{1FAD8}", babyDev: "Facial features begin forming, arm and leg buds appear", momChanges: "Nausea, mood swings, heightened sense of smell", tips: ["Try ginger for nausea", "Wear comfortable clothing", "Avoid strong odors"] },
  { week: 7, babySize: "1cm", babyWeight: "<1g", sizeComparison: "Size of a blueberry", emoji: "\u{1FAD0}", babyDev: "Brain growing rapidly, hands and feet forming", momChanges: "Increased fatigue, food aversions", tips: ["Nap when you can", "Eat what you can tolerate", "Start a pregnancy journal"] },
  { week: 8, babySize: "1.6cm", babyWeight: "1g", sizeComparison: "Size of a raspberry", emoji: "\u{1F347}", babyDev: "Fingers and toes forming, baby starts moving", momChanges: "Frequent urination, bloating, constipation", tips: ["Increase fiber intake", "Drink 8-10 glasses of water", "Schedule first ultrasound"] },
  { week: 9, babySize: "2.3cm", babyWeight: "2g", sizeComparison: "Size of a grape", emoji: "\u{1F347}", babyDev: "Essential organs formed, muscles developing", momChanges: "Mood swings, waist thickening slightly", tips: ["Start pelvic floor exercises", "Avoid hot tubs and saunas", "Consider genetic screening options"] },
  { week: 10, babySize: "3.1cm", babyWeight: "4g", sizeComparison: "Size of a kumquat", emoji: "\u{1F34A}", babyDev: "Bones and cartilage forming, vital organs functioning", momChanges: "Visible veins, round ligament pain beginning", tips: ["Wear supportive underwear", "Stretch gently each morning", "Discuss screening tests with doctor"] },
  { week: 11, babySize: "4.1cm", babyWeight: "7g", sizeComparison: "Size of a fig", emoji: "\u{1F95D}", babyDev: "Tooth buds appear, fingers and toes separating", momChanges: "Less nausea for some, skin changes possible", tips: ["Use gentle skincare products", "Stay active with light exercise", "Eat calcium-rich foods"] },
  { week: 12, babySize: "5.4cm", babyWeight: "14g", sizeComparison: "Size of a lime", emoji: "\u{1F34B}", babyDev: "All organs formed, fingers and toes defined, reflexes developing", momChanges: "Morning sickness may ease, reduced fatigue", tips: ["Announce pregnancy if ready", "Start pregnancy-safe exercises", "Eat protein-rich foods"] },
  { week: 13, babySize: "7.4cm", babyWeight: "23g", sizeComparison: "Size of a peach", emoji: "\u{1F351}", babyDev: "Vocal cords developing, intestines move into abdomen", momChanges: "Energy returning, appetite increasing", tips: ["Begin second trimester exercises", "Eat iron-rich foods", "Stay consistent with prenatal visits"] },
  { week: 14, babySize: "8.7cm", babyWeight: "43g", sizeComparison: "Size of a lemon", emoji: "\u{1F34B}", babyDev: "Facial muscles working, can squint and frown", momChanges: "Less frequent urination, growing belly", tips: ["Invest in maternity clothes", "Practice good posture", "Continue prenatal vitamins"] },
  { week: 15, babySize: "10.1cm", babyWeight: "70g", sizeComparison: "Size of an apple", emoji: "\u{1F34E}", babyDev: "Skeleton hardening, taste buds forming", momChanges: "Possible nosebleeds, nasal congestion", tips: ["Use a humidifier at night", "Keep tissues handy", "Do Kegel exercises daily"] },
  { week: 16, babySize: "11.6cm", babyWeight: "100g", sizeComparison: "Size of an avocado", emoji: "\u{1F951}", babyDev: "Eyes can sense light, nervous system maturing", momChanges: "May feel first flutters of movement", tips: ["Note any movements you feel", "Sleep on your side", "Get enough omega-3 fatty acids"] },
  { week: 17, babySize: "13cm", babyWeight: "140g", sizeComparison: "Size of a pear", emoji: "\u{1F350}", babyDev: "Fat stores developing, sweat glands forming", momChanges: "Growing belly, increased appetite", tips: ["Eat healthy snacks between meals", "Stay physically active", "Moisturize your belly to prevent stretch marks"] },
  { week: 18, babySize: "14.2cm", babyWeight: "190g", sizeComparison: "Size of a sweet potato", emoji: "\u{1F360}", babyDev: "Ears fully formed, baby can hear sounds", momChanges: "Feeling more movement, possible dizziness", tips: ["Talk and sing to your baby", "Rise slowly from sitting", "Prepare for anatomy scan"] },
  { week: 19, babySize: "15.3cm", babyWeight: "240g", sizeComparison: "Size of a mango", emoji: "\u{1F96D}", babyDev: "Sensory brain areas developing rapidly", momChanges: "Round ligament pain, skin darkening possible", tips: ["Wear sunscreen daily", "Consider a belly support band", "Plan your nursery"] },
  { week: 20, babySize: "16.4cm", babyWeight: "300g", sizeComparison: "Size of a banana", emoji: "\u{1F34C}", babyDev: "Baby can hear sounds, movements felt regularly", momChanges: "Baby bump clearly visible, feeling regular kicks", tips: ["Get your anatomy scan", "Start sleeping on your left side", "Stay well hydrated"] },
  { week: 21, babySize: "26.7cm", babyWeight: "360g", sizeComparison: "Size of a carrot", emoji: "\u{1F955}", babyDev: "Eyebrows and eyelids present, movements coordinated", momChanges: "Increased appetite, possible varicose veins", tips: ["Elevate your legs when resting", "Eat nutrient-dense foods", "Register for birthing classes"] },
  { week: 22, babySize: "27.8cm", babyWeight: "430g", sizeComparison: "Size of a papaya", emoji: "\u{1F953}", babyDev: "Lips and eyelids more defined, grip strengthening", momChanges: "Stretch marks may appear, linea nigra forming", tips: ["Use cocoa butter on stretch marks", "Practice relaxation techniques", "Start thinking about a birth plan"] },
  { week: 23, babySize: "28.9cm", babyWeight: "500g", sizeComparison: "Size of a large mango", emoji: "\u{1F96D}", babyDev: "Lungs developing surfactant, skin wrinkling", momChanges: "Swollen ankles, Braxton Hicks contractions possible", tips: ["Elevate feet when possible", "Wear comfortable shoes", "Stay active with walking"] },
  { week: 24, babySize: "30cm", babyWeight: "600g", sizeComparison: "Size of an ear of corn", emoji: "\u{1F33D}", babyDev: "Inner ear fully developed, sense of balance forming", momChanges: "Backache, leg cramps at night", tips: ["Stretch before bed", "Take warm baths for pain relief", "Consider prenatal massage"] },
  { week: 25, babySize: "34.6cm", babyWeight: "660g", sizeComparison: "Size of a rutabaga", emoji: "\u{1F96C}", babyDev: "Baby responds to your voice, gaining more fat", momChanges: "Hemorrhoids possible, trouble sleeping", tips: ["Use a pregnancy pillow", "Eat high-fiber foods", "Practice sleep hygiene"] },
  { week: 26, babySize: "35.6cm", babyWeight: "760g", sizeComparison: "Size of a zucchini", emoji: "\u{1F952}", babyDev: "Eyes opening for the first time, lungs maturing", momChanges: "Pelvic pressure, increased Braxton Hicks", tips: ["Take glucose tolerance test", "Rest when you feel tired", "Start counting kicks daily"] },
  { week: 27, babySize: "36.6cm", babyWeight: "875g", sizeComparison: "Size of a cauliflower", emoji: "\u{1F966}", babyDev: "Regular sleep-wake cycles, brain very active", momChanges: "Third trimester begins, fatigue returns", tips: ["Nap during the day if possible", "Keep up gentle exercise", "Finalize birth plan preferences"] },
  { week: 28, babySize: "37.6cm", babyWeight: "1kg", sizeComparison: "Size of an eggplant", emoji: "\u{1F346}", babyDev: "Can blink eyes, dream during REM sleep", momChanges: "Shortness of breath, frequent urination returns", tips: ["Get Rh factor test if needed", "Tour the hospital or birthing center", "Practice breathing exercises"] },
  { week: 29, babySize: "38.6cm", babyWeight: "1.15kg", sizeComparison: "Size of a butternut squash", emoji: "\u{1F9C8}", babyDev: "Bones fully developed but still soft, muscles stronger", momChanges: "Heartburn, difficulty finding comfortable positions", tips: ["Eat smaller meals more often", "Use extra pillows for support", "Finalize baby name list"] },
  { week: 30, babySize: "39.9cm", babyWeight: "1.3kg", sizeComparison: "Size of a cabbage", emoji: "\u{1F96C}", babyDev: "Brain developing rapidly, can regulate body temperature", momChanges: "Shortness of breath, backache intensifying", tips: ["Practice breathing exercises", "Pack your hospital bag", "Count baby kicks daily"] },
  { week: 31, babySize: "41.1cm", babyWeight: "1.5kg", sizeComparison: "Size of a coconut", emoji: "\u{1F965}", babyDev: "All five senses functioning, rapid brain connections", momChanges: "More frequent Braxton Hicks, leaking colostrum possible", tips: ["Wear a supportive bra", "Install the car seat", "Prepare freezer meals"] },
  { week: 32, babySize: "42.4cm", babyWeight: "1.7kg", sizeComparison: "Size of a jicama", emoji: "\u{1F954}", babyDev: "Toenails visible, lungs nearly mature, practicing breathing", momChanges: "Difficulty breathing, heartburn worsening", tips: ["Sleep propped up slightly", "Avoid spicy foods if heartburn is bad", "Review signs of preterm labor"] },
  { week: 33, babySize: "43.7cm", babyWeight: "1.9kg", sizeComparison: "Size of a pineapple", emoji: "\u{1F34D}", babyDev: "Bones hardening, immune system strengthening", momChanges: "Increased pelvic pressure, frequent urination", tips: ["Do perineal massage", "Wash newborn clothes", "Finalize childcare plans"] },
  { week: 34, babySize: "45cm", babyWeight: "2.1kg", sizeComparison: "Size of a cantaloupe", emoji: "\u{1F348}", babyDev: "Central nervous system maturing, lungs nearly ready", momChanges: "Fatigue, swelling in hands and feet", tips: ["Rest with feet elevated", "Stay well hydrated", "Review hospital route and backup plan"] },
  { week: 35, babySize: "46.2cm", babyWeight: "2.4kg", sizeComparison: "Size of a honeydew melon", emoji: "\u{1F348}", babyDev: "Most organs fully developed, gaining weight rapidly", momChanges: "Frequent need to urinate, trouble sleeping", tips: ["Try relaxation techniques before bed", "Prepare postpartum supplies", "Know the signs of labor"] },
  { week: 36, babySize: "47.4cm", babyWeight: "2.6kg", sizeComparison: "Size of a romaine lettuce", emoji: "\u{1F96C}", babyDev: "Baby dropping into pelvis (lightening), skull still soft", momChanges: "Easier breathing as baby drops, increased pelvic pressure", tips: ["Attend prenatal checkups weekly", "Practice labor positions", "Rest as much as possible"] },
  { week: 37, babySize: "48.6cm", babyWeight: "2.9kg", sizeComparison: "Size of a winter melon", emoji: "\u{1F348}", babyDev: "Considered early term, organs ready to function outside womb", momChanges: "Nesting instinct, mucus plug may dislodge", tips: ["Finish hospital bag packing", "Install infant car seat properly", "Know when to call the doctor"] },
  { week: 38, babySize: "49.8cm", babyWeight: "3.1kg", sizeComparison: "Size of a leek bundle", emoji: "\u{1F96C}", babyDev: "Brain and lungs continue maturing, firm grasp", momChanges: "Braxton Hicks more frequent, cervix softening", tips: ["Stay close to home", "Keep your phone charged", "Rest and conserve energy"] },
  { week: 39, babySize: "50.7cm", babyWeight: "3.2kg", sizeComparison: "Size of a small pumpkin", emoji: "\u{1F383}", babyDev: "Fully developed, building fat layer for temperature regulation", momChanges: "Increased discharge, possible bloody show", tips: ["Watch for labor signs closely", "Do gentle walks to encourage labor", "Stay calm and positive"] },
  { week: 40, babySize: "51.2cm", babyWeight: "3.4kg", sizeComparison: "Size of a watermelon", emoji: "\u{1F349}", babyDev: "Fully developed and ready for birth, strong reflexes", momChanges: "Contractions may begin, water may break", tips: ["Know the signs of active labor", "Rest as much as possible", "Stay near the hospital"] },
  { week: 41, babySize: "51.5cm", babyWeight: "3.5kg", sizeComparison: "Size of a large watermelon", emoji: "\u{1F349}", babyDev: "Continuing to grow, nails may be long, very alert", momChanges: "Doctor may discuss induction, more monitoring", tips: ["Attend all scheduled monitoring appointments", "Try natural labor induction methods", "Stay patient and relaxed"] },
  { week: 42, babySize: "51.7cm", babyWeight: "3.6kg", sizeComparison: "Size of a jackfruit", emoji: "\u{1F349}", babyDev: "Post-term, skin may be dry and peeling, fully mature", momChanges: "Induction likely recommended, close monitoring", tips: ["Follow your doctor\u0027s guidance on induction", "Stay calm and trust your care team", "Have your hospital bag ready to go"] },
];

function getTrimester(week: number): number {
  if (week <= 12) return 1;
  if (week <= 26) return 2;
  return 3;
}

function getTrimesterLabel(trimester: number): string {
  if (trimester === 1) return "First Trimester";
  if (trimester === 2) return "Second Trimester";
  return "Third Trimester";
}

export default function PregnancyPage() {
  const [selectedWeek, setSelectedWeek] = useState(4);
  const [weekInput, setWeekInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentWeekData = pregnancyWeeks.find((w) => w.week === selectedWeek)!;
  const trimester = getTrimester(selectedWeek);
  const progress = ((selectedWeek) / 42) * 100;

  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.querySelector(`[data-week="${selectedWeek}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [selectedWeek]);

  const handleWeekInput = () => {
    const match = weekInput.match(/(\d+)/);
    if (match) {
      const w = parseInt(match[1], 10);
      if (w >= 1 && w <= 42) {
        setSelectedWeek(w);
        setWeekInput("");
      }
    }
  };

  const goToWeek = (direction: "prev" | "next") => {
    setSelectedWeek((prev) =>
      direction === "prev" ? Math.max(1, prev - 1) : Math.min(42, prev + 1)
    );
  };

  return (
    <div className="min-h-screen bg-rose-50/40">
      {/* Header */}
      <div className="bg-white border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Baby className="w-8 h-8 text-rose-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Pregnancy Week by Week
              </h1>
              <span className="text-3xl">👶</span>
            </div>
            <p className="text-gray-500 mt-2">
              Track your baby&apos;s growth and your body&apos;s changes every week
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Trimester Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-gray-700">
                Week {selectedWeek} of 42
              </span>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                trimester === 1 && "bg-emerald-100 text-emerald-700",
                trimester === 2 && "bg-amber-100 text-amber-700",
                trimester === 3 && "bg-rose-100 text-rose-700"
              )}
            >
              {getTrimesterLabel(trimester)}
            </Badge>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Trimester markers */}
            <div
              className="absolute top-0 w-px h-full bg-gray-300"
              style={{ left: `${(12 / 42) * 100}%` }}
            />
            <div
              className="absolute top-0 w-px h-full bg-gray-300"
              style={{ left: `${(26 / 42) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-gray-400">
            <span>Week 1</span>
            <span>Week 12</span>
            <span>Week 26</span>
            <span>Week 42</span>
          </div>
        </motion.div>

        {/* Week Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100"
        >
          <p className="text-sm text-gray-500 mb-3">Quick jump to your week:</p>
          <div className="flex gap-2">
            <Input
              placeholder="I'm 20 weeks pregnant"
              value={weekInput}
              onChange={(e) => setWeekInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleWeekInput()}
              className="border-rose-200 focus-visible:ring-rose-300"
            />
            <Button
              onClick={handleWeekInput}
              className="bg-rose-500 hover:bg-rose-600 text-white shrink-0"
            >
              Go
            </Button>
          </div>
        </motion.div>

        {/* Week Selector - Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100"
        >
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goToWeek("prev")}
              disabled={selectedWeek === 1}
              className="shrink-0 text-gray-400 hover:text-rose-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div
              ref={scrollRef}
              className="flex gap-1.5 overflow-x-auto scrollbar-hide py-1 flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {pregnancyWeeks.map((w) => (
                <button
                  key={w.week}
                  data-week={w.week}
                  onClick={() => setSelectedWeek(w.week)}
                  className={cn(
                    "shrink-0 w-9 h-9 rounded-full text-xs font-medium transition-all duration-200",
                    selectedWeek === w.week
                      ? "bg-rose-500 text-white shadow-md scale-110"
                      : getTrimester(w.week) === 1
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : getTrimester(w.week) === 2
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                  )}
                >
                  {w.week}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goToWeek("next")}
              disabled={selectedWeek === 42}
              className="shrink-0 text-gray-400 hover:text-rose-500"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Selected Week Card */}
        <motion.div
          key={selectedWeek}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 text-center border-b border-rose-100">
            <div className="text-7xl mb-3">{currentWeekData.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-900">
              Week {currentWeekData.week}
            </h2>
            <p className="text-rose-500 font-medium mt-1">
              {currentWeekData.sizeComparison}
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-500">
              <span>
                <strong className="text-gray-700">{currentWeekData.babySize}</strong> long
              </span>
              <span className="text-gray-300">|</span>
              <span>
                <strong className="text-gray-700">{currentWeekData.babyWeight}</strong> weight
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-5">
            {/* Baby Development */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Baby className="w-4 h-4 text-rose-400" />
                <h3 className="font-semibold text-gray-900">Baby Development</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-6">
                {currentWeekData.babyDev}
              </p>
            </div>

            {/* Mom's Changes */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <h3 className="font-semibold text-gray-900">Your Body</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-6">
                {currentWeekData.momChanges}
              </p>
            </div>

            {/* Tips */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-rose-400" />
                <h3 className="font-semibold text-gray-900">Tips for This Week</h3>
              </div>
              <ul className="space-y-2 pl-6">
                {currentWeekData.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-rose-400 mt-0.5 shrink-0">&#10003;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-rose-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToWeek("prev")}
              disabled={selectedWeek === 1}
              className="text-gray-500 hover:text-rose-500"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Week {selectedWeek - 1}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToWeek("next")}
              disabled={selectedWeek === 42}
              className="text-gray-500 hover:text-rose-500"
            >
              Week {selectedWeek + 1}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="text-center text-xs text-gray-400 pb-8">
          <p>
            This information is for educational purposes only and is not a substitute for
            professional medical advice. Always consult your healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
}
