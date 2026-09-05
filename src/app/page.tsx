import { Hero } from "@/components/home/Hero";
import { PricingSection } from "@/components/home/PricingSection";
import { MishiVibe } from "@/components/home/MishiVibe";
import { MenuCardStack } from "@/components/menu/MenuCardStack";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PricingSection />
      <MenuCardStack />
      <MishiVibe />
      <div id="dessert-zone">
        <CTASection />
      </div>
    </>
  );
}
