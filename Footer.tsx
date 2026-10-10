import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  AtSign,
  Camera,
  Clapperboard,
  Cookie,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SITE } from "./site";

export function Footer() {
  return (
    <>
      {/* CTA band */}
      <section className="px-3 pb-6 md:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-caramel py-24 text-center text-cream md:rounded-[3.5rem]">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -left-16 -top-16 text-cream/15"
          >
            <Cookie className="h-64 w-64" />
          </motion.span>
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -bottom-20 -right-16 text-ink/10"
          >
            <Cookie className="h-72 w-72" />
          </motion.span>

          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
                <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                Last call for today's batch
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
                Ready to bite
                <br />
                the cup?
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-5 max-w-md text-lg text-cream/85">
                Ask about samples and wholesale options for businesses across
                Canada & the USA.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#inquiry"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-sm font-extrabold uppercase tracking-widest text-cream transition-all hover:bg-coffee active:scale-95"
                >
                  Request a quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="mailto:sipnsnack786@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-cream px-8 py-[14px] font-display text-sm font-extrabold uppercase tracking-widest transition-colors hover:bg-cream hover:text-caramel-deep active:scale-95"
                >
                  Email us
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 font-hand text-2xl text-cream/90">go on. the cup is literally a cookie.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer id="contact" className="relative overflow-hidden bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-caramel text-cream">
                  <Cookie className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <span className="font-display text-xl font-extrabold tracking-tight">
                  Sip N Snack Co.
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
                Edible coffee cups for businesses in Canada and the USA. Drink it, then eat the cup.
                Bite · Sip · Smile.
              </p>
              <div className="mt-5 flex gap-2">
                {[Camera, AtSign, Clapperboard].map((Icon, i) => (
                  <a
                    key={i}
                    href="#top"
                    aria-label="Social link"
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:bg-caramel hover:text-cream"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-honey">Visit</h4>
              <ul className="mt-4 space-y-2 text-sm text-cream/70">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  {SITE.address1}
                  <br />
                  {SITE.address2}
                </li>
                <li>{SITE.hours}</li>
                <li>Or until the trays run out</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-honey">Talk</h4>
              <ul className="mt-4 space-y-2 text-sm text-cream/70">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="transition-colors hover:text-cream"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:+1${SITE.phone.replace(/-/g, "")}`}
                    className="flex items-center gap-2 transition-colors hover:text-cream"
                  >
                    <Phone className="h-3.5 w-3.5 text-caramel" /> {SITE.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-cream"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-pistachio" /> WhatsApp: {SITE.phone}
                  </a>
                </li>
                <li>
                  <a href="#wholesale" className="transition-colors hover:text-cream">
                    Wholesale inquiries
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-honey">Explore</h4>
              <ul className="mt-4 space-y-2 text-sm text-cream/70">
                <li><a href="#flavors" className="transition-colors hover:text-cream">Flavors & sizes</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-cream">Pricing</a></li>
                <li><a href="#segments" className="transition-colors hover:text-cream">Who we serve</a></li>
              </ul>
            </div>
          </div>

          <a
            href="#top"
            className="group mt-16 block text-center font-display text-[clamp(2.6rem,9.5vw,8.5rem)] font-extrabold uppercase leading-none tracking-tight"
          >
            <span className="text-stroke-cream transition-colors duration-500 group-hover:text-cream">
              Sip N Snack
            </span>
          </a>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50">
            <span>© 2026 Sip N Snack Co. All crumbs reserved.</span>
            <span className="font-semibold uppercase tracking-[0.25em]">Bite · Sip · Smile</span>
            <a
              href="#top"
              className="flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 font-semibold transition-colors hover:bg-cream hover:text-ink"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
