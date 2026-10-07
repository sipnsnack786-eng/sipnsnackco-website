export type SizeOption = { ml: number; price: number };

export const SIZES: SizeOption[] = [
  { ml: 100, price: 0.65 },
  { ml: 150, price: 0.7 },
  { ml: 200, price: 0.75 },
  { ml: 250, price: 0.8 },
];

export const priceFor = (ml: number) => SIZES.find((s) => s.ml === ml)?.price ?? 0.75;

export type Product = {
  id: string;
  name: string;
  tagline: string;
  notes: string[];
  image: string;
  bg: string;
  badge?: string;
};

export const SLEEVE_SIZE = 12;

export const products: Product[] = [
  {
    id: "vanilla",
    name: "Classic Vanilla",
    tagline: "Golden, buttery wafer kissed with Madagascar vanilla bean. The original cup-cookie.",
    notes: ["Buttery wafer", "Vanilla bean", "Crowd favorite"],
    image: "/images/cup-vanilla.jpg",
    bg: "#fbeec9",
    badge: "Bestseller",
  },
  {
    id: "cardamom",
    name: "Spiced Cardamom",
    tagline: "Fresh-ground green cardamom folded into a warm oat wafer. Toronto's coziest cup.",
    notes: ["Fresh-ground pods", "Warm spice", "Chai's best friend"],
    image: "/images/cup-cardamom.jpg",
    bg: "#e4ebd4",
    badge: "New",
  },
  {
    id: "chocolate",
    name: "Double Chocolate",
    tagline: "A brownie disguised as drinkware. Dark cocoa shell with a molten chocolate lining.",
    notes: ["Dark cocoa", "Molten lining", "Espresso soulmate"],
    image: "/images/cup-choco.jpg",
    bg: "#f6dcc8",
    badge: "Staff pick",
  },
];

export type Step = {
  n: string;
  title: string;
  body: string;
  scribble: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Fill it up",
    body: "Espresso, flat white, hot cocoa, a slow Sunday chai. Pour your beverage, enjoy your drink, then eat the cup.",
    scribble: "no soggy bottoms!",
  },
  {
    n: "02",
    title: "Sip it slow",
    body: "The wafer gently picks up the flavor of your drink, like a cookie that's been dunking itself for you the whole time. Rude not to, honestly.",
    scribble: "self-dunking tech™",
  },
  {
    n: "03",
    title: "Eat the cup",
    body: "Last sip, first bite. The evidence disappears, the dishes stay clean, and a landfill somewhere gets a day off.",
    scribble: "zero dishes. zero waste.",
  },
];

export const BULK_QTY = 1000;
export const BULK_OFF = 0.1;

export const qtyOptions = [240, 500, 1000, 2500, 5000];

export const marqueeWords = [
  "Bite",
  "Sip",
  "Smile",
  "Edible cups from $0.65/pc",
  "Edible cups for beverage service",
  "Business and wholesale inquiries",
  "Free Canada & USA delivery",
  "Request product information",
];

export const SITE = {
  address1: "747 Don Mills Road",
  address2: "Toronto, ON M3C 1T2",
  phone: "647-703-1359",
  email: "sipnsnack786@gmail.com",
  whatsapp: "https://wa.me/16477031359",
  hours: "Mon–Sat · 9 AM–6 PM",
};

export const fmt = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
