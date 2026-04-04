#!/usr/bin/env python3
"""
HealthEduTV v3 — YouTube Data Fetcher
Fetches REAL data from YouTube Data API v3.
"""

import os, sys, json, time, re
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError
from pathlib import Path

API_KEY = "AIzaSyBx-jd7l3WtDlT2mZOVmeA0OhgSXY1Hk9Y"
BASE = "https://www.googleapis.com/youtube/v3"
OUTPUT = Path("src/data/database.json")

CHANNELS = [
    {"id": "doctor-mike", "name": "Doctor Mike", "ytId": "UC0QHWhjbe5fGJEPz3sVb6nw", "cats": ["health", "medical"]},
    {"id": "dr-eric-berg", "name": "Dr. Eric Berg DC", "ytId": "UC3w193M5tYPJqF0Hi-7U-2g", "cats": ["health", "nutrition"]},
    {"id": "fit-tuber", "name": "Fit Tuber", "ytId": "UCyQyb4MBhDmto7D_AndrUnQ", "cats": ["health", "nutrition"]},
    {"id": "satvic-movement", "name": "Satvic Movement", "ytId": "UCGKbB7SorrVnOGa5_xhk7wA", "cats": ["health"]},
    {"id": "institute-human-anatomy", "name": "Institute of Human Anatomy", "ytId": "UCpMrSAclQey4HF6MQB3Ytpw", "cats": ["medical", "science"]},
    {"id": "jeff-nippard", "name": "Jeff Nippard", "ytId": "UC68TLK0mAEzUyHx5x5k-S1Q", "cats": ["fitness"]},
    {"id": "athlean-x", "name": "ATHLEAN-X", "ytId": "UCe0TLA0EsQbE-MjuHXevj2A", "cats": ["fitness", "health"]},
    {"id": "yoga-adriene", "name": "Yoga With Adriene", "ytId": "UCFKE7WVJfvaHW5q283SxchA", "cats": ["fitness", "mental-health"]},
    {"id": "blogilates", "name": "Blogilates", "ytId": "UCIJMOYpJKCVrhvIJcIBMaaA", "cats": ["fitness"]},
    {"id": "chloe-ting", "name": "Chloe Ting", "ytId": "UCCgLoMYIyP0U56dEhEL1wXQ", "cats": ["fitness"]},
    {"id": "madfit", "name": "MadFit", "ytId": "UCpQ34afVgk8cRQBjSJ1xuJQ", "cats": ["fitness"]},
    {"id": "pick-up-limes", "name": "Pick Up Limes", "ytId": "UCq2E1mIwUKMWzCA4liA_XGQ", "cats": ["nutrition"]},
    {"id": "abbey-sharp", "name": "Abbey Sharp", "ytId": "UCBVfmCMz3AZjkl5MxSSpi0g", "cats": ["nutrition", "health"]},
    {"id": "therapy-nutshell", "name": "Therapy in a Nutshell", "ytId": "UCpuXFTlEHAV5drrE7LJLowA", "cats": ["mental-health"]},
    {"id": "psych2go", "name": "Psych2Go", "ytId": "UCkJEpR7JmS36tajD34Gp4VA", "cats": ["mental-health"]},
    {"id": "kati-morton", "name": "Kati Morton", "ytId": "UCzBYOHyEEzlkRYDHzfCP5Tg", "cats": ["mental-health", "health"]},
    {"id": "school-of-life", "name": "The School of Life", "ytId": "UC7IcJI8PUf5Z3zKxnZvTBog", "cats": ["mental-health", "personal-dev"]},
    {"id": "ninja-nerd", "name": "Ninja Nerd", "ytId": "UC6QYFutt9cluQ3uSM963_KQ", "cats": ["medical", "science"]},
    {"id": "osmosis", "name": "Osmosis from Elsevier", "ytId": "UCNI0qOojpkhsUtaQ4_2NUhQ", "cats": ["medical"]},
    {"id": "kurzgesagt", "name": "Kurzgesagt", "ytId": "UCsXVk37bltHxD1rDPwtNM8Q", "cats": ["science"]},
    {"id": "3blue1brown", "name": "3Blue1Brown", "ytId": "UCYO_jab_esuFRV4b17AJtAw", "cats": ["science"]},
    {"id": "veritasium", "name": "Veritasium", "ytId": "UCHnyfMqiRRG1u-2MsSQLbXA", "cats": ["science"]},
    {"id": "crashcourse", "name": "CrashCourse", "ytId": "UCX6b17PVsYBQ0ip5gyeme-Q", "cats": ["science", "medical"]},
    {"id": "khan-academy", "name": "Khan Academy", "ytId": "UC4a-Gbdw7vOaccHmFo40b9g", "cats": ["science", "medical"]},
    {"id": "ted-ed", "name": "TED-Ed", "ytId": "UCsooa4yRKGN_zEE8iknghZA", "cats": ["science"]},
    {"id": "smarter-every-day", "name": "SmarterEveryDay", "ytId": "UC6107grRI4m0o2-emgoDnAA", "cats": ["science"]},
    {"id": "ali-abdaal", "name": "Ali Abdaal", "ytId": "UCoOae5nYA7VqaXzerajD0lg", "cats": ["personal-dev", "health"]},
    {"id": "thomas-frank", "name": "Thomas Frank", "ytId": "UCG-KntY7aVnIGXYEBQvmBAQ", "cats": ["personal-dev"]},
    {"id": "ankur-warikoo", "name": "warikoo", "ytId": "UCRzYN32xtBf3Yxsx5BvJWJw", "cats": ["personal-dev"]},
]

def api(endpoint, params):
    params["key"] = API_KEY
    q = "&".join(f"{k}={v}" for k, v in params.items())
    url = f"{BASE}/{endpoint}?{q}"
    try:
        with urlopen(Request(url)) as r:
            data = json.loads(r.read().decode())
        time.sleep(0.12)
        return data
    except HTTPError as e:
        print(f"  API ERR {e.code}: {e.read().decode()[:150]}")
        return None
    except Exception as e:
        print(f"  ERR: {e}")
        return None

def sanitize(s):
    if not isinstance(s, str): return ""
    # Remove surrogate pairs and control chars
    return re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '',
           re.sub(r'[\ud800-\udfff]', '', s))

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

def main():
    db = {"channels": [], "videos": [], "metadata": {}}
    total = 0
    failed = []

    for ch in CHANNELS:
        sys.stdout.write(f"Fetching {ch['name']}...")
        sys.stdout.flush()

        # Get channel info
        d = api("channels", {"part": "snippet,statistics,contentDetails", "id": ch["ytId"]})
        if not d or not d.get("items"):
            # Try by handle
            d = api("search", {"part": "snippet", "q": ch["name"] + " youtube channel", "type": "channel", "maxResults": "1"})
            if d and d.get("items"):
                real_id = d["items"][0]["snippet"]["channelId"]
                d = api("channels", {"part": "snippet,statistics,contentDetails", "id": real_id})
            if not d or not d.get("items"):
                print(f" SKIP")
                failed.append(ch["name"])
                continue

        info = d["items"][0]
        avatar = info["snippet"]["thumbnails"].get("high", info["snippet"]["thumbnails"].get("default", {})).get("url", "")
        uploads = info.get("contentDetails", {}).get("relatedPlaylists", {}).get("uploads")
        subs = int(info["statistics"].get("subscriberCount", 0))

        db["channels"].append({
            "id": ch["id"],
            "youtubeChannelId": ch["ytId"],
            "name": ch["name"],
            "avatar": avatar,
            "description": sanitize(info["snippet"].get("description", ""))[:300],
            "subscriberCount": subs,
            "videoCount": int(info["statistics"].get("videoCount", 0)),
            "categories": ch["cats"],
            "youtubeUrl": f"https://youtube.com/{info['snippet'].get('customUrl', '@' + ch['id'])}",
            "verified": True,
        })

        if not uploads:
            print(f" no uploads")
            continue

        # Get videos from playlist
        vids = []
        npt = ""
        while len(vids) < 50:
            p = {"part": "contentDetails", "playlistId": uploads, "maxResults": "50"}
            if npt: p["pageToken"] = npt
            pd = api("playlistItems", p)
            if not pd or not pd.get("items"): break
            vids.extend([i["contentDetails"]["videoId"] for i in pd["items"] if i.get("contentDetails", {}).get("videoId")])
            npt = pd.get("nextPageToken", "")
            if not npt: break
        vids = vids[:50]

        # Get video details
        details = []
        for i in range(0, len(vids), 50):
            chunk = ",".join(vids[i:i+50])
            vd = api("videos", {"part": "snippet,statistics,contentDetails", "id": chunk})
            if vd and vd.get("items"): details.extend(vd["items"])

        # Sort by views
        details.sort(key=lambda v: int(v.get("statistics", {}).get("viewCount", 0)), reverse=True)

        count = 0
        for v in details:
            views = int(v.get("statistics", {}).get("viewCount", 0))
            d_str, d_sec = dur(v.get("contentDetails", {}).get("duration", ""))
            if d_sec < 60 or views < 500: continue

            vid = v["id"]
            pub = v["snippet"].get("publishedAt", "")

            db["videos"].append({
                "id": f"{ch['id']}-{vid}",
                "youtubeId": vid,
                "title": sanitize(v["snippet"]["title"]),
                "description": sanitize(v["snippet"].get("description", ""))[:400],
                "thumbnail": f"https://img.youtube.com/vi/{vid}/hqdefault.jpg",
                "duration": d_str,
                "views": views,
                "publishedAt": pub.split("T")[0] if pub else "",
                "category": ch["cats"][0],
                "tags": [sanitize(t) for t in (v["snippet"].get("tags") or [])[:8]],
                "channelId": ch["id"],
                "featured": count == 0,
            })
            count += 1

        total += count
        print(f" {count} videos (total: {total})")

    db["metadata"] = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalChannels": len(db["channels"]),
        "totalVideos": len(db["videos"]),
        "failed": failed,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(db, indent=2, ensure_ascii=True))

    print(f"\nDONE: {len(db['channels'])} channels, {len(db['videos'])} videos")
    if failed: print(f"Failed: {', '.join(failed)}")

if __name__ == "__main__":
    main()
