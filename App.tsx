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
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
