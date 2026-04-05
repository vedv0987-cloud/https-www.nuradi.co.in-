// Health news RSS sources — trusted health news outlets, India-focused + global
// Some publishers don't expose direct RSS for their /health section, so we use
// Google News RSS topic feeds when needed.

export interface NewsSource {
  id: string;
  name: string;
  url: string; // RSS feed URL
  homepage: string;
  region: "india" | "global";
  logo?: string; // emoji
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "who",
    name: "WHO",
    url: "https://www.who.int/rss-feeds/news-english.xml",
    homepage: "https://www.who.int/news",
    region: "global",
    logo: "🌍",
  },
  {
    id: "bbc-health",
    name: "BBC Health",
    url: "https://feeds.bbci.co.uk/news/health/rss.xml",
    homepage: "https://www.bbc.com/news/health",
    region: "global",
    logo: "📺",
  },
  {
    id: "healthline",
    name: "Healthline",
    url: "https://www.healthline.com/rss/health-news",
    homepage: "https://www.healthline.com/health-news",
    region: "global",
    logo: "💊",
  },
  {
    id: "medical-news-today",
    name: "Medical News Today",
    url: "https://www.medicalnewstoday.com/newsfeeds/rss/medical_all.xml",
    homepage: "https://www.medicalnewstoday.com/",
    region: "global",
    logo: "🏥",
  },
  {
    id: "the-hindu-health",
    name: "The Hindu Health",
    url: "https://www.thehindu.com/sci-tech/health/feeder/default.rss",
    homepage: "https://www.thehindu.com/sci-tech/health/",
    region: "india",
    logo: "🇮🇳",
  },
  {
    id: "ndtv-health",
    name: "NDTV Health",
    url: "https://news.google.com/rss/search?q=site:ndtv.com/health&hl=en-IN&gl=IN&ceid=IN:en",
    homepage: "https://www.ndtv.com/health",
    region: "india",
    logo: "📰",
  },
  {
    id: "et-health",
    name: "ET Health World",
    url: "https://health.economictimes.indiatimes.com/rss/topstories",
    homepage: "https://health.economictimes.indiatimes.com/",
    region: "india",
    logo: "📈",
  },
  {
    id: "indian-express-health",
    name: "Indian Express Health",
    url: "https://indianexpress.com/section/lifestyle/health/feed/",
    homepage: "https://indianexpress.com/section/lifestyle/health/",
    region: "india",
    logo: "🗞️",
  },
  {
    id: "news18-health",
    name: "News18 Health",
    url: "https://news.google.com/rss/search?q=site:news18.com/news/lifestyle/health&hl=en-IN&gl=IN&ceid=IN:en",
    homepage: "https://www.news18.com/news/lifestyle/health/",
    region: "india",
    logo: "🇮🇳",
  },
  {
    id: "google-health",
    name: "Google Health News",
    url: "https://news.google.com/rss/headlines/section/topic/HEALTH?hl=en-IN&gl=IN&ceid=IN:en",
    homepage: "https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ",
    region: "global",
    logo: "🔍",
  },
];
