import type { Metadata } from "next";
import { CommitmentCards } from "@/components/commitment-cards";
import { ContactInviteSection } from "@/components/contact-invite-section";
import { ImageListSection } from "@/components/image-list-section";
import { ImagePageHero } from "@/components/image-page-hero";
import { ObjectivesSection } from "@/components/objectives-section";
import { StatementCta } from "@/components/statement-cta";
import { StorySection } from "@/components/story-section";

export const metadata: Metadata = {
  title: "HSEQ policy | Xtetix Concepts",
  description:
    "Our commitment to the highest standards of health, safety, environment and quality across civil construction, facility management, procurement, marine logistics and pipeline support.",
};

export default function HseqPolicyPage() {
  return (
    <main>
      <ImagePageHero
        id="hseq-hero-title"
        lines={["Safety. Quality.", "Accountability."]}
        summary="We are committed to achieving the highest standards of safety, environmental stewardship, quality service delivery, and operational excellence across all our activities in civil construction, facility management, procurement, marine logistics, pipeline and flowline support services."
        image={{
          src: "/assets/hseq-hero.webp",
          alt: "Xtetix site safety officer in full PPE holding a stop sign on a facility project",
        }}
      />

      <StorySection
        label="Our HSEQ commitment"
        statement="Our commitment is founded on the belief that all incidents are preventable and that every employee, contractor, and stakeholder has a responsibility to maintain a safe and healthy working environment."
        image={{
          src: "/assets/hseq-commitment.webp",
          alt: "Xtetix crew in hard hats and high-visibility vests working on steel beams on site",
        }}
        closing="We integrate HSEQ principles into every stage of project execution through proactive risk assessment, hazard identification, workforce competency development, regulatory compliance, and continuous performance improvement. We strive to protect our people, safeguard client assets, preserve the environment, and ensure the sustainable delivery of services while meeting or exceeding client expectations and industry standards."
      />

      <StatementCta
        label="Our HSEQ goal"
        statement="Through leadership commitment, operational discipline, and continuous improvement, we remain dedicated to achieving incident-free operations while delivering safe, reliable, and quality-driven solutions to our clients."
        cta={{ label: "Contact us", href: "#contact" }}
      />

      <ObjectivesSection
        id="hseq-objectives-title"
        title="HSEQ Objectives"
        items={[
          "Zero environmental incidents",
          "Full compliance with applicable regulatory requirements",
          "Zero property and asset damage",
          "Enhanced workforce competency and safety awareness",
          "Continuous improvement in HSEQ performance",
          "Zero fatalities",
          "Zero lost time injuries (LTI)",
        ]}
      />

      <CommitmentCards
        id="hseq-commitment-title"
        title="Our commitment"
        image={{
          src: "/assets/hseq-safety-gate.webp",
          alt: "Site crew in high-visibility PPE at a gated works entrance with a stop sign",
        }}
        groups={[
          [
            "Providing continuous HSEQ training and competency development",
            "Protecting the environment through responsible operational practices",
          ],
          [
            "Promoting a strong safety culture across all operations",
            "Identifying, assessing, and controlling workplace hazards and risks",
          ],
          [
            "Preventing pollution and minimizing environmental impact",
            "Ensuring strict adherence to approved procedures and industry standards",
          ],
          [
            "Conducting regular audits, inspections, and performance reviews",
            "Encouraging employee participation in HSEQ initiatives",
            "Maintaining effective emergency preparedness and response systems",
            "Delivering quality services that consistently meet client requirements",
          ],
        ]}
      />

      <ImageListSection
        id="hseq-quality-title"
        title="Quality is embedded in every operation"
        summary="Our Quality Management approach is founded on operational excellence, continuous improvement, risk-based thinking, and strict adherence to established procedures. Through effective planning, inspection, verification, performance monitoring, and quality control processes, we ensure that every project is executed safely, efficiently, and to the highest standards of workmanship and professionalism."
        image={{
          src: "/assets/hseq-quality.webp",
          alt: "Xtetix worker in a hard hat and dust mask rigging a bulk bag at an industrial facility",
        }}
        items={[
          "Delivering services that meet or exceed client expectations.",
          "Maintaining compliance with statutory, regulatory, and industry requirements.",
          "Promoting a culture of continuous improvement across all operations.",
          "Ensuring competency through training and development of personnel.",
          "Utilizing effective quality control and verification procedures.",
          "Building long-term relationships based on trust, reliability, and service excellence.",
          "Driving operational efficiency through standardized work processes.",
        ]}
      />

      <ContactInviteSection />
    </main>
  );
}
