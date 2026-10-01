import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Flavors } from "./components/Flavors";
import { Sustainability } from "./components/Sustainability";
import { Wholesale } from "./components/Wholesale";
import { WhoWeServe } from "./components/WhoWeServe";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";

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
