export interface LearningStep {
  order: number;
  title: string;
  searchQuery: string;
}

export interface LearningPath {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  difficulty: string;
  totalVideos: number;
  totalDuration: string;
  category: string;
  steps: LearningStep[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "diabetes-101", name: "Diabetes 101", slug: "diabetes-101",
    description: "Understand diabetes from basics to management", icon: "Syringe", color: "#D4537E",
    difficulty: "Beginner", totalVideos: 8, totalDuration: "2h 15min", category: "medical",
    steps: [
      { order: 1, title: "What is Diabetes?", searchQuery: "diabetes explained" },
      { order: 2, title: "Type 1 vs Type 2", searchQuery: "type 1 type 2 diabetes" },
      { order: 3, title: "How Insulin Works", searchQuery: "insulin pancreas" },
      { order: 4, title: "Symptoms & Warning Signs", searchQuery: "diabetes symptoms" },
      { order: 5, title: "Blood Sugar & A1C", searchQuery: "blood sugar A1C" },
      { order: 6, title: "Diet for Diabetes", searchQuery: "diabetes diet nutrition" },
      { order: 7, title: "Exercise & Blood Sugar", searchQuery: "exercise blood sugar" },
      { order: 8, title: "Living Well with Diabetes", searchQuery: "diabetes management" },
    ],
  },
  {
    id: "yoga-beginner", name: "Yoga for Beginners", slug: "yoga-beginner",
    description: "Start your yoga journey with progressive sessions", icon: "Heart", color: "#1D9E75",
    difficulty: "Beginner", totalVideos: 6, totalDuration: "3h", category: "fitness",
    steps: [
      { order: 1, title: "Your First Yoga Class", searchQuery: "yoga beginner first" },
      { order: 2, title: "Basic Poses & Alignment", searchQuery: "yoga basic poses" },
      { order: 3, title: "Sun Salutation Flow", searchQuery: "sun salutation yoga" },
      { order: 4, title: "Yoga for Flexibility", searchQuery: "yoga flexibility stretch" },
      { order: 5, title: "Yoga for Stress Relief", searchQuery: "yoga stress anxiety" },
      { order: 6, title: "Building a Home Practice", searchQuery: "yoga home practice daily" },
    ],
  },
  {
    id: "anxiety-guide", name: "Understanding Anxiety", slug: "anxiety-guide",
    description: "From science to coping strategies", icon: "Brain", color: "#7F77DD",
    difficulty: "Beginner", totalVideos: 6, totalDuration: "1h 30min", category: "mental-health",
    steps: [
      { order: 1, title: "What is Anxiety?", searchQuery: "anxiety explained" },
      { order: 2, title: "Anxiety vs Normal Worry", searchQuery: "anxiety disorder difference" },
      { order: 3, title: "The Neuroscience of Anxiety", searchQuery: "anxiety brain neuroscience" },
      { order: 4, title: "Breathing & Grounding Techniques", searchQuery: "breathing anxiety grounding" },
      { order: 5, title: "CBT for Anxiety", searchQuery: "CBT cognitive behavioral therapy anxiety" },
      { order: 6, title: "Building Long-Term Resilience", searchQuery: "anxiety management resilience" },
    ],
  },
  {
    id: "heart-health-path", name: "Heart Health Masterclass", slug: "heart-health-path",
    description: "Everything about your heart health", icon: "Heart", color: "#E24B4A",
    difficulty: "Beginner", totalVideos: 6, totalDuration: "2h", category: "medical",
    steps: [
      { order: 1, title: "Heart Anatomy Basics", searchQuery: "heart anatomy" },
      { order: 2, title: "Blood Pressure Explained", searchQuery: "blood pressure explained" },
      { order: 3, title: "Cholesterol & Heart Disease", searchQuery: "cholesterol heart disease" },
      { order: 4, title: "Heart-Healthy Diet", searchQuery: "heart healthy diet" },
      { order: 5, title: "Cardio Exercise for Heart Health", searchQuery: "cardio exercise heart" },
      { order: 6, title: "Preventing Heart Attacks", searchQuery: "heart attack prevention" },
    ],
  },
  {
    id: "weight-loss-science", name: "Weight Loss — The Science", slug: "weight-loss-science",
    description: "Evidence-based weight loss", icon: "TrendingDown", color: "#639922",
    difficulty: "Beginner", totalVideos: 6, totalDuration: "2h", category: "nutrition",
    steps: [
      { order: 1, title: "Calories & Energy Balance", searchQuery: "calories energy balance weight" },
      { order: 2, title: "Metabolism Explained", searchQuery: "metabolism explained" },
      { order: 3, title: "Best Diet for Weight Loss", searchQuery: "best diet weight loss" },
      { order: 4, title: "Exercise for Fat Loss", searchQuery: "exercise fat loss" },
      { order: 5, title: "Common Weight Loss Mistakes", searchQuery: "weight loss mistakes" },
      { order: 6, title: "Maintaining Weight Loss", searchQuery: "maintaining weight loss" },
    ],
  },
  {
    id: "sleep-science", name: "Sleep Science", slug: "sleep-science",
    description: "Why sleep matters and how to optimize it", icon: "Moon", color: "#7F77DD",
    difficulty: "Beginner", totalVideos: 5, totalDuration: "1h 30min", category: "wellness",
    steps: [
      { order: 1, title: "Why We Sleep", searchQuery: "why we sleep science" },
      { order: 2, title: "Sleep Cycles Explained", searchQuery: "sleep cycles REM deep" },
      { order: 3, title: "Insomnia & Sleep Disorders", searchQuery: "insomnia sleep disorder" },
      { order: 4, title: "Sleep Hygiene Tips", searchQuery: "sleep hygiene tips" },
      { order: 5, title: "Meditation for Sleep", searchQuery: "meditation sleep relaxation" },
    ],
  },
];
