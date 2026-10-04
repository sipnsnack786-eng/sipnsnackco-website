import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, BadgeDollarSign, Leaf, Timer } from "lucide-react";
import { Marquee } from "./Marquee";
import { fmt, marqueeWords, SIZES } from "./site";

const ease = [0.22, 1, 0.36, 1] as const;

function word(children: React.ReactNode, delay: number, cls = "") {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
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
  const yBadgeL = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yBadgeR = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [size, setSize] = useState(SIZES[2]);

  return (
    <section id="product" ref={ref} className="relative overflow-hidden pt-32 md:pt-40">
      {/* backdrop decorations */}
      <div className="pointer-events-none absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-honey/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-64 h-[420px] w-[420px] rounded-full bg-caramel/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-dots opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <h1 className="relative font-display text-[clamp(4rem,15vw,11.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em]" aria-label="Edible Cups for Cafés, Hospitality and Events">
          {word("Bite.", 0.05)}
          {word(<span className="text-stroke-ink">Sip.</span>, 0.15)}

          {/* the cup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            style={{ y: yCup }}
            className="relative z-10 mx-auto -my-[clamp(1.2rem,5vw,3rem)] aspect-square w-[clamp(230px,36vw,400px)]"
          >
            {/* steam */}
            <div className="pointer-events-none absolute -top-7 left-1/2 flex -translate-x-1/2 gap-3">
              {[0, 0.5, 1].map((d) => (
                <span
                  key={d}
                  style={{ animationDelay: `${d}s` }}
                  className="block h-6 w-1.5 animate-steam rounded-full bg-mocha/40 blur-[2px]"
                />
              ))}
            </div>

            {/* hand-drawn orbit */}
            <div className="pointer-events-none absolute -inset-5 rounded-full border-2 border-dashed border-ink/25" />
            <div className="pointer-events-none absolute -inset-12 rounded-full border border-ink/10" />

            <img
              src="/images/hero-cup.jpg"
              alt="Edible wafer cup filled with cappuccino"
              className="h-full w-full rounded-full border-[6px] border-parchment object-cover shadow-2xl shadow-ink/25"
            />

            {/* floating badges */}
            <motion.div style={{ y: yBadgeL }} className="absolute -left-[16%] top-[6%]">
              <div
                style={{ ["--float-rot" as string]: "-6deg" }}
                className="animate-float rounded-2xl bg-caramel px-4 py-2.5 text-left text-cream shadow-xl shadow-caramel/40"
              >
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest opacity-90">
                  <BadgeDollarSign className="h-3.5 w-3.5" /> {size.ml} ml
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={size.ml}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="block font-display text-xl font-extrabold leading-none"
                  >
                    {fmt(size.price)}/pc
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div style={{ y: yBadgeR }} className="absolute -right-[14%] top-[42%]">
              <div
                style={{ ["--float-rot" as string]: "5deg" }}
                className="animate-float-delay flex items-center gap-2 rounded-2xl bg-pistachio px-4 py-2.5 text-cream shadow-xl shadow-pistachio/40"
              >
                <Leaf className="h-4 w-4" />
                <span className="font-display text-sm font-extrabold">100% edible</span>
              </div>
            </motion.div>

            <motion.div style={{ y: yBadgeL }} className="absolute -bottom-[4%] -left-[10%]">
              <div
                style={{ ["--float-rot" as string]: "3deg" }}
                className="animate-float flex items-center gap-2 rounded-2xl bg-ink px-4 py-2.5 text-cream shadow-xl shadow-ink/30"
              >
                <Timer className="h-4 w-4 text-honey" />
                <span className="font-display text-sm font-extrabold">Crispy 40+ min</span>
              </div>
            </motion.div>

            <span className="absolute -right-[6%] -top-[8%] -rotate-12 font-hand text-2xl text-caramel-deep md:text-3xl">
              still warm!
            </span>
          </motion.div>

          {word(<span className="text-caramel">Smile.</span>, 0.25)}
        </h1>

        {/* size picker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-10 max-w-xl text-balance text-lg text-mocha md:text-xl"
        >
          Crispy wafer coffee cups that hold your flat white for 40 minutes — then hold their own
          with a glass of milk. <span className="font-semibold text-ink">Drink it. Then eat the cup.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 pb-16 text-xs font-bold uppercase tracking-[0.25em] text-ink/50"
        >
          Free delivery across Canada & the USA · 10% off 1,000+ pcs
        </motion.div>
      </div>

      {/* ticker band */}
      <div className="relative -rotate-1 border-y-4 border-ink bg-honey py-1 shadow-xl shadow-ink/10">
        <Marquee words={marqueeWords} slow />
      </div>
    </section>
  );
}
