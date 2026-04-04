"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Question { question: string; options: string[]; correct: number; explanation: string; }
interface Quiz { title: string; emoji: string; questions: Question[]; }

const QUIZZES: Quiz[] = [
  { title: "How Healthy Are You?", emoji: "🏥", questions: [
    { question: "How many glasses of water do you drink daily?", options: ["1-2", "3-4", "5-6", "7-8+"], correct: 3, explanation: "Aim for 8+ glasses daily for optimal hydration." },
    { question: "How often do you exercise?", options: ["Never", "1-2x/week", "3-4x/week", "Daily"], correct: 2, explanation: "WHO recommends 150 min of moderate exercise per week." },
    { question: "How many hours do you sleep?", options: ["<5 hours", "5-6 hours", "7-8 hours", "9+ hours"], correct: 2, explanation: "7-8 hours is optimal for adults." },
    { question: "How often do you eat fruits/vegetables?", options: ["Rarely", "Few times a week", "Daily", "Multiple times daily"], correct: 3, explanation: "5+ servings of fruits/veg daily reduces disease risk." },
    { question: "Do you smoke?", options: ["Yes, daily", "Occasionally", "Quit recently", "Never"], correct: 3, explanation: "Non-smokers live on average 10 years longer." },
    { question: "How is your stress level?", options: ["Very high", "High", "Moderate", "Low"], correct: 3, explanation: "Chronic stress weakens immunity and harms heart health." },
    { question: "Do you get regular health checkups?", options: ["Never", "Only when sick", "Yearly", "Every 6 months"], correct: 2, explanation: "Annual checkups catch problems early." },
    { question: "How much processed food do you eat?", options: ["Most meals", "Often", "Sometimes", "Rarely"], correct: 3, explanation: "Processed food is linked to heart disease and cancer." },
    { question: "Do you take any vitamins/supplements?", options: ["No", "Occasionally", "Vitamin D only", "As recommended by doctor"], correct: 3, explanation: "Take supplements based on blood test results." },
    { question: "How would you rate your overall health?", options: ["Poor", "Below average", "Good", "Excellent"], correct: 2, explanation: "Self-rated health is a strong predictor of longevity." },
  ] },
  { title: "Indian Food IQ", emoji: "🍛", questions: [
    { question: "Which Indian food has the most protein per serving?", options: ["Rajma", "Aloo Gobi", "Puri", "White Rice"], correct: 0, explanation: "Rajma has ~8g protein per katori — one of the best vegetarian sources." },
    { question: "Which cooking oil is healthiest for the heart?", options: ["Coconut oil", "Mustard oil", "Olive oil", "Palm oil"], correct: 2, explanation: "Olive oil has the most heart-healthy monounsaturated fats." },
    { question: "How many teaspoons of sugar in one glass of Real juice?", options: ["2", "4", "7", "10"], correct: 2, explanation: "About 7 teaspoons (28g sugar) — almost same as a Coke!" },
    { question: "Which is lower in calories — 2 idlis or 1 puri?", options: ["2 Idlis (~100 cal)", "1 Puri (~150 cal)", "Same", "Depends"], correct: 0, explanation: "2 idlis = ~100 cal vs 1 puri = ~150 cal. Idli wins!" },
    { question: "Which dal has the highest protein?", options: ["Toor dal", "Moong dal", "Masoor dal", "Chana dal"], correct: 3, explanation: "Chana dal has ~9g protein per katori — highest among common dals." },
    { question: "Is coconut water good for diabetics?", options: ["Yes, unlimited", "Yes, in moderation", "No, too much sugar", "Only tender coconut"], correct: 1, explanation: "Coconut water is okay in moderation but contains natural sugars." },
    { question: "How many calories in a plate of chicken biryani?", options: ["200", "350", "500", "700"], correct: 2, explanation: "A standard plate of chicken biryani has ~500 calories." },
    { question: "Which is the healthiest Indian breakfast?", options: ["Poha", "Chole bhature", "Idli sambar", "Parantha with butter"], correct: 2, explanation: "Idli sambar is steamed, high protein, and easy to digest." },
    { question: "Is ghee healthy?", options: ["No, always bad", "Yes, in small amounts", "Only for cooking", "Same as butter"], correct: 1, explanation: "Ghee in moderation (1-2 tsp) has healthy fats and vitamins." },
    { question: "Which Indian spice is anti-inflammatory?", options: ["Red chili", "Turmeric", "Garam masala", "Mustard seeds"], correct: 1, explanation: "Turmeric contains curcumin — a powerful anti-inflammatory compound." },
  ] },
  { title: "Heart Health Quiz", emoji: "❤️", questions: [
    { question: "What is a normal resting heart rate for adults?", options: ["40-50 bpm", "60-100 bpm", "100-120 bpm", "120-150 bpm"], correct: 1, explanation: "60-100 bpm is normal. Athletes may have lower rates." },
    { question: "Which cholesterol is called 'good' cholesterol?", options: ["LDL", "HDL", "VLDL", "Triglycerides"], correct: 1, explanation: "HDL carries cholesterol away from arteries — higher is better." },
    { question: "What is considered high blood pressure?", options: ["120/80", "130/85", "140/90 or higher", "150/100"], correct: 2, explanation: "140/90 or higher is considered hypertension (high BP)." },
    { question: "Which food helps lower blood pressure?", options: ["Red meat", "Bananas", "White bread", "Cheese"], correct: 1, explanation: "Bananas are rich in potassium which helps lower blood pressure." },
    { question: "What is the biggest risk factor for heart disease?", options: ["Genetics", "High BP", "Smoking", "All of the above"], correct: 3, explanation: "All of these are major risk factors — but smoking is the most preventable." },
    { question: "How much exercise prevents heart disease?", options: ["10 min/day", "30 min, 5x/week", "1 hour daily", "Weekend only"], correct: 1, explanation: "150 minutes of moderate exercise per week significantly reduces heart risk." },
    { question: "Which symptom is NOT typical of a heart attack?", options: ["Chest pain", "Arm pain", "Leg cramps", "Shortness of breath"], correct: 2, explanation: "Leg cramps are not typically a heart attack symptom." },
    { question: "What does aspirin do during a heart attack?", options: ["Stops pain", "Thins blood to prevent clot", "Lowers BP", "Nothing helpful"], correct: 1, explanation: "Aspirin thins blood and can help prevent the clot from growing." },
    { question: "At what age should cholesterol screening start?", options: ["20 years", "30 years", "40 years", "50 years"], correct: 0, explanation: "Cholesterol screening should start at age 20 and repeat every 5 years." },
    { question: "Can young people get heart attacks?", options: ["No, only over 50", "Very rare", "Yes, increasingly common", "Only if overweight"], correct: 2, explanation: "Heart attacks in people under 40 are increasing due to stress and lifestyle." },
  ] },
  { title: "Diabetes Myth vs Fact", emoji: "🩸", questions: [
    { question: "Diabetes is caused by eating too much sugar.", options: ["Myth", "Fact", "Partially true", "Only for Type 1"], correct: 2, explanation: "Partially true — sugar alone doesn't cause diabetes, but obesity from excess calories does increase risk." },
    { question: "Type 1 diabetes can be prevented.", options: ["True", "False", "Only with diet", "Only with exercise"], correct: 1, explanation: "False — Type 1 is an autoimmune condition and cannot be prevented." },
    { question: "People with diabetes can never eat sweets.", options: ["True", "False", "Only on holidays", "Only sugar-free sweets"], correct: 1, explanation: "False — diabetics can eat sweets in moderation as part of a managed diet." },
    { question: "Which organ produces insulin?", options: ["Liver", "Kidney", "Pancreas", "Heart"], correct: 2, explanation: "The pancreas produces insulin. In diabetes, this function is impaired." },
    { question: "What HbA1c level indicates diabetes?", options: ["<5.7%", "5.7-6.4%", "6.5% or higher", "Above 8%"], correct: 2, explanation: "HbA1c of 6.5% or higher indicates diabetes. 5.7-6.4% is prediabetes." },
    { question: "Diabetes only affects old people.", options: ["Myth", "Fact", "Only Type 2", "Only in India"], correct: 0, explanation: "Myth — diabetes increasingly affects young adults and even children." },
    { question: "Is diabetes reversible?", options: ["Never", "Type 2 can be managed/reversed", "Both types", "Only with surgery"], correct: 1, explanation: "Type 2 diabetes can be reversed or managed with lifestyle changes, especially if caught early." },
    { question: "Which Indian food is best for diabetics?", options: ["White rice", "Roti with dal", "Biryani", "Puri"], correct: 1, explanation: "Roti with dal provides fiber and protein with lower glycemic index than rice." },
    { question: "Does stress affect blood sugar?", options: ["No effect", "Yes, raises it", "Yes, lowers it", "Only in Type 1"], correct: 1, explanation: "Stress hormones like cortisol raise blood sugar levels significantly." },
    { question: "How often should diabetics check their feet?", options: ["Monthly", "Weekly", "Daily", "Only if pain"], correct: 2, explanation: "Daily foot checks prevent diabetic foot complications — a leading cause of amputation." },
  ] },
  { title: "First Aid Quiz", emoji: "🆘", questions: [
    { question: "What should you do FIRST for a burn?", options: ["Apply butter", "Cool under water", "Pop blisters", "Apply ice"], correct: 1, explanation: "Cool under running water for 20 minutes. Never apply butter, ice, or toothpaste." },
    { question: "During CPR, how deep should chest compressions be?", options: ["1 inch", "2 inches", "3 inches", "As deep as possible"], correct: 1, explanation: "Compressions should be about 2 inches deep for adults." },
    { question: "What does FAST stand for in stroke recognition?", options: ["First Aid Safety Tips", "Face Arms Speech Time", "Fast Action Saves Time", "Find A Specialist Today"], correct: 1, explanation: "FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 108." },
    { question: "For a nosebleed, should you lean forward or back?", options: ["Lean back", "Lean forward", "Lie flat", "Stand up straight"], correct: 1, explanation: "Lean forward to prevent blood from going down the throat." },
    { question: "What is the correct Heimlich maneuver position?", options: ["Hands on chest", "Hands below ribs, above navel", "Hands on back", "Hands on throat"], correct: 1, explanation: "Place fist just above the navel and below the ribcage." },
    { question: "Should you remove an object embedded in a wound?", options: ["Yes, immediately", "Only if small", "No, stabilize it", "Push it deeper"], correct: 2, explanation: "Never remove embedded objects — stabilize them and get medical help." },
    { question: "What should you give someone having a diabetic low sugar episode?", options: ["Water", "Sugar or juice", "Insulin", "Nothing"], correct: 1, explanation: "Give glucose tablets, sugar water, or fruit juice immediately." },
    { question: "For a suspected spinal injury, should you move the person?", options: ["Yes, to safety", "Yes, carefully", "No, keep still", "Only their head"], correct: 2, explanation: "Keep them completely still and call 108 — moving them could cause paralysis." },
    { question: "What is the emergency number in India?", options: ["911", "108", "999", "112"], correct: 1, explanation: "108 is the ambulance number. 112 is the universal emergency number." },
    { question: "How long should you apply pressure to stop bleeding?", options: ["2 minutes", "5 minutes", "10+ minutes", "Until it stops by itself"], correct: 2, explanation: "Apply firm pressure for at least 10 minutes without checking." },
  ] },
];

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const quiz = selectedQuiz !== null ? QUIZZES[selectedQuiz] : null;
  const question = quiz ? quiz.questions[currentQ] : null;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question!.correct) setScore((s) => s + 1);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quiz!.questions.length) {
      setQuizDone(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const reset = () => {
    setSelectedQuiz(null);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setQuizDone(false);
  };

  const getMedal = (pct: number) => {
    if (pct >= 90) return { emoji: "🥇", label: "Gold — Outstanding!" };
    if (pct >= 70) return { emoji: "🥈", label: "Silver — Great job!" };
    if (pct >= 50) return { emoji: "🥉", label: "Bronze — Not bad!" };
    return { emoji: "💪", label: "Keep learning!" };
  };

  // Quiz selection screen
  if (selectedQuiz === null) {
    return (
      <div className="min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 pb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" /> Health Quiz
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Test Your Health Knowledge</h1>
            <p className="text-muted-foreground text-sm">Pick a quiz and challenge yourself</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {QUIZZES.map((q, i) => (
              <motion.button key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedQuiz(i)}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow text-left group">
                <span className="text-3xl block mb-3">{q.emoji}</span>
                <h3 className="font-bold group-hover:text-black transition-colors">{q.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{q.questions.length} Questions · ~3 min</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Quiz done screen
  if (quizDone) {
    const pct = Math.round((score / quiz!.questions.length) * 100);
    const medal = getMedal(pct);
    return (
      <div className="min-h-screen">
        <div className="max-w-lg mx-auto px-4 sm:px-8 pt-12 pb-20 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-3xl border shadow-xl p-8">
            <span className="text-6xl block mb-4">{medal.emoji}</span>
            <h2 className="text-2xl font-bold mb-1">{medal.label}</h2>
            <p className="text-4xl font-extrabold my-4">{score}/{quiz!.questions.length}</p>
            <p className="text-muted-foreground text-sm">{pct}% correct on {quiz!.title}</p>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={reset} className="flex-1 rounded-xl"><RotateCcw className="w-4 h-4 mr-2" />Try Another</Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 pt-8 pb-20">
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">{quiz!.title}</p>
          <p className="text-sm text-muted-foreground">{currentQ + 1}/{quiz!.questions.length}</p>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
          <div className="h-full bg-[#1a1a1a] rounded-full transition-all" style={{ width: `${((currentQ + 1) / quiz!.questions.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold mb-6">{question!.question}</h2>
            <div className="space-y-3">
              {question!.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 text-sm font-medium transition-all",
                    selected === null ? "hover:border-gray-400 border-gray-200" :
                    i === question!.correct ? "border-green-500 bg-green-50" :
                    i === selected ? "border-red-500 bg-red-50" : "border-gray-200 opacity-50"
                  )}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={selected !== null && i === question!.correct ? { borderColor: "#22c55e", color: "#22c55e" } : selected === i ? { borderColor: "#ef4444", color: "#ef4444" } : {}}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {selected !== null && i === question!.correct && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />}
                    {selected === i && i !== question!.correct && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-gray-50 border">
                <p className="text-sm text-muted-foreground">{question!.explanation}</p>
              </motion.div>
            )}

            {selected !== null && (
              <Button onClick={nextQuestion} className="w-full mt-6 h-12 rounded-xl bg-[#1a1a1a] hover:bg-black">
                {currentQ + 1 >= quiz!.questions.length ? "See Result" : "Next Question"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>

        <button onClick={reset} className="text-xs text-muted-foreground mt-4 hover:underline block mx-auto">← Back to all quizzes</button>
      </div>
    </div>
  );
}
