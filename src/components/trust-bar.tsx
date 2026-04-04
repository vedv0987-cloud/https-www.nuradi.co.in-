"use client";

const MARQUEE_ITEMS = [
  { emoji: "\u2705", bold: "28 verified", text: "creators" },
  { emoji: "\uD83D\uDCDD", bold: "1,000+ expert", text: "videos" },
  { emoji: "\uD83D\uDD2C", bold: "Science-backed", text: "content" },
  { emoji: "\uD83D\uDCC5", bold: "Updated", text: "weekly" },
  { emoji: "\uD83E\uDE7A", bold: "120+ conditions", text: "covered" },
  { emoji: "\u2714\uFE0F", bold: "Medically reviewed", text: "content" },
];

export function TrustBar() {
  return (
    <div className="overflow-hidden bg-teal-700 dark:bg-teal-800">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
          (item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8 text-sm text-white/90"
            >
              <span>{item.emoji}</span>
              <span>
                <span className="font-semibold">{item.bold}</span>{" "}
                {item.text}
              </span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
