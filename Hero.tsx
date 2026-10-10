import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Marquee } from "./Marquee";
import { fmt, marqueeWords, SIZES } from "./site";

const ease = [0.22, 1, 0.36, 1] as const;

function word(children: React.ReactNode, delay: number, cls = "") {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
        className={`block ${cls}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yCup = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const [size, setSize] = useState(SIZES[2]);

  return (
    <section id="product" ref={ref} className="relative overflow-hidden pt-32 md:pt-40">
      {/* backdrop decorations */}
      <div className="pointer-events-none absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-honey/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-64 h-[420px] w-[420px] rounded-full bg-caramel/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-dots opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <h1 aria-label="Edible cups for cafés, hospitality and events — Bite. Sip. Smile." className="relative font-display text-[clamp(4rem,15vw,11.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em]">
          {word("Bite.", 0.05)}
          {word(<span className="text-stroke-ink">Sip.</span>, 0.15)}

          {/* the cup */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.3, ease }}
            style={{ y: yCup }}
            className="relative z-10 mx-auto -my-[clamp(1.2rem,5vw,3rem)] aspect-square w-[clamp(230px,36vw,400px)]"
          >
            {/* soft golden halo */}
            <div className="pointer-events-none absolute -inset-[18%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-honey)_45%,transparent)_0%,transparent_65%)] blur-2xl" />

            <div className="group relative h-full w-full animate-float-soft">
              {/* gilded rim */}
              <div className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_140deg,var(--color-honey),var(--color-parchment),var(--color-caramel-deep),var(--color-parchment),var(--color-honey))] shadow-[0_40px_80px_-30px_rgba(43,22,12,0.55)]" />
              <div className="relative h-full w-full overflow-hidden rounded-full p-[7px]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-parchment">
                  <img
                    src="/images/hero-cup.jpg"
                    alt="Edible wafer cup filled with cappuccino"
                    className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08]"
                  />
                  {/* inner vignette + light sweep */}
                  <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(43,22,12,0.18)]" />
                  <div className="pointer-events-none absolute inset-0 animate-shine bg-[linear-gradient(115deg,transparent_35%,rgba(255,250,235,0.45)_50%,transparent_65%)] bg-[length:250%_100%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {word(<span className="text-caramel">Smile.</span>, 0.25)}
        </h1>

        {/* size picker */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-9"
        >
          <p className="-rotate-2 font-hand text-2xl text-caramel-deep">pick your pour</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {SIZES.map((s) => {
              const active = s.ml === size.ml;
              return (
                <button
                  key={s.ml}
                  onClick={() => setSize(s)}
                  className={`relative rounded-full border-2 px-5 py-2.5 font-display text-sm font-extrabold transition-colors ${
                    active ? "border-ink text-cream" : "border-ink/20 text-coffee hover:border-ink/60"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="hero-size"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {s.ml} ml · {fmt(s.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-10 max-w-xl text-balance text-lg text-mocha md:text-xl"
        >
          Edible beverage cups for coffee, latte and chai service. <span className="font-semibold text-ink">Drink it. Then eat the cup.</span>
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#flavors"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-display text-sm font-extrabold uppercase tracking-widest text-cream transition-all hover:bg-caramel active:scale-95"
          >
            See the catalog
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-7 py-[14px] font-display text-sm font-extrabold uppercase tracking-widest transition-colors hover:bg-ink hover:text-cream active:scale-95"
          >
            How it works
          </a>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 pb-16 text-xs font-bold uppercase tracking-[0.25em] text-ink/50"
        >
          Edible cups for cafés, caterers and hospitality · Canada & USA
        </motion.div>
      </div>

      {/* ticker band */}
      <div className="relative -rotate-1 border-y-4 border-ink bg-honey py-1 shadow-xl shadow-ink/10">
        <Marquee words={marqueeWords} slow />
      </div>
    </section>
  );
}
