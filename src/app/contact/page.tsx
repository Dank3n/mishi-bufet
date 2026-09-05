import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mishi Bufet — adresă lângă Mega Mall, București, telefon și program.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
