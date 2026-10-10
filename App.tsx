import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Flavors } from "./Flavors";
import { Sustainability } from "./Sustainability";
import { Wholesale } from "./Wholesale";
import { WhoWeServe } from "./WhoWeServe";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Flavors />
        <Sustainability />
        <Wholesale />
        <WhoWeServe />
      </main>
      <nav aria-label="Business resources" className="flex flex-wrap justify-center gap-6 bg-cream px-6 py-8 text-sm font-semibold">
        <a href="/wholesale">Wholesale</a><a href="/cafes">For cafés</a><a href="/events">Events & catering</a><a href="/hospitality">Hotels & hospitality</a><a href="/distributors">Distributors</a>
      </nav>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
