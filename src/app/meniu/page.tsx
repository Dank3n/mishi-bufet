import type { Metadata } from "next";
import { MeniuPageContent } from "@/components/menu/MeniuPageContent";

export const metadata: Metadata = {
  title: "Meniu",
  description:
    "Mishi Bufet — sushi train all you can eat, combo-uri (pui, vită, rață, fructe de mare) și meniu de băuturi.",
};

export default function MeniuPage() {
  return <MeniuPageContent />;
}
