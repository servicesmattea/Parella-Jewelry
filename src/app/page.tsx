import Hero from "@/components/Hero";
import ReadyMadeBracelets from "@/components/ReadyMadeBracelets";
import Configurator from "@/components/configurator/Configurator";
import StoneGuide from "@/components/StoneGuide";
import Craftsmanship from "@/components/Craftsmanship";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ReadyMadeBracelets />
      <Configurator />
      <StoneGuide />
      <Craftsmanship />
      <Testimonials />
      <Newsletter />
    </>
  );
}
