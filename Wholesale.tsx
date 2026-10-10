import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Coffee,
  Heart,
  Loader2,
  Mail,
  MessageCircle,
  PartyPopper,
  Send,
  Store,
  Truck,
  TriangleAlert,
  UtensilsCrossed,
  Package,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { BULK_OFF, BULK_QTY, fmt, priceFor, qtyOptions, SIZES, SITE } from "./site";

const segments = [
  { icon: Coffee, label: "Café" },
  { icon: Store, label: "Coffee shop" },
  { icon: PartyPopper, label: "Private event" },
  { icon: Heart, label: "Wedding" },
  { icon: Briefcase, label: "Corporate event" },
  { icon: Building2, label: "Hotel" },
  { icon: UtensilsCrossed, label: "Food service" },
];

const volumes = ["Under 240 cups", "240–1,000 cups", "1,000+ cups", "Not sure yet"];

const nextSteps = [
  ["01", "We reply within one business day — a human, not a bot."],
  ["02", "Request sample availability and delivery details for your location."],
  ["03", "Tasting call, your quote, your first case. Closed over coffee."],
] as const;

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm font-medium text-ink placeholder:text-ink/35 outline-none transition-all focus:border-caramel focus:ring-2 focus:ring-caramel/30";

const labelCls =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-mocha";

const darkLabelCls =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-cream/45";

type LeadType = "sample" | "pricing";
type Phase = "idle" | "sending" | "sent" | "error";

function InquiryForm() {
  const [leadType, setLeadType] = useState<LeadType>("sample");
  const [phase, setPhase] = useState<Phase>("idle");
  const [volume, setVolume] = useState(volumes[1]);
  const [segment, setSegment] = useState(segments[0].label);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const biz = String(data.get("business") || "");
    setPhase("sending");

    const payload = {
      _subject: `New ${leadType === "sample" ? "SAMPLE KIT" : "PRICING"} lead — ${
        biz || name || "website"
      }`,
      _template: "table",
      _captcha: "false",
      _autoresponse:
        "Thanks for contacting Sip N Snack Co.! We received your request and will reply within one business day (Mon–Sat, 9 AM–6 PM). — Sip N Snack Co., 747 Don Mills Rd, Toronto",
      lead_type: leadType === "sample" ? "SAMPLE REQUEST" : "Pricing / bulk order",
      name: String(data.get("name") || ""),
      business: biz,
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || "—"),
      segment,
      estimated_volume: leadType === "pricing" ? volume : "sample request",
      delivery_address: leadType === "sample" ? String(data.get("address") || "") : "—",
      message: String(data.get("message") || "—"),
    };

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      setPhase("sent");
    } catch {
      setPhase("error");
    }
  };

  const mailFallback = `mailto:${SITE.email}?subject=${encodeURIComponent(
    leadType === "sample" ? "Sample request" : "Pricing inquiry",
  )}`;

  return (
    <div
      id="inquiry"
      className="relative scroll-mt-32 rounded-[2rem] bg-parchment p-6 text-ink shadow-2xl shadow-black/30 md:p-8"
    >
      <AnimatePresence mode="wait">
        {phase === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -16 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              {leadType === "sample" ? (
                <Package className="h-16 w-16 text-caramel" strokeWidth={1.6} />
              ) : (
                <CheckCircle2 className="h-16 w-16 text-pistachio" strokeWidth={1.6} />
              )}
            </motion.div>
            <h4 className="mt-5 font-display text-3xl font-extrabold">
              {leadType === "sample"
                ? "Your kit is being packed!"
                : `Thanks${name ? `, ${name.split(" ")[0]}` : ""}!`}
            </h4>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-mocha">
              {leadType === "sample" ? (
                <>
                  We'll confirm details at{" "}
                  <span className="font-semibold text-ink">{email || "your email"}</span> and ship
                  your 6-cup tasting box — free, anywhere in Canada & the USA.
                </>
              ) : (
                <>
                  Your inquiry landed in our inbox. We'll reply to{" "}
                  <span className="font-semibold text-ink">{email || "your email"}</span> within one
                  business day — usually much faster.
                </>
              )}
            </p>
            <p className="mt-3 -rotate-2 font-hand text-2xl text-caramel-deep">talk soon!</p>
            <button
              onClick={() => setPhase("idle")}
              className="mt-7 rounded-full border-2 border-ink px-6 py-3 font-display text-xs font-extrabold uppercase tracking-widest transition-colors hover:bg-ink hover:text-cream"
            >
              Send another request
            </button>
          </motion.div>
        ) : phase === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <TriangleAlert className="h-16 w-16 text-caramel" strokeWidth={1.6} />
            <h4 className="mt-5 font-display text-3xl font-extrabold">That one got stuck</h4>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-mocha">
              The form didn't go through. Reach the oven directly — we still want to hear from you.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={mailFallback}
                className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-caramel"
              >
                <Mail className="h-4 w-4" /> {SITE.email}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-bold transition-colors hover:bg-ink hover:text-cream"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp {SITE.phone}
              </a>
              <button
                onClick={() => setPhase("idle")}
                className="text-xs font-bold uppercase tracking-widest text-mocha underline-offset-4 hover:underline"
              >
                Try the form again
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            onSubmit={submit}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight">
                  Samples & pricing
                </h3>
                <p className="font-hand text-xl text-caramel-deep">we reply within a day</p>
              </div>
              <span className="rounded-full bg-caramel/15 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-widest text-caramel-deep">
                {leadType === "sample" ? "Free · CA & US" : "10% off 1,000+ pcs"}
              </span>
            </div>

            {/* lead-type tabs */}
            <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-2xl border border-ink/15 bg-cream p-1.5">
              {(["sample", "pricing"] as LeadType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLeadType(t)}
                  className={`relative rounded-xl px-2 py-2.5 text-[11px] font-extrabold uppercase tracking-widest transition-colors ${
                    leadType === t ? "text-cream" : "text-coffee hover:text-ink"
                  }`}
                >
                  {leadType === t && (
                    <motion.span
                      layoutId="lead-tab"
                      className="absolute inset-0 rounded-xl bg-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {t === "sample" ? "Free sample kit" : "Pricing & bulk"}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-mocha">
              {leadType === "sample"
                ? "Request a sample to evaluate cup suitability and discuss shipping arrangements."
                : "Tell us your volume and we'll send a tailored quote within one business day."}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="inq-name" className={labelCls}>
                  Your name *
                </label>
                <input
                  id="inq-name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sam Baker"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="inq-biz" className={labelCls}>
                  Business / event name *
                </label>
                <input
                  id="inq-biz"
                  name="business"
                  required
                  placeholder="Daydream Café"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="inq-email" className={labelCls}>
                  Email *
                </label>
                <input
                  id="inq-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="inq-phone" className={labelCls}>
                  Phone
                </label>
                <input
                  id="inq-phone"
                  name="phone"
                  type="tel"
                  placeholder="647-000-0000"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="inq-segment" className={labelCls}>
                I need cups for a *
              </label>
              <select
                id="inq-segment"
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className={`${inputCls} appearance-none`}
              >
                {segments.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
                <option value="Other">Something else</option>
              </select>
            </div>

            {leadType === "sample" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <label htmlFor="inq-address" className={labelCls}>
                  Delivery address *
                </label>
                <input
                  id="inq-address"
                  name="address"
                  required
                  placeholder="Street, city, province/state, postal code"
                  className={inputCls}
                />
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <span className={labelCls}>Estimated quantity</span>
                <div className="flex flex-wrap gap-2">
                  {volumes.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setVolume(v)}
                      className={`rounded-full border-2 px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-colors ${
                        volume === v
                          ? "border-ink bg-ink text-cream"
                          : "border-ink/15 bg-cream text-coffee hover:border-ink/50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="mt-4">
              <label htmlFor="inq-msg" className={labelCls}>
                {leadType === "sample" ? "Anything else?" : "Tell us about it"}
              </label>
              <textarea
                id="inq-msg"
                name="message"
                rows={2}
                placeholder={
                  leadType === "sample"
                    ? "Allergies, preferred flavors, timing…"
                    : "Sizes, flavors, dates, delivery address — anything that helps."
                }
                className={`${inputCls} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={phase === "sending"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 font-display text-sm font-extrabold uppercase tracking-widest text-cream transition-colors hover:bg-caramel disabled:opacity-80"
            >
              {phase === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : leadType === "sample" ? (
                <>
                  <Package className="h-4 w-4" /> Send my free sample kit
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Get my quote
                </>
              )}
            </button>

            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-mocha transition-colors hover:text-ink"
            >
              <MessageCircle className="h-4 w-4 text-[#25d366]" />
              Rather chat? WhatsApp {SITE.phone}
            </a>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function PriceCalculator() {
  const [ml, setMl] = useState(SIZES[2]);
  const [qty, setQty] = useState(1000);

  const unit = priceFor(ml.ml);
  const subtotal = qty * unit;
  const bulk = qty >= BULK_QTY;
  const total = bulk ? subtotal * (1 - BULK_OFF) : subtotal;

  return (
    <div className="rounded-3xl border border-cream/15 bg-cream/5 p-5 md:p-6">
      <span className={darkLabelCls}>01 · Cup size</span>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((s) => {
          const on = s.ml === ml.ml;
          return (
            <button
              key={s.ml}
              onClick={() => setMl(s)}
              className={`relative rounded-full border-2 px-4 py-2.5 font-display text-sm font-extrabold transition-colors ${
                on ? "border-honey text-ink" : "border-cream/20 text-cream/75 hover:border-cream/50"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="calc-size"
                  className="absolute inset-0 rounded-full bg-honey"
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

      <span className={`${darkLabelCls} mt-6`}>02 · Quantity (pcs)</span>
      <div className="flex flex-wrap gap-2">
        {qtyOptions.map((q) => {
          const on = q === qty;
          return (
            <button
              key={q}
              onClick={() => setQty(q)}
              className={`relative rounded-full border-2 px-4 py-2.5 font-display text-sm font-extrabold transition-colors ${
                on ? "border-honey text-ink" : "border-cream/20 text-cream/75 hover:border-cream/50"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="calc-qty"
                  className="absolute inset-0 rounded-full bg-honey"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative">{q.toLocaleString()}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-2 border-t border-cream/10 pt-5 text-sm">
        <div className="flex items-center justify-between text-cream/70">
          <span>
            {qty.toLocaleString()} pcs × {fmt(unit)}
          </span>
          <span className="font-semibold text-cream">{fmt(subtotal)}</span>
        </div>
        {bulk && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between font-semibold text-honey"
          >
            <span>Bulk discount · 10% off {BULK_QTY.toLocaleString()}+ pcs</span>
            <span>−{fmt(subtotal - total)}</span>
          </motion.div>
        )}
        <div className="flex items-center justify-between text-cream/70">
          <span className="flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-honey" /> Delivery — Canada & USA
          </span>
          <span className="font-semibold uppercase tracking-wider text-sage">Free</span>
        </div>
        <div className="flex items-end justify-between pt-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cream/50">
            Order total
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${ml.ml}-${qty}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="font-display text-4xl font-extrabold tracking-tight text-honey"
            >
              {fmt(total)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <a
        href="#inquiry"
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-caramel py-3.5 font-display text-sm font-extrabold uppercase tracking-widest text-cream transition-all hover:bg-honey hover:text-ink active:scale-[0.98]"
      >
        Start an inquiry
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}

export function Wholesale() {
  return (
    <section id="pricing" className="scroll-mt-24 px-3 py-6 md:px-6" data-anchor="pricing">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-cream md:rounded-[3.5rem]">
        <div className="pointer-events-none absolute inset-0 bg-dots-cream opacity-40" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-caramel/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-honey/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1.05fr_1fr]">
          {/* left: pitch + calculator */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-honey">
                <span className="h-1.5 w-1.5 rounded-full bg-honey" />
                For business · B2B
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-6xl">
                Taste it first.
                <br />
                <span className="text-honey">Then take 10%.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/70">
                Request a <span className="font-semibold text-cream">sample request</span>{" "}
                for your café, wedding or hotel — ask about availability and delivery. Love it?
                Order by size from <span className="font-semibold text-cream">$0.65–$0.80/pc</span>{" "}
                and take <span className="font-semibold text-honey">10% off</span> every 1,000+ pc
                run.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-2">
                {segments.map((s) => (
                  <span
                    key={s.label}
                    className="flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cream/80"
                  >
                    <s.icon className="h-3.5 w-3.5 text-honey" strokeWidth={2.4} />
                    {s.label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9">
                <PriceCalculator />
              </div>
            </Reveal>

            {/* follow-up timeline */}
            <Reveal delay={0.28}>
              <div className="mt-8 rounded-3xl border border-cream/15 bg-cream/5 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-honey">
                  After you hit send
                </p>
                <ol className="mt-4 space-y-3.5">
                  {nextSteps.map(([n, t]) => (
                    <li key={n} className="flex items-start gap-4">
                      <span className="font-display text-lg font-extrabold leading-snug text-honey/70">
                        {n}
                      </span>
                      <span className="text-sm leading-relaxed text-cream/75">{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          {/* right: lead form */}
          <Reveal delay={0.15}>
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
