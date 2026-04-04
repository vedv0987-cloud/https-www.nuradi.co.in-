#!/usr/bin/env python3
"""
Fetch 50 real YouTube videos per body part using YouTube Search API.
20 body parts × 50 videos = ~1000 videos.
"""

import json, time, re, sys
from urllib.request import urlopen, Request
from urllib.error import HTTPError
from datetime import datetime, timezone
from pathlib import Path

API_KEY = "AIzaSyBx-jd7l3WtDlT2mZOVmeA0OhgSXY1Hk9Y"
BASE = "https://www.googleapis.com/youtube/v3"
OUTPUT = Path("src/data/body-parts-videos.json")

BODY_PARTS = [
    {"id": "brain", "name": "Brain", "query": "brain neuroscience explained medical education", "extra": "brain anatomy neurology memory"},
    {"id": "heart", "name": "Heart", "query": "heart anatomy cardiovascular health medical", "extra": "heart disease blood pressure cholesterol"},
    {"id": "lungs", "name": "Lungs", "query": "lungs respiratory system breathing medical", "extra": "asthma pneumonia COPD lung health"},
    {"id": "liver", "name": "Liver", "query": "liver health fatty liver detox medical", "extra": "cirrhosis hepatitis liver function"},
    {"id": "kidneys", "name": "Kidneys", "query": "kidney health renal system medical education", "extra": "kidney stones dialysis kidney disease"},
    {"id": "stomach", "name": "Stomach", "query": "stomach digestion gastric health medical", "extra": "acid reflux GERD ulcer digestive system"},
    {"id": "pancreas", "name": "Pancreas", "query": "pancreas diabetes insulin blood sugar medical", "extra": "type 1 type 2 diabetes pancreatitis"},
    {"id": "intestines", "name": "Intestines", "query": "gut health microbiome intestines medical", "extra": "IBS probiotics colon digestive health"},
    {"id": "eyes", "name": "Eyes", "query": "eye health vision ophthalmology medical", "extra": "glaucoma retina LASIK eye anatomy"},
    {"id": "thyroid", "name": "Thyroid", "query": "thyroid health hormones hypothyroidism medical", "extra": "hyperthyroidism metabolism thyroid gland"},
    {"id": "spine", "name": "Spine", "query": "spine back pain posture spinal health", "extra": "herniated disc sciatica spinal cord"},
    {"id": "muscles", "name": "Muscles", "query": "muscle building strength training exercise science", "extra": "hypertrophy protein muscles anatomy"},
    {"id": "skin", "name": "Skin", "query": "skin health dermatology skincare medical", "extra": "acne eczema psoriasis melanoma"},
    {"id": "bones", "name": "Bones", "query": "bones skeleton osteoporosis medical education", "extra": "arthritis fracture calcium bone health"},
    {"id": "blood", "name": "Blood", "query": "blood circulatory system medical education", "extra": "anemia hemoglobin blood cells types"},
    {"id": "immune", "name": "Immune System", "query": "immune system how it works medical education", "extra": "immunity vaccines inflammation autoimmune"},
    {"id": "teeth", "name": "Teeth", "query": "dental health teeth oral care medical", "extra": "cavity root canal gums dentist"},
    {"id": "ears", "name": "Ears", "query": "ear health hearing medical education", "extra": "tinnitus ear infection balance hearing loss"},
    {"id": "hormones", "name": "Hormones", "query": "hormones endocrine system medical education", "extra": "testosterone estrogen cortisol PCOS"},
    {"id": "reproductive", "name": "Reproductive System", "query": "reproductive system health medical education", "extra": "fertility pregnancy menstruation reproductive anatomy"},
]

def api(endpoint, params):
    params["key"] = API_KEY
    q = "&".join(f"{k}={v}" for k, v in params.items())
    url = f"{BASE}/{endpoint}?{q}"
    try:
        with urlopen(Request(url)) as r:
            return json.loads(r.read().decode())
    except HTTPError as e:
        print(f"  API ERR {e.code}: {e.read().decode()[:200]}")
        return None
    except Exception as e:
        print(f"  ERR: {e}")
        return None

def sanitize(s):
    if not isinstance(s, str): return ""
    return re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '',
           re.sub(r'[\ud800-\udfff]', '', s)).strip()

def dur(iso):
    m = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", iso or "")
    if not m: return "0:00", 0
    h, mn, s = int(m[1] or 0), int(m[2] or 0), int(m[3] or 0)
    t = h*3600 + mn*60 + s
    if h: return f"{h}:{mn:02d}:{s:02d}", t
    return f"{mn}:{s:02d}", t

def fmtv(n):
    if n >= 1e9: return f"{n/1e9:.1f}B"
    if n >= 1e6: return f"{n/1e6:.1f}M"
    if n >= 1e3: return f"{n/1e3:.0f}K"
    return str(n)

def search_videos(query, max_results=50):
    """Search YouTube for videos matching query, return video IDs."""
    from urllib.parse import quote
    video_ids = []
    next_page = ""

    while len(video_ids) < max_results:
        batch = min(50, max_results - len(video_ids))
        params = {
            "part": "snippet",
            "q": quote(query),
            "type": "video",
            "maxResults": str(batch),
            "order": "viewCount",
            "videoDuration": "medium",  # 4-20 min
            "safeSearch": "strict",
            "relevanceLanguage": "en",
        }
        if next_page:
            params["pageToken"] = next_page

        data = api("search", params)
        if not data or not data.get("items"):
            break

        for item in data["items"]:
            vid_id = item.get("id", {}).get("videoId")
            if vid_id:
                video_ids.append(vid_id)

        next_page = data.get("nextPageToken", "")
        if not next_page:
            break
        time.sleep(0.15)

    return video_ids[:max_results]

def get_video_details(video_ids):
    """Get full details for a batch of video IDs."""
    all_details = []
    for i in range(0, len(video_ids), 50):
        chunk = ",".join(video_ids[i:i+50])
        data = api("videos", {"part": "snippet,statistics,contentDetails", "id": chunk})
        if data and data.get("items"):
            all_details.extend(data["items"])
        time.sleep(0.15)
    return all_details

def main():
    all_body_data = {}
    total = 0

    for bp in BODY_PARTS:
        sys.stdout.write(f"Fetching {bp['name']}...")
        sys.stdout.flush()

        # Search with main query
        video_ids = search_videos(bp["query"], 35)

        # Also search with extra terms to get more variety
        extra_ids = search_videos(bp["extra"], 20)

        # Combine and deduplicate
        seen = set()
        combined = []
        for vid in video_ids + extra_ids:
            if vid not in seen:
                seen.add(vid)
                combined.append(vid)
        combined = combined[:50]

        if not combined:
            print(f" no results")
            continue

        # Get full details
        details = get_video_details(combined)

        # Sort by views
        details.sort(key=lambda v: int(v.get("statistics", {}).get("viewCount", 0)), reverse=True)

        videos = []
        for v in details:
            views = int(v.get("statistics", {}).get("viewCount", 0))
            d_str, d_sec = dur(v.get("contentDetails", {}).get("duration", ""))

            # Skip very short (shorts) or very long lectures
            if d_sec < 60 or d_sec > 7200:
                continue
            if views < 1000:
                continue

            vid = v["id"]
            pub = v["snippet"].get("publishedAt", "")
            channel_title = sanitize(v["snippet"].get("channelTitle", ""))

            videos.append({
                "id": f"bp-{bp['id']}-{vid}",
                "youtubeId": vid,
                "title": sanitize(v["snippet"]["title"]),
                "description": sanitize(v["snippet"].get("description", ""))[:300],
                "thumbnail": f"https://img.youtube.com/vi/{vid}/hqdefault.jpg",
                "duration": d_str,
                "views": views,
                "publishedAt": pub.split("T")[0] if pub else "",
                "channelName": channel_title,
                "channelAvatar": v["snippet"].get("thumbnails", {}).get("default", {}).get("url", ""),
                "tags": [sanitize(t) for t in (v["snippet"].get("tags") or [])[:8]],
            })

        all_body_data[bp["id"]] = {
            "id": bp["id"],
            "name": bp["name"],
            "videoCount": len(videos),
            "videos": videos,
        }

        total += len(videos)
        print(f" {len(videos)} videos (total: {total})")
        time.sleep(0.3)

    # Save
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(all_body_data, indent=2, ensure_ascii=True))

    print(f"\nDONE: {len(all_body_data)} body parts, {total} total videos")
    print(f"Saved to: {OUTPUT}")

if __name__ == "__main__":
    main()
