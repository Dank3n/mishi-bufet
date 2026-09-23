import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mishi Bufet — adresă în Mega Mall, București. Rezervări doar telefonic pentru 30+ persoane.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
