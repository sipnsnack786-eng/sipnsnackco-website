import { Cookie } from "lucide-react";

export function Marquee({
  words,
  dark = false,
  slow = false,
  reverse = false,
  pauseOnHover = false,
  className = "",
}: {
  words: string[];
  dark?: boolean;
  slow?: boolean;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const row = [...words, ...words];
  return (
    <div
      className={`relative overflow-hidden py-4 ${pauseOnHover ? "marquee-paused" : ""} ${className}`}
    >
      <div
        className={`flex w-max items-center gap-8 whitespace-nowrap pr-8 ${
          slow ? "animate-marquee-slow" : "animate-marquee"
        } ${reverse ? "marquee-reverse" : ""}`}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-lg font-bold uppercase tracking-[0.18em] md:text-xl ${
                dark ? "text-cream" : "text-ink"
              } ${i % 2 === 1 ? (dark ? "text-stroke-cream" : "text-stroke-ink") : ""}`}
            >
              {w}
            </span>
            <Cookie
              className={`h-5 w-5 shrink-0 ${dark ? "text-honey" : "text-caramel"}`}
              strokeWidth={2.2}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
