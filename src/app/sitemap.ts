import type { MetadataRoute } from "next";
import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import { bodyParts } from "@/data/body-parts";
import { LEARNING_PATHS } from "@/data/learning-paths";
import { CATEGORY_META, Category } from "@/types";
import { DISEASE_CATEGORIES } from "@/data/disease-categories";
import diseasesData from "@/data/diseases.json";

const BASE_URL = "https://www.nuradi.co.in";
const diseases = diseasesData as { slug: string }[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/explore`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/channels`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/health-az`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/health-lab`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/body-explorer`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/breathe`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/bmi`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/learning-paths`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/daily-dose`, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE_URL}/ai-insights`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/news`, changeFrequency: "daily", priority: 0.6 },
  ];

  const videoPages: MetadataRoute.Sitemap = videos.map((v) => ({
    url: `${BASE_URL}/video/${v.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const channelPages: MetadataRoute.Sitemap = channels.map((c) => ({
    url: `${BASE_URL}/channel/${c.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = (
    Object.keys(CATEGORY_META) as Category[]
  ).map((c) => ({
    url: `${BASE_URL}/category/${c}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const diseasePages: MetadataRoute.Sitemap = diseases.map((d) => ({
    url: `${BASE_URL}/health-az/${d.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const diseaseCategoryPages: MetadataRoute.Sitemap = Object.keys(
    DISEASE_CATEGORIES
  ).map((c) => ({
    url: `${BASE_URL}/health-az/category/${c}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const bodyPartPages: MetadataRoute.Sitemap = bodyParts.map((p) => ({
    url: `${BASE_URL}/body-explorer/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const learningPathPages: MetadataRoute.Sitemap = LEARNING_PATHS.map((p) => ({
    url: `${BASE_URL}/learning-paths/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...channelPages,
    ...diseasePages,
    ...diseaseCategoryPages,
    ...bodyPartPages,
    ...learningPathPages,
    ...videoPages,
  ];
}
