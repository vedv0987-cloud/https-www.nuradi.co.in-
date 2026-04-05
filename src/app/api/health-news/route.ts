import { NextResponse } from "next/server";
import { fetchAllHealthNews } from "@/lib/health-news-aggregator";

// Cache for 30 min (spec requirement)
export const revalidate = 1800;

export async function GET() {
  try {
    const articles = await fetchAllHealthNews();
    return NextResponse.json(
      { articles: articles.slice(0, 8) },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch health news:", error);
    return NextResponse.json({ articles: [] }, { status: 200 });
  }
}
