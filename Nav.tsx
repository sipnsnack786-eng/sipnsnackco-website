import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Menu, X } from "lucide-react";
import { SITE } from "../data/site";

const links = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how" },
  { label: "Flavors & Sizes", href: "#flavors" },
  { label: "Pricing", href: "#pricing" },
  { label: "Who We Serve", href: "#segments" },
];

export function Nav() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-5"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-ink/10 bg-parchment/85 py-2 pl-4 pr-2 shadow-lg shadow-ink/5 backdrop-blur-xl">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-caramel text-cream transition-transform duration-300 group-hover:rotate-[20deg]">
              <Cookie className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-extrabold leading-none tracking-tight">
              Sip&nbsp;N&nbsp;Snack
              <span className="ml-1 align-super text-[0.55em] font-bold text-caramel-deep">CO.</span>
            </span>
            <span className="hidden rounded-full border border-ink/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-mocha lg:inline-block">
              B2B supply
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#inquiry"
              className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-caramel md:inline-flex"
            >
              Request a quote
            </a>
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-cream p-6"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-display text-lg font-extrabold">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-caramel text-cream">
                  <Cookie className="h-5 w-5" />
                </span>
                Sip N Snack Co.
              </span>
              <button
                onClick={() => setMenu(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-14 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                  className="border-b border-ink/10 py-5 font-display text-4xl font-extrabold uppercase tracking-tight"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#inquiry"
              onClick={() => setMenu(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-caramel px-7 py-4 font-display text-sm font-extrabold uppercase tracking-widest text-cream"
            >
              Request a quote
            </motion.a>
            <p className="mt-auto pt-8 font-hand text-2xl text-caramel-deep">
              {SITE.phone} · {SITE.email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
