"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { Search, Dumbbell, Heart, Sparkles, Move, Home, ChevronDown, ChevronUp, Flame, Clock, Target } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  category: string;
  duration: string;
  difficulty: string;
  calories: string;
  muscles: string[];
  steps: string[];
  emoji: string;
}

const exercises: Exercise[] = [
  // Strength (8)
  { id: 1, name: "Push-ups", category: "Strength", duration: "10 min", difficulty: "Beginner", calories: "100 kcal", muscles: ["Chest", "Triceps", "Shoulders"], steps: ["Get into a high plank position with hands shoulder-width apart.", "Lower your body until your chest nearly touches the floor.", "Keep your core tight and body in a straight line.", "Push back up to the starting position.", "Repeat for desired reps."], emoji: "💪" },
  { id: 2, name: "Squats", category: "Strength", duration: "12 min", difficulty: "Beginner", calories: "120 kcal", muscles: ["Quadriceps", "Glutes", "Hamstrings"], steps: ["Stand with feet shoulder-width apart.", "Lower your hips back and down as if sitting in a chair.", "Keep your chest up and knees over your toes.", "Go down until thighs are parallel to the ground.", "Push through your heels to return to standing."], emoji: "🦵" },
  { id: 3, name: "Lunges", category: "Strength", duration: "10 min", difficulty: "Beginner", calories: "90 kcal", muscles: ["Quadriceps", "Glutes", "Hamstrings"], steps: ["Stand tall with feet hip-width apart.", "Step forward with one leg and lower your hips.", "Both knees should bend to about 90 degrees.", "Push back to the starting position.", "Alternate legs and repeat."], emoji: "🏋️" },
  { id: 4, name: "Plank", category: "Strength", duration: "5 min", difficulty: "Intermediate", calories: "50 kcal", muscles: ["Core", "Shoulders", "Back"], steps: ["Start in a forearm plank position.", "Keep your body in a straight line from head to heels.", "Engage your core and avoid sagging hips.", "Hold the position for the desired duration."], emoji: "🧱" },
  { id: 5, name: "Deadlift", category: "Strength", duration: "15 min", difficulty: "Advanced", calories: "150 kcal", muscles: ["Back", "Glutes", "Hamstrings", "Core"], steps: ["Stand with feet hip-width apart, barbell over mid-foot.", "Hinge at hips and grip the bar just outside your knees.", "Keep your back flat and chest up.", "Drive through your heels to lift the bar.", "Stand tall, then lower the bar with control."], emoji: "🏗️" },
  { id: 6, name: "Bench Press", category: "Strength", duration: "15 min", difficulty: "Intermediate", calories: "130 kcal", muscles: ["Chest", "Triceps", "Shoulders"], steps: ["Lie flat on a bench with eyes under the bar.", "Grip the bar slightly wider than shoulder-width.", "Unrack and lower the bar to your mid-chest.", "Press the bar back up to full arm extension.", "Re-rack the bar carefully."], emoji: "🛋️" },
  { id: 7, name: "Pull-ups", category: "Strength", duration: "10 min", difficulty: "Advanced", calories: "110 kcal", muscles: ["Back", "Biceps", "Shoulders"], steps: ["Hang from a bar with palms facing away.", "Engage your back and pull your chin above the bar.", "Keep your core tight throughout the movement.", "Lower yourself slowly to the starting position."], emoji: "🙆" },
  { id: 8, name: "Shoulder Press", category: "Strength", duration: "12 min", difficulty: "Intermediate", calories: "100 kcal", muscles: ["Shoulders", "Triceps", "Upper Back"], steps: ["Hold dumbbells at shoulder height with palms forward.", "Press the weights overhead until arms are fully extended.", "Keep your core braced and avoid arching your back.", "Lower the weights back to shoulder height with control."], emoji: "🏔️" },

  // Cardio (8)
  { id: 9, name: "Running", category: "Cardio", duration: "30 min", difficulty: "Beginner", calories: "300 kcal", muscles: ["Legs", "Core", "Cardiovascular System"], steps: ["Start with a 5-minute warm-up walk.", "Gradually increase pace to a comfortable jog.", "Maintain an upright posture and swing your arms.", "Breathe rhythmically through your nose and mouth.", "Cool down with a slow walk for 5 minutes."], emoji: "🏃" },
  { id: 10, name: "Jumping Jacks", category: "Cardio", duration: "10 min", difficulty: "Beginner", calories: "100 kcal", muscles: ["Full Body", "Calves", "Shoulders"], steps: ["Stand with feet together and arms at your sides.", "Jump and spread your feet while raising arms overhead.", "Jump back to the starting position.", "Maintain a steady rhythm throughout."], emoji: "⭐" },
  { id: 11, name: "Burpees", category: "Cardio", duration: "10 min", difficulty: "Advanced", calories: "150 kcal", muscles: ["Full Body", "Chest", "Legs"], steps: ["Stand tall, then squat down and place hands on the floor.", "Jump your feet back into a plank position.", "Perform a push-up.", "Jump your feet back toward your hands.", "Explosively jump up with arms overhead."], emoji: "🔥" },
  { id: 12, name: "Mountain Climbers", category: "Cardio", duration: "8 min", difficulty: "Intermediate", calories: "120 kcal", muscles: ["Core", "Shoulders", "Legs"], steps: ["Start in a high plank position.", "Drive one knee toward your chest.", "Quickly switch legs in a running motion.", "Keep your hips level and core engaged.", "Maintain a fast, steady pace."], emoji: "⛰️" },
  { id: 13, name: "High Knees", category: "Cardio", duration: "8 min", difficulty: "Beginner", calories: "110 kcal", muscles: ["Quadriceps", "Core", "Calves"], steps: ["Stand with feet hip-width apart.", "Drive one knee up toward your chest.", "Quickly alternate to the other knee.", "Pump your arms as you go.", "Keep a fast tempo throughout."], emoji: "🦶" },
  { id: 14, name: "Jump Rope", category: "Cardio", duration: "15 min", difficulty: "Intermediate", calories: "200 kcal", muscles: ["Calves", "Shoulders", "Core"], steps: ["Hold the rope handles at hip height.", "Swing the rope overhead and jump as it passes your feet.", "Land softly on the balls of your feet.", "Keep your jumps small and controlled.", "Maintain a consistent rhythm."], emoji: "🪢" },
  { id: 15, name: "Cycling", category: "Cardio", duration: "30 min", difficulty: "Beginner", calories: "250 kcal", muscles: ["Quadriceps", "Hamstrings", "Calves"], steps: ["Adjust the seat to proper height.", "Start pedaling at a moderate pace.", "Gradually increase resistance or speed.", "Keep your back straight and core engaged.", "Cool down with 5 minutes of easy pedaling."], emoji: "🚴" },
  { id: 16, name: "Swimming", category: "Cardio", duration: "30 min", difficulty: "Intermediate", calories: "280 kcal", muscles: ["Full Body", "Back", "Shoulders"], steps: ["Start with a warm-up of easy laps.", "Focus on proper breathing technique.", "Alternate between different strokes.", "Maintain a steady pace throughout.", "Cool down with easy backstroke."], emoji: "🏊" },

  // Yoga (8)
  { id: 17, name: "Surya Namaskar", category: "Yoga", duration: "15 min", difficulty: "Intermediate", calories: "80 kcal", muscles: ["Full Body", "Core", "Spine"], steps: ["Begin in prayer pose (Pranamasana).", "Raise arms overhead and arch back slightly.", "Fold forward into Uttanasana.", "Flow through plank, cobra, and downward dog.", "Return to prayer pose to complete one round."], emoji: "🌅" },
  { id: 18, name: "Warrior Pose", category: "Yoga", duration: "10 min", difficulty: "Beginner", calories: "50 kcal", muscles: ["Legs", "Core", "Shoulders"], steps: ["Step one foot back about 3-4 feet.", "Bend your front knee to 90 degrees.", "Raise both arms overhead, palms facing each other.", "Keep your back leg straight and grounded.", "Hold and breathe deeply for 30-60 seconds."], emoji: "🗡️" },
  { id: 19, name: "Tree Pose", category: "Yoga", duration: "8 min", difficulty: "Beginner", calories: "30 kcal", muscles: ["Legs", "Core", "Ankles"], steps: ["Stand on one leg with the other foot on your inner thigh.", "Bring your hands to prayer position at your chest.", "Focus your gaze on a fixed point for balance.", "Hold for 30-60 seconds, then switch sides."], emoji: "🌳" },
  { id: 20, name: "Cobra Pose", category: "Yoga", duration: "8 min", difficulty: "Beginner", calories: "25 kcal", muscles: ["Spine", "Chest", "Shoulders"], steps: ["Lie face down with hands under your shoulders.", "Press into your palms and lift your chest off the floor.", "Keep your elbows slightly bent and shoulders relaxed.", "Hold for 15-30 seconds while breathing deeply."], emoji: "🐍" },
  { id: 21, name: "Child's Pose", category: "Yoga", duration: "5 min", difficulty: "Beginner", calories: "15 kcal", muscles: ["Back", "Hips", "Shoulders"], steps: ["Kneel on the floor with toes together and knees apart.", "Sit back on your heels.", "Extend your arms forward on the floor.", "Rest your forehead on the mat and breathe deeply."], emoji: "🧒" },
  { id: 22, name: "Downward Dog", category: "Yoga", duration: "8 min", difficulty: "Beginner", calories: "40 kcal", muscles: ["Hamstrings", "Shoulders", "Calves"], steps: ["Start on hands and knees.", "Lift your hips up and back, straightening your legs.", "Press your hands firmly into the mat.", "Let your head hang between your arms.", "Hold for 30-60 seconds while breathing."], emoji: "🐕" },
  { id: 23, name: "Triangle Pose", category: "Yoga", duration: "10 min", difficulty: "Intermediate", calories: "35 kcal", muscles: ["Legs", "Hips", "Spine"], steps: ["Stand with feet wide apart, one foot turned out.", "Extend arms to the sides at shoulder height.", "Reach toward the turned-out foot, tilting at the hip.", "Place your hand on your shin or the floor.", "Extend the other arm toward the ceiling."], emoji: "🔺" },
  { id: 24, name: "Bridge Pose", category: "Yoga", duration: "8 min", difficulty: "Beginner", calories: "35 kcal", muscles: ["Glutes", "Back", "Core"], steps: ["Lie on your back with knees bent, feet flat on the floor.", "Press into your feet and lift your hips toward the ceiling.", "Clasp your hands under your back.", "Hold for 30-60 seconds while breathing deeply."], emoji: "🌉" },

  // Stretching (8)
  { id: 25, name: "Hamstring Stretch", category: "Stretching", duration: "5 min", difficulty: "Beginner", calories: "15 kcal", muscles: ["Hamstrings", "Lower Back"], steps: ["Sit on the floor with one leg extended.", "Reach toward your toes while keeping your back straight.", "Hold the stretch for 20-30 seconds.", "Switch legs and repeat."], emoji: "🦿" },
  { id: 26, name: "Quad Stretch", category: "Stretching", duration: "5 min", difficulty: "Beginner", calories: "15 kcal", muscles: ["Quadriceps", "Hip Flexors"], steps: ["Stand on one leg near a wall for balance.", "Grab the opposite ankle and pull it toward your glute.", "Keep your knees together and hips forward.", "Hold for 20-30 seconds, then switch sides."], emoji: "🦵" },
  { id: 27, name: "Shoulder Stretch", category: "Stretching", duration: "5 min", difficulty: "Beginner", calories: "10 kcal", muscles: ["Shoulders", "Upper Back"], steps: ["Bring one arm across your chest.", "Use the opposite hand to gently press the arm closer.", "Hold for 20-30 seconds.", "Switch arms and repeat."], emoji: "💆" },
  { id: 28, name: "Neck Rolls", category: "Stretching", duration: "3 min", difficulty: "Beginner", calories: "8 kcal", muscles: ["Neck", "Upper Trapezius"], steps: ["Sit or stand tall with shoulders relaxed.", "Slowly drop your chin to your chest.", "Roll your head gently to one side, then the back, and to the other side.", "Complete 5 circles in each direction."], emoji: "🔄" },
  { id: 29, name: "Hip Flexor", category: "Stretching", duration: "6 min", difficulty: "Beginner", calories: "18 kcal", muscles: ["Hip Flexors", "Quadriceps", "Glutes"], steps: ["Kneel on one knee with the other foot in front.", "Push your hips forward gently.", "Keep your torso upright and core engaged.", "Hold for 20-30 seconds, then switch sides."], emoji: "🧘" },
  { id: 30, name: "Cat-Cow", category: "Stretching", duration: "5 min", difficulty: "Beginner", calories: "15 kcal", muscles: ["Spine", "Core", "Neck"], steps: ["Start on hands and knees in a tabletop position.", "Inhale, arch your back and lift your head (Cow).", "Exhale, round your back and tuck your chin (Cat).", "Flow between the two positions with your breath."], emoji: "🐄" },
  { id: 31, name: "Chest Opener", category: "Stretching", duration: "5 min", difficulty: "Beginner", calories: "10 kcal", muscles: ["Chest", "Shoulders", "Biceps"], steps: ["Stand in a doorway with arms on the frame at 90 degrees.", "Step one foot forward and lean gently through the door.", "Feel the stretch across your chest and shoulders.", "Hold for 20-30 seconds."], emoji: "🫁" },
  { id: 32, name: "Spinal Twist", category: "Stretching", duration: "6 min", difficulty: "Beginner", calories: "12 kcal", muscles: ["Spine", "Obliques", "Back"], steps: ["Sit on the floor with legs extended.", "Bend one knee and cross it over the opposite leg.", "Twist your torso toward the bent knee.", "Use your opposite elbow against the knee for leverage.", "Hold for 20-30 seconds, then switch sides."], emoji: "🌀" },

  // Home Workout (8)
  { id: 33, name: "Wall Sit", category: "Home Workout", duration: "5 min", difficulty: "Intermediate", calories: "50 kcal", muscles: ["Quadriceps", "Glutes", "Core"], steps: ["Stand with your back against a wall.", "Slide down until your thighs are parallel to the floor.", "Keep your back flat against the wall.", "Hold the position for 30-60 seconds."], emoji: "🧱" },
  { id: 34, name: "Step-ups", category: "Home Workout", duration: "10 min", difficulty: "Beginner", calories: "80 kcal", muscles: ["Quadriceps", "Glutes", "Calves"], steps: ["Stand in front of a sturdy step or bench.", "Step up with one foot, driving through your heel.", "Bring the other foot up to stand on the step.", "Step back down and alternate the leading leg."], emoji: "🪜" },
  { id: 35, name: "Tricep Dips", category: "Home Workout", duration: "8 min", difficulty: "Intermediate", calories: "70 kcal", muscles: ["Triceps", "Shoulders", "Chest"], steps: ["Sit on the edge of a chair with hands gripping the edge.", "Slide your hips off the chair with legs extended.", "Lower your body by bending your elbows to 90 degrees.", "Push back up to the starting position."], emoji: "🪑" },
  { id: 36, name: "Crunches", category: "Home Workout", duration: "8 min", difficulty: "Beginner", calories: "60 kcal", muscles: ["Abdominals", "Core"], steps: ["Lie on your back with knees bent and feet flat.", "Place your hands behind your head.", "Curl your shoulders off the floor using your abs.", "Lower back down with control."], emoji: "🔢" },
  { id: 37, name: "Bicycle Crunches", category: "Home Workout", duration: "8 min", difficulty: "Intermediate", calories: "80 kcal", muscles: ["Obliques", "Abdominals", "Hip Flexors"], steps: ["Lie on your back with hands behind your head.", "Lift your shoulders and legs off the floor.", "Bring one knee toward the opposite elbow.", "Alternate sides in a pedaling motion.", "Keep your core engaged throughout."], emoji: "🚲" },
  { id: 38, name: "Glute Bridge", category: "Home Workout", duration: "8 min", difficulty: "Beginner", calories: "55 kcal", muscles: ["Glutes", "Hamstrings", "Core"], steps: ["Lie on your back with knees bent and feet flat.", "Press through your heels to lift your hips.", "Squeeze your glutes at the top.", "Lower back down slowly."], emoji: "🍑" },
  { id: 39, name: "Superman", category: "Home Workout", duration: "6 min", difficulty: "Beginner", calories: "45 kcal", muscles: ["Lower Back", "Glutes", "Shoulders"], steps: ["Lie face down with arms extended in front of you.", "Simultaneously lift your arms, chest, and legs off the floor.", "Hold for 2-3 seconds at the top.", "Lower back down with control."], emoji: "🦸" },
  { id: 40, name: "Flutter Kicks", category: "Home Workout", duration: "6 min", difficulty: "Intermediate", calories: "65 kcal", muscles: ["Lower Abs", "Hip Flexors", "Core"], steps: ["Lie on your back with legs extended and hands under your hips.", "Lift both legs slightly off the ground.", "Alternate kicking legs up and down in a small range.", "Keep your core tight and lower back pressed to the floor."], emoji: "🦋" },
];

const categories = ["All", "Strength", "Cardio", "Yoga", "Stretching", "Home Workout"];

const categoryIcons: Record<string, React.ReactNode> = {
  All: <Target className="w-4 h-4" />,
  Strength: <Dumbbell className="w-4 h-4" />,
  Cardio: <Heart className="w-4 h-4" />,
  Yoga: <Sparkles className="w-4 h-4" />,
  Stretching: <Move className="w-4 h-4" />,
  "Home Workout": <Home className="w-4 h-4" />,
};

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscles.some((m) => m.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory =
      activeCategory === "All" || ex.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Exercise & Yoga Library
            </h1>
            <p className="mt-2 text-muted-foreground text-lg">
              Browse 40 exercises across 5 categories. Click any card to see step-by-step instructions.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises or muscles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted border text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/30 focus:ring-foreground/10"
            />
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "gap-2 transition-all",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-foreground/20 text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                {categoryIcons[cat]}
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-muted-foreground text-sm mb-6">
          Showing {filtered.length} exercise{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((ex) => {
              const isExpanded = expandedId === ex.id;
              return (
                <motion.div
                  key={ex.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                  className={cn(
                    "border border rounded-xl p-5 cursor-pointer transition-colors hover:border-foreground/25 hover:bg-muted/50",
                    isExpanded && "col-span-1 sm:col-span-2 border-foreground/20 bg-muted/50"
                  )}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ex.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-foreground text-base">{ex.name}</h3>
                        <p className="text-muted-foreground text-xs mt-0.5">{ex.category}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
                    </motion.div>
                  </div>

                  {/* Meta */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs font-medium", difficultyColor[ex.difficulty])}
                    >
                      {ex.difficulty}
                    </Badge>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ex.duration}
                    </span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {ex.calories}
                    </span>
                  </div>

                  {/* Muscles */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ex.muscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Steps */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-4 border-t border">
                          <h4 className="text-sm font-semibold text-foreground/80 mb-3">
                            Step-by-step Instructions
                          </h4>
                          <ol className="space-y-2">
                            {ex.steps.map((step, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground/70 flex items-center justify-center text-xs font-medium">
                                  {i + 1}
                                </span>
                                <span className="pt-0.5">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground/50 text-lg">No exercises found.</p>
            <p className="text-muted-foreground/30 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
