// Fetch REAL YouTube data for all HealthEduTV channels
// Run: node scripts/fetch-youtube-data.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = "AIzaSyBx-jd7l3WtDlT2mZOVmeA0OhgSXY1Hk9Y";
const BASE = "https://www.googleapis.com/youtube/v3";

// Sanitize strings to remove emojis, surrogate pairs, and control chars
function sanitize(str) {
  if (typeof str !== "string") return str || "";
  return str
    .replace(/[\uD800-\uDFFF]/g, "")          // remove surrogate pairs
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // remove control chars
    .replace(/[^\x20-\x7E\xA0-\xFF\u0100-\u017F\u0400-\u04FF\u0900-\u097F]/g, "") // keep ASCII + Latin + Cyrillic + Devanagari only
    .trim();
}

const CHANNELS = [
  { id: "doctor-mike", name: "Doctor Mike", ytId: "UC0QHWhjbe5fGJEPz3sVb6nw", categories: ["health", "medical"] },
  { id: "dr-eric-berg", name: "Dr. Eric Berg DC", ytId: "UC3w193M5tYPJqF0Hi-7U-2g", categories: ["health", "nutrition"] },
  { id: "fit-tuber", name: "Fit Tuber", ytId: "UCyQyb4MBhDmto7D_AndrUnQ", categories: ["health", "nutrition"] },
  { id: "institute-human-anatomy", name: "Institute of Human Anatomy", ytId: "UCpMrSAclQey4HF6MQB3Ytpw", categories: ["medical", "science"] },
  { id: "jeff-nippard", name: "Jeff Nippard", ytId: "UC68TLK0mAEzUyHx5x5k-S1Q", categories: ["fitness"] },
  { id: "athlean-x", name: "ATHLEAN-X", ytId: "UCe0TLA0EsQbE-MjuHXevj2A", categories: ["fitness", "health"] },
  { id: "yoga-adriene", name: "Yoga With Adriene", ytId: "UCFKE7WVJfvaHW5q283SxchA", categories: ["fitness", "mental-health"] },
  { id: "blogilates", name: "Blogilates", ytId: "UCIJMOYpJKCVrhvIJcIBMaaA", categories: ["fitness"] },
  { id: "chloe-ting", name: "Chloe Ting", ytId: "UCCgLoMYIyP0U56dEhEL1wXQ", categories: ["fitness"] },
  { id: "madfit", name: "MadFit", ytId: "UCpQ34afVgk8cRQBjSJ1xuJQ", categories: ["fitness"] },
  { id: "pick-up-limes", name: "Pick Up Limes", ytId: "UCq2E1mIwUKMWzCA4liA_XGQ", categories: ["nutrition"] },
  { id: "abbey-sharp", name: "Abbey Sharp", ytId: "UCBVfmCMz3AZjkl5MxSSpi0g", categories: ["nutrition", "health"] },
  { id: "therapy-nutshell", name: "Therapy in a Nutshell", ytId: "UCpuXFTlEHAV5drrE7LJLowA", categories: ["mental-health"] },
  { id: "psych2go", name: "Psych2Go", ytId: "UCkJEpR7JmS36tajD34Gp4VA", categories: ["mental-health"] },
  { id: "kati-morton", name: "Kati Morton", ytId: "UCzBYOHyEEzlkRYDHzfCP5Tg", categories: ["mental-health", "health"] },
  { id: "school-of-life", name: "The School of Life", ytId: "UC7IcJI8PUf5Z3zKxnZvTBog", categories: ["mental-health", "personal-dev"] },
  { id: "ninja-nerd", name: "Ninja Nerd", ytId: "UC6QYFutt9cluQ3uSM963_KQ", categories: ["medical", "science"] },
  { id: "osmosis", name: "Osmosis from Elsevier", ytId: "UCNI0qOojpkhsUtaQ4_2NUhQ", categories: ["medical"] },
  { id: "kurzgesagt", name: "Kurzgesagt", ytId: "UCsXVk37bltHxD1rDPwtNM8Q", categories: ["science"] },
  { id: "3blue1brown", name: "3Blue1Brown", ytId: "UCYO_jab_esuFRV4b17AJtAw", categories: ["science"] },
  { id: "veritasium", name: "Veritasium", ytId: "UCHnyfMqiRRG1u-2MsSQLbXA", categories: ["science"] },
  { id: "crashcourse", name: "CrashCourse", ytId: "UCX6b17PVsYBQ0ip5gyeme-Q", categories: ["science", "medical"] },
  { id: "khan-academy", name: "Khan Academy", ytId: "UC4a-Gbdw7vOaccHmFo40b9g", categories: ["science", "medical"] },
  { id: "ted-ed", name: "TED-Ed", ytId: "UCsooa4yRKGN_zEE8iknghZA", categories: ["science"] },
  { id: "smarter-every-day", name: "SmarterEveryDay", ytId: "UC6107grRI4m0o2-emgoDnAA", categories: ["science"] },
  { id: "ali-abdaal", name: "Ali Abdaal", ytId: "UCoOae5nYA7VqaXzerajD0lg", categories: ["personal-dev", "health"] },
  { id: "thomas-frank", name: "Thomas Frank", ytId: "UCG-KntY7aVnIGXYEBQvmBAQ", categories: ["personal-dev"] },
  { id: "ankur-warikoo", name: "warikoo", ytId: "UCRzYN32xtBf3Yxsx5BvJWJw", categories: ["personal-dev"] },
];

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }
  return res.json();
}

function parseDuration(iso) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "0:00";
  const h = parseInt(m[1] || "0");
  const min = parseInt(m[2] || "0");
  const sec = parseInt(m[3] || "0");
  if (h > 0) return `${h}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

async function getChannel(channelId) {
  const data = await fetchJSON(
    `${BASE}/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${API_KEY}`
  );
  return data.items?.[0] || null;
}

async function getPlaylistVideos(playlistId, max = 50) {
  const videos = [];
  let pageToken = "";
  while (videos.length < max) {
    const url = `${BASE}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${pageToken}&key=${API_KEY}`;
    const data = await fetchJSON(url);
    if (!data.items?.length) break;
    videos.push(...data.items);
    pageToken = data.nextPageToken || "";
    if (!pageToken) break;
  }
  return videos.slice(0, max);
}

async function getVideoDetails(ids) {
  const all = [];
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50).join(",");
    const data = await fetchJSON(
      `${BASE}/videos?part=snippet,statistics,contentDetails&id=${chunk}&key=${API_KEY}`
    );
    if (data.items) all.push(...data.items);
  }
  return all;
}

async function main() {
  const db = { channels: [], videos: [] };
  let totalVideos = 0;

  for (const ch of CHANNELS) {
    process.stdout.write(`Fetching ${ch.name}...`);

    try {
      const info = await getChannel(ch.ytId);
      if (!info) {
        console.log(" SKIP (not found)");
        continue;
      }

      const avatar = info.snippet.thumbnails?.high?.url || info.snippet.thumbnails?.default?.url || "";
      const uploadsId = info.contentDetails?.relatedPlaylists?.uploads;

      db.channels.push({
        id: ch.id,
        youtubeChannelId: ch.ytId,
        name: ch.name,
        avatar,
        description: sanitize((info.snippet.description || "").substring(0, 300)),
        subscriberCount: parseInt(info.statistics.subscriberCount || "0"),
        videoCount: parseInt(info.statistics.videoCount || "0"),
        categories: ch.categories,
        youtubeUrl: `https://youtube.com/@${info.snippet.customUrl || ch.id}`,
        verified: true,
      });

      if (!uploadsId) {
        console.log(" no uploads playlist");
        continue;
      }

      const plItems = await getPlaylistVideos(uploadsId, 50);
      const vIds = plItems.map((v) => v.contentDetails?.videoId).filter(Boolean);
      const details = await getVideoDetails(vIds);

      // Sort by views descending
      details.sort((a, b) =>
        parseInt(b.statistics?.viewCount || "0") - parseInt(a.statistics?.viewCount || "0")
      );

      for (const v of details) {
        const views = parseInt(v.statistics?.viewCount || "0");
        db.videos.push({
          id: `${ch.id}-${v.id}`,
          youtubeId: v.id,
          title: sanitize(v.snippet.title),
          description: sanitize((v.snippet.description || "").substring(0, 400)),
          thumbnail: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
          duration: parseDuration(v.contentDetails.duration),
          views,
          publishedAt: v.snippet.publishedAt?.split("T")[0] || "",
          category: ch.categories[0],
          tags: (v.snippet.tags || []).slice(0, 8).map(sanitize),
          channelId: ch.id,
          featured: false,
        });
      }

      totalVideos += details.length;
      console.log(` ✓ ${details.length} videos (total: ${totalVideos})`);

      // Small delay to respect rate limits
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
  }

  // Mark top video per channel as featured
  const seen = new Set();
  for (const v of db.videos) {
    if (!seen.has(v.channelId)) {
      v.featured = true;
      seen.add(v.channelId);
    }
  }

  // Write database
  const outPath = path.join(__dirname, "..", "src", "data", "database.json");
  fs.writeFileSync(outPath, JSON.stringify(db, null, 2));
  console.log(`\n✅ DONE: ${db.channels.length} channels, ${db.videos.length} videos`);
  console.log(`Saved to: ${outPath}`);
}

main().catch(console.error);
