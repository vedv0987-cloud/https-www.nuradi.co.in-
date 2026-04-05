// Parse RSS/Atom feeds from multiple sources and aggregate into a unified article list.

import { XMLParser } from "fast-xml-parser";
import { NEWS_SOURCES, type NewsSource } from "./health-news-sources";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string; // ISO
  sourceName: string;
  sourceId: string;
  sourceLogo?: string;
  region: "india" | "global";
  image?: string;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  parseAttributeValue: false,
  trimValues: true,
});

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractImage(item: Record<string, unknown>): string | undefined {
  // Try enclosure
  const enclosure = item.enclosure as { "@_url"?: string; "@_type"?: string } | undefined;
  if (enclosure?.["@_url"] && enclosure["@_type"]?.startsWith("image")) return enclosure["@_url"];
  // Try media:content
  const media = item["media:content"] as { "@_url"?: string } | undefined;
  if (media?.["@_url"]) return media["@_url"];
  // Try media:thumbnail
  const thumb = item["media:thumbnail"] as { "@_url"?: string } | undefined;
  if (thumb?.["@_url"]) return thumb["@_url"];
  // Try parsing from description
  const desc = item.description as string | undefined;
  if (desc) {
    const match = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match) return match[1];
  }
  return undefined;
}

async function fetchFeed(source: NewsSource, timeoutMs = 10000): Promise<NewsArticle[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "NuradiHealth/1.0 (https://www.nuradi.co.in)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 3600 }, // cache 1 hour
    });
    clearTimeout(timeout);

    if (!res.ok) return [];
    const xml = await res.text();
    const parsed = parser.parse(xml);

    // Handle RSS 2.0 + Atom feeds
    const items: Record<string, unknown>[] = parsed?.rss?.channel?.item
      ? (Array.isArray(parsed.rss.channel.item) ? parsed.rss.channel.item : [parsed.rss.channel.item])
      : parsed?.feed?.entry
      ? (Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry])
      : [];

    return items
      .slice(0, 15)
      .map((item, i): NewsArticle | null => {
        const title = typeof item.title === "string" ? item.title : (item.title as { "#text"?: string })?.["#text"];
        if (!title) return null;

        // URL — RSS <link> or Atom <link href="">
        let url: string | undefined;
        if (typeof item.link === "string") url = item.link;
        else if (Array.isArray(item.link)) url = (item.link[0] as { "@_href"?: string })["@_href"];
        else if (item.link && typeof item.link === "object") url = (item.link as { "@_href"?: string })["@_href"];
        if (!url) return null;

        // Date
        const rawDate =
          (item.pubDate as string) ||
          (item.published as string) ||
          (item.updated as string) ||
          (item["dc:date"] as string) ||
          new Date().toISOString();
        let publishedAt: string;
        try { publishedAt = new Date(rawDate).toISOString(); }
        catch { publishedAt = new Date().toISOString(); }

        const descRaw = (item.description as string) || (item.summary as string) || (item["content:encoded"] as string) || "";
        const excerpt = stripHtml(String(descRaw)).slice(0, 240);

        const image = extractImage(item);

        return {
          id: `${source.id}-${i}-${url.slice(-24)}`,
          title: stripHtml(String(title)),
          excerpt,
          url,
          publishedAt,
          sourceName: source.name,
          sourceId: source.id,
          sourceLogo: source.logo,
          region: source.region,
          image,
        };
      })
      .filter((a): a is NewsArticle => a !== null);
  } catch {
    return [];
  }
}

export async function fetchAllHealthNews(): Promise<NewsArticle[]> {
  const results = await Promise.all(NEWS_SOURCES.map((s) => fetchFeed(s)));
  const all = results.flat();
  // Dedupe by URL, sort by date desc
  const seen = new Set<string>();
  const unique = all.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
  unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return unique.slice(0, 100);
}
