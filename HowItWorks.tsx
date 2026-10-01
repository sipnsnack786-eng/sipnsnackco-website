import { Coffee, Cookie, CupSoda } from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";
import { steps } from "../data/site";

const icons = [Coffee, CupSoda, Cookie];

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-sage/30 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <Eyebrow>How to cup</Eyebrow>
        </Reveal>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
              Drink it.
              <br />
              Then eat the <span className="text-caramel">evidence.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs font-hand text-2xl leading-tight text-caramel-deep md:-rotate-2">
              three steps. one cup. absolutely no dishes.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.02fr_1fr]">
          {/* photo card */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="relative -rotate-2 rounded-[2rem] border border-ink/10 bg-parchment p-4 pb-6 shadow-2xl shadow-ink/15 transition-transform duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-[1.5rem]">
                <img
                  src="/images/bite.jpg"
                  alt="Hand holding an edible cup with a bite taken out"
                  className="aspect-[4/4.4] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-2">
                <span className="font-hand text-2xl text-ink">the money shot</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-mocha">
                  Ossington · 8:04 AM
                </span>
              </div>
              <span className="absolute -right-5 -top-5 grid h-24 w-24 rotate-12 place-items-center rounded-full bg-honey text-center font-display text-xs font-extrabold uppercase leading-tight tracking-wider text-ink shadow-lg">
                Est.
                <br />
                2023
              </span>
            </div>
          </Reveal>

          {/* steps */}
          <div>
            {steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={s.n} delay={0.1 + i * 0.12}>
                  <div className="group border-b border-ink/10 py-9 first:pt-0 last:border-0">
                    <div className="flex items-start gap-6">
                      <span className="text-stroke-ink-thin font-display text-6xl font-extrabold leading-none transition-colors md:text-7xl">
                        {s.n}
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-cream transition-colors duration-300 group-hover:bg-caramel">
                            <Icon className="h-5 w-5" strokeWidth={2.2} />
                          </span>
                          <h3 className="font-display text-3xl font-extrabold tracking-tight">
                            {s.title}
                          </h3>
                        </div>
                        <p className="mt-3 max-w-md leading-relaxed text-mocha">{s.body}</p>
                        <p className="mt-2 -rotate-1 font-hand text-xl text-caramel-deep">
                          {s.scribble}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={0.4}>
              <a
                href="#flavors"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-caramel px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-widest text-cream transition-all hover:bg-ink active:scale-95"
              >
                See the flavors
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
