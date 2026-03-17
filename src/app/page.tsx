import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketStrip from "@/components/MarketStrip";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-z3-bg)' }}>
      <Navbar />
      <HeroSection />
      <MarketStrip />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
