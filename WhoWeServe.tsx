import {
  Briefcase,
  Building2,
  Coffee,
  CupSoda,
  Heart,
  PartyPopper,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const segments = [
  {
    icon: Coffee,
    title: "Cafés",
    body: "Turn every flat white into a pastry. One SKU, zero dishes, and a signature order your regulars will post about.",
  },
  {
    icon: Store,
    title: "Coffee shops & roasters",
    body: "Shelf-ready sleeves that move fast next to the beans. Private-label packaging and custom edible stamps available.",
  },
  {
    icon: PartyPopper,
    title: "Private events",
    body: "Birthdays, launches, gallery nights — hand out coffee that becomes dessert, with no rentals and nothing to bus.",
  },
  {
    icon: Heart,
    title: "Weddings",
    body: "The espresso-bar favor that disappears for the right reasons. We handle late-night servicing for 60 to 960 guests.",
  },
  {
    icon: Briefcase,
    title: "Corporate events",
    body: "Explore edible cups for meetings, conferences, trade shows and corporate hospitality.",
  },
  {
    icon: Building2,
    title: "Hotels",
    body: "In-room turndown cups, lobby bars, and banquet service. Contact us about business supply for hotel and banquet service.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food services",
    body: "For caterers and commissaries: uniform cases, spec sheets, and a line that answers before 6 PM, Mon–Sat.",
  },
  {
    icon: CupSoda,
    title: "…and anyone pouring",
    body: "Food trucks, markets, festivals — tell us the crowd, we'll size the order. Free delivery across Canada & the USA.",
  },
];

export function WhoWeServe() {
  return (
    <section id="segments" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Who we serve</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
                Build an edible cup{" "}
                <span className="text-caramel">program.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-mocha">
              One product, seven industries. Pick your lane — we spec, stamp, and ship it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s, i) => (
            <Reveal key={s.title} delay={0.05 * (i % 4)} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl border border-ink/8 bg-parchment p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-caramel/50 hover:shadow-xl hover:shadow-ink/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-caramel/12 text-caramel-deep transition-colors duration-300 group-hover:bg-caramel group-hover:text-cream">
                  <s.icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mocha">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <p className="mt-10 text-center">
            <a
              href="#inquiry"
              className="inline-flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-widest text-caramel-deep underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Not on the list? Tell us your crowd →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
