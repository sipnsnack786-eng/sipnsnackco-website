import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeDollarSign, FileText, Leaf, Package } from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";
import { fmt, priceFor, products, SIZES, SLEEVE_SIZE, type Product } from "./site";

function ProductCard({ p, i }: { p: Product; i: number }) {
  const [ml, setMl] = useState(200);
  const price = priceFor(ml);

  return (
    <Reveal delay={0.08 * i} className="h-full">
      <motion.article
        whileHover={{ y: -8, rotate: 0 }}
        initial={false}
        style={{ rotate: i === 1 ? "0deg" : i === 0 ? "-1.2deg" : "1.2deg", background: p.bg }}
        className="group flex h-full flex-col rounded-[1.75rem] border border-ink/8 p-4 pb-5 shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-ink/15"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          />
          {p.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-parchment px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink shadow">
              {p.badge}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-xl font-extrabold leading-tight tracking-tight">
          {p.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-mocha">{p.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.notes.map((n) => (
            <span
              key={n}
              className="rounded-full border border-ink/10 bg-parchment/80 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-coffee"
            >
              {n}
            </span>
          ))}
        </div>

        <div className="mt-4 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-mocha">
            Available sizes & per-pc price
          </p>
          <div className="mt-2 space-y-1.5">
            {SIZES.map((s) => {
              const active = s.ml === ml;
              return (
                <button
                  key={s.ml}
                  onClick={() => setMl(s.ml)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/10 bg-parchment/70 text-coffee hover:border-ink/40"
                  }`}
                >
                  <span>{s.ml} ml</span>
                  <span className="font-display font-extrabold">{fmt(s.price)}/pc</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-mocha">
          <Package className="h-3.5 w-3.5 text-caramel" />
          Packed by the sleeve of {SLEEVE_SIZE} — {fmt(price * SLEEVE_SIZE)}
        </p>
      </motion.article>
    </Reveal>
  );
}

export function Flavors() {
  return (
    <section id="flavors" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Catalog</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
                Three flavors.
                <br />
                Four <span className="text-caramel">sizes.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-mocha">
              From a 100 ml espresso shot to a 250 ml slow-sipper — priced by cup size from{" "}
              <span className="font-semibold text-ink">$0.65 to $0.80/pc</span>. Orders of 1,000+
              pcs save 10%.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>

        {/* spec strip */}
        <Reveal delay={0.2}>
          <div className="mt-12 grid gap-4 rounded-3xl border border-ink/10 bg-parchment p-6 sm:grid-cols-3 md:p-7">
            {[
              [Leaf, "Product & allergen information", "Spec sheet available on request"],
              [BadgeDollarSign, "10% off at 1,000+ pcs", "Mixed sizes & flavors count together"],
              [FileText, "Business supply options", "Discuss your presentation requirements"],
            ].map(([Icon, title, sub]) => {
              const C = Icon as typeof Leaf;
              return (
                <div key={String(title)} className="flex items-start gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-caramel/12 text-caramel-deep">
                    <C className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="font-display font-extrabold leading-tight">{String(title)}</p>
                    <p className="mt-1 text-sm text-mocha">{String(sub)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
