"use client";

const MARQUEE_ITEMS = [
  { emoji: "\u2714\uFE0F", bold: "Medically reviewed", text: "content" },
  { emoji: "\uD83D\uDD0D", bold: "130 medical reviewers", text: "in network" },
  { emoji: "\uD83C\uDFC6", bold: "19 years", text: "of experience" },
  { emoji: "\uD83D\uDCC8", bold: "50 million", text: "monthly readers" },
];

export function TrustBar() {
  return (
    <div className="overflow-hidden bg-[#f5f5f5] border-b border-[#e5e5e5]">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
          (item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-10 text-[13px] text-[#666]"
            >
              <span className="text-base">{item.emoji}</span>
              <span>
                <span className="font-semibold text-[#1a1a1a]">{item.bold}</span>{" "}
                {item.text}
              </span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
