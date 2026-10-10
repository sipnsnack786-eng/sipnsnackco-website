import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Eyebrow, Reveal } from "./Reveal";

function Stat({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (x) => setV(x),
    });
    return () => controls.stop();
  }, [started, value]);

  return (
    <div className="border-t-2 border-cream/15 pt-5">
      <span className="font-display text-5xl font-extrabold tracking-tight text-honey md:text-6xl">
        {Math.round(v)}
        {suffix}
      </span>
      <p className="mt-2 max-w-[210px] text-sm leading-relaxed text-cream/70">{label}</p>
    </div>
  );
}

export function Sustainability() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="px-3 py-6 md:px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-cream md:rounded-[3.5rem]">
        <div className="pointer-events-none absolute inset-0 bg-dots-cream opacity-40" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-caramel/20 blur-3xl" />

        <div
          ref={ref}
          className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-2"
        >
          <div>
            <Reveal>
              <Eyebrow dark>Planet candy</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-6xl">
                The only cup you <span className="text-honey">can't</span> throw away.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75">
                Every year, roughly <span className="font-semibold text-cream">58 billion</span>{" "}
                paper cups end up in landfills — wax-lined, unrecyclable, forgotten. Ours get
                baked, sipped from, and happily devoured. The landfill never even knows we were
                here.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
              <Stat started={inView} value={100} suffix="%" label="edible — shell, lining, even the stamp" />
              <Stat started={inView} value={0} suffix="" label="lids, liners, straws or guilt required" />
              <Stat started={inView} value={40} suffix="+" label="minutes crispy. we timed it. twice." />
              <Stat started={inView} value={58} suffix="B" label="paper cups binned yearly — somebody had to chew back" />
            </div>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="relative rotate-2 rounded-[2rem] border-4 border-cream/15 shadow-2xl shadow-black/40 transition-transform duration-500 hover:rotate-0">
              <img
                src="/images/flatlay.jpg"
                alt="Assorted edible cups with ingredients"
                loading="lazy"
                className="aspect-[4/4.6] w-full rounded-[1.8rem] object-cover"
              />
              <span className="absolute -left-6 -top-6 grid h-28 w-28 -rotate-12 place-items-center rounded-full bg-caramel p-3 text-center font-display text-[11px] font-extrabold uppercase leading-tight tracking-wider text-cream shadow-xl">
                oat, wheat & cocoa
              </span>
            </div>
            <p className="mt-6 -rotate-2 text-center font-hand text-2xl text-honey">
              crumb-free guarantee* <span className="text-cream/60">(*crumbs likely)</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
