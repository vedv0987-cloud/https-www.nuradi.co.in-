import type { Metadata } from "next";
import { fetchAllHealthNews } from "@/lib/health-news-aggregator";
import { NEWS_SOURCES } from "@/lib/health-news-sources";
import { SchemaMarkup } from "@/components/schema-markup";
import { collectionPageSchema, itemListSchema, SITE_URL } from "@/lib/schema";
import HealthNewsClient from "./health-news-client";

export const revalidate = 3600; // regenerate every hour

export const metadata: Metadata = {
  title: "Health News Today | Live Updates from NDTV, BBC, WHO & 7+ Sources",
  description:
    "Real-time health news from NDTV, BBC, WHO, The Hindu, Economic Times, Healthline, Medical News Today + more. Updated hourly.",
  openGraph: {
    title: "Health News Today | NuradiHealth",
    description: "Real-time health news from 10+ trusted sources. Updated hourly.",
    url: "https://www.nuradi.co.in/health-news",
    type: "website",
  },
};

export default async function HealthNewsPage() {
  const articles = await fetchAllHealthNews();
  const schema = [
    collectionPageSchema({
      name: "Health News Today",
      description: "Live health news aggregated from 10 trusted sources.",
      url: `${SITE_URL}/health-news`,
      itemCount: articles.length,
    }),
    itemListSchema({
      name: "Latest Health News",
      url: `${SITE_URL}/health-news`,
      items: articles.slice(0, 10).map((a) => ({ name: a.title, url: a.url })),
    }),
  ];
  return (
    <>
      <SchemaMarkup data={schema} />
      <HealthNewsClient initialArticles={articles} sources={NEWS_SOURCES} />
    </>
  );
}
