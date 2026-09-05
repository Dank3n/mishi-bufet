import type { Metadata } from "next";
import { DesprePageContent } from "@/components/about/DesprePageContent";

export const metadata: Metadata = {
  title: "Atmosferă",
  description:
    "Mishi Vibe — sushi train, combo-uri și atmosfera neo-noir de lângă Mega Mall.",
};

export default function DesprePage() {
  return <DesprePageContent />;
}
