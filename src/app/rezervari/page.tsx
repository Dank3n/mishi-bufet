import type { Metadata } from "next";
import { RezervariPageContent } from "@/components/reservations/RezervariPageContent";

export const metadata: Metadata = {
  title: "Rezervări",
  description:
    "Rezervă masă la Mishi Bufet — sushi train & bufet asiatic lângă Mega Mall.",
};

export default function RezervariPage() {
  return <RezervariPageContent />;
}
