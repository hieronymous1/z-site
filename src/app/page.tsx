import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketStrip from "@/components/MarketStrip";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative" style={{ background: 'var(--color-z3-bg)' }}>
      {/* Ambient warm glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,162,88,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,162,88,0.04) 0%, transparent 70%)', filter: 'blur(120px)' }} />
        <div className="absolute bottom-0 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,118,80,0.06) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <Navbar />
      <HeroSection />
      <MarketStrip />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
