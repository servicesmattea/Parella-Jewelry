import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReadyMadeBracelets from "@/components/ReadyMadeBracelets";
import Configurator from "@/components/configurator/Configurator";
import StoneGuide from "@/components/StoneGuide";
import Craftsmanship from "@/components/Craftsmanship";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ReadyMadeBracelets />
        <Configurator />
        <StoneGuide />
        <Craftsmanship />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
