import Hero from "@/components/Hero";
import ReadyMadeBracelets from "@/components/ReadyMadeBracelets";
import EnergySection from "@/components/EnergySection";
import StonesPreview from "@/components/StonesPreview";
import Craftsmanship from "@/components/Craftsmanship";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ReadyMadeBracelets />
      <EnergySection />
      <StonesPreview />
      <Craftsmanship />
      <Testimonials />
      <Newsletter />
    </>
  );
}
