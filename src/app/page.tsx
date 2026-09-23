import { Hero } from "@/components/home/Hero";
import { PricingSection } from "@/components/home/PricingSection";
import { AtmosferaSection } from "@/components/home/AtmosferaSection";
import { MenuCardStack } from "@/components/menu/MenuCardStack";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PricingSection />
      <MenuCardStack />
      <AtmosferaSection />
      <div id="dessert-zone">
        <CTASection />
      </div>
    </>
  );
}
