export type Category =
  | "health"
  | "fitness"
  | "nutrition"
  | "mental-health"
  | "medical"
  | "science"
  | "personal-dev";

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: string;
  category: Category;
  tags: string[];
  channelId: string;
  featured: boolean;
}

export interface Channel {
  id: string;
  youtubeChannelId: string;
  name: string;
  avatar: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  categories: Category[];
  youtubeUrl: string;
  verified: boolean;
}

export const CATEGORY_META: Record<
  Category,
  { label: string; color: string; icon: string; description: string }
> = {
  health: {
    label: "Health & Wellness",
    color: "#22c55e",
    icon: "Heart",
    description:
      "General health tips, preventive care, Ayurveda, holistic health",
  },
  fitness: {
    label: "Fitness & Exercise",
    color: "#f97316",
    icon: "Dumbbell",
    description: "Workouts, yoga, strength training, mobility",
  },
  nutrition: {
    label: "Nutrition & Diet",
    color: "#84cc16",
    icon: "Apple",
    description: "Meal plans, dietician advice, superfoods, recipes",
  },
  "mental-health": {
    label: "Mental Health",
    color: "#a78bfa",
    icon: "Brain",
    description: "Therapy, mindfulness, stress management, sleep",
  },
  medical: {
    label: "Medical Education",
    color: "#3b82f6",
    icon: "Stethoscope",
    description: "Anatomy, disease explainers, medical procedures, nursing",
  },
  science: {
    label: "Science & Learning",
    color: "#06b6d4",
    icon: "Atom",
    description: "Physics, chemistry, biology, space, technology",
  },
  "personal-dev": {
    label: "Personal Development",
    color: "#eab308",
    icon: "Lightbulb",
    description: "Productivity, study techniques, career growth",
  },
};
