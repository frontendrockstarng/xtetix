import type { Metadata } from "next";
import { CommitmentCards } from "@/components/commitment-cards";
import { ContactInviteSection } from "@/components/contact-invite-section";
import { ImagePageHero } from "@/components/image-page-hero";
import { ObjectivesSection } from "@/components/objectives-section";
import { ServicesSection } from "@/components/services-section";
import { StatementCta } from "@/components/statement-cta";
import { StorySection } from "@/components/story-section";

export const metadata: Metadata = {
  title: "Local content | Xtetix Concepts",
  description:
    "As a wholly indigenous Nigerian company, Xtetix Concepts promotes local content through local resources, capacity building, technology transfer and workforce development.",
};

export default function LocalContentPage() {
  return (
    <main>
      <ImagePageHero
        id="local-content-hero-title"
        lines={["Building Nigerian", "Capability"]}
        summary="As a wholly indigenous Nigerian company, XTETIX CONCEPTS LIMITED remains fully committed to promoting local content development through the utilization of local resources, capacity building, technology transfer, workforce development, and active participation in Nigeria's energy, infrastructure, and industrial sectors."
        image={{
          src: "/assets/local-content-hero.webp",
          alt: "Nigerian port at night with container cranes and cargo vessels along the quay",
        }}
      />

      <StorySection
        label="Sustainable local value"
        statement="The company places significant emphasis on creating sustainable value through indigenous expertise while supporting national economic growth and industrial advancement."
        image={{
          src: "/assets/local-content-scaffold.webp",
          alt: "Nigerian construction crew in hard hats working on scaffolding against a blue sky",
        }}
        closing="At Xtetix Concepts Limited, we believe that sustainable business success goes beyond project execution. It involves empowering local talent, strengthening indigenous capabilities, developing local supply chains, and creating opportunities that contribute to long-term socioeconomic development."
      />

      <StatementCta
        label="Investing in Nigerian professionals"
        statement="Through strategic partnerships and continuous investment in human capital, we actively support the development of competent Nigerian professionals capable of delivering world-class services across our areas of operation."
      />

      <ObjectivesSection
        id="local-content-commitment-title"
        title="Our commitment"
        titleSize="heading"
        rows={5}
        items={[
          "Development of indigenous workforce capacity",
          "Sustainable employment creation",
          "Support for Nigerian suppliers and contractors",
          "Operational excellence through local expertise",
          "Long-term economic value creation",
          "Participation, skills acquisition and knowledge transfer",
          "Promotion of local enterprise",
        ]}
      />

      <CommitmentCards
        id="local-content-objectives-title"
        title="Our local content objectives"
        image={{
          src: "/assets/local-content-deck.webp",
          alt: "Crew member in a hard hat and coveralls carrying out maintenance on a vessel deck at sea",
        }}
        groups={[
          [
            "Promotion of indigenous technical and managerial capacity.",
            "Local supplier and vendor development initiatives.",
          ],
          [
            "Employment and development of qualified Nigerian professionals.",
            "Promotion of indigenous technical and managerial capacity.",
          ],
          ["Technology and knowledge transfer through strategic partnerships."],
          [
            "Increased utilization of locally available goods and services.",
            "Support for community development and economic empowerment.",
          ],
        ]}
      />

      <ServicesSection />
      <ContactInviteSection />
    </main>
  );
}
