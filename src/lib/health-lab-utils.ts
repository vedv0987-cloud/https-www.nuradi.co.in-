import { videos } from "@/data/videos";
import { Video } from "@/types";
import bodyPartsData from "@/data/body-parts-videos.json";

interface BPVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: string;
  channelName: string;
  channelAvatar: string;
  tags: string[];
}

// Convert a body-part video to a Video-like object for display
function bpToVideo(bpv: BPVideo, category: string): Video {
  return {
    id: bpv.id,
    youtubeId: bpv.youtubeId,
    title: bpv.title,
    description: bpv.description,
    thumbnail: bpv.thumbnail,
    duration: bpv.duration,
    views: bpv.views,
    publishedAt: bpv.publishedAt,
    category: category as Video["category"],
    tags: bpv.tags || [],
    channelId: "",
    featured: false,
  };
}

// Search videos from BOTH databases — channel videos + body part videos
// Prioritizes: title match > multi-term match > single-term match
export function searchRelatedVideos(query: string, limit = 4): Video[] {
  const terms = query.toLowerCase().split(" ").filter((t) => t.length > 2);
  if (terms.length === 0) return [];

  // Score a text against search terms
  function scoreText(text: string): { score: number; titleBonus: number } {
    const lower = text.toLowerCase();
    let score = 0;
    let titleBonus = 0;
    for (const t of terms) {
      if (lower.includes(t)) score++;
    }
    return { score, titleBonus };
  }

  // 1. Search main channel videos
  const channelResults = videos.map((v) => {
    const titleScore = scoreText(v.title);
    const descScore = scoreText(v.description);
    const tagScore = scoreText(v.tags.join(" "));
    // Title matches worth 3x, tags 2x, description 1x
    const total = titleScore.score * 3 + tagScore.score * 2 + descScore.score;
    return { video: v, score: total, source: "channel" as const };
  });

  // 2. Search body-parts videos
  const bpResults: { video: Video; score: number; source: "bodypart" }[] = [];
  const bpData = bodyPartsData as Record<string, { id: string; name: string; videos: BPVideo[] }>;

  for (const [organId, organ] of Object.entries(bpData)) {
    // Check if the organ name matches any search term
    const organMatch = terms.some((t) => organId.includes(t) || organ.name.toLowerCase().includes(t));

    for (const bpv of organ.videos) {
      const titleScore = scoreText(bpv.title);
      const descScore = scoreText(bpv.description);
      const tagScore = scoreText((bpv.tags || []).join(" "));
      let total = titleScore.score * 3 + tagScore.score * 2 + descScore.score;
      // Bonus if organ name matches
      if (organMatch) total += 2;

      if (total > 0) {
        const cat = organId === "brain" ? "science" : organId === "heart" ? "health" : "medical";
        bpResults.push({
          video: bpToVideo(bpv, cat),
          score: total,
          source: "bodypart",
        });
      }
    }
  }

  // Combine and deduplicate by youtubeId
  const allResults = [...channelResults, ...bpResults]
    .filter((r) => r.score >= 2) // Require at least 2 term matches
    .sort((a, b) => b.score - a.score || b.video.views - a.video.views);

  const seen = new Set<string>();
  const final: Video[] = [];
  for (const r of allResults) {
    if (seen.has(r.video.youtubeId)) continue;
    seen.add(r.video.youtubeId);
    final.push(r.video);
    if (final.length >= limit) break;
  }

  // If we got too few results (strict matching), relax to score >= 1
  if (final.length < limit) {
    const relaxed = [...channelResults, ...bpResults]
      .filter((r) => r.score >= 1)
      .sort((a, b) => b.score - a.score || b.video.views - a.video.views);
    for (const r of relaxed) {
      if (seen.has(r.video.youtubeId)) continue;
      seen.add(r.video.youtubeId);
      final.push(r.video);
      if (final.length >= limit) break;
    }
  }

  return final;
}

// Animated counter hook value
export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

// LocalStorage helpers
export function saveToLS(key: string, data: unknown) {
  try {
    localStorage.setItem(`healthlab_${key}`, JSON.stringify(data));
  } catch {}
}

export function loadFromLS<T>(key: string): T | null {
  try {
    const d = localStorage.getItem(`healthlab_${key}`);
    return d ? JSON.parse(d) : null;
  } catch {
    return null;
  }
}
