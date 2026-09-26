import { Hero } from "@/components/home/Hero";
import { PricingSection } from "@/components/home/PricingSection";
import { SushiInteractive } from "@/components/home/SushiInteractive";
import { AtmosferaSection } from "@/components/home/AtmosferaSection";
import { MenuCardStack } from "@/components/menu/MenuCardStack";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PricingSection />
      <SushiInteractive />
      <MenuCardStack />
      <AtmosferaSection />
      <div id="dessert-zone">
        <CTASection />
      </div>
    </>
  );
}
