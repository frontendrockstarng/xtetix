import type { Metadata } from "next";
import { AboutCommitment } from "@/components/about-commitment";
import { AboutHero } from "@/components/about-hero";
import { AboutStory } from "@/components/about-story";
import { CapabilitySection } from "@/components/capability-section";
import { ContactInviteSection } from "@/components/contact-invite-section";
import { ProjectsSection } from "@/components/projects-section";
import { WhyChooseUs } from "@/components/why-choose-us";

export const metadata: Metadata = {
  title: "About us | Xtetix Concepts",
  description:
    "Established in 2012, Xtetix Concepts delivers safe, reliable and cost-effective infrastructure and project support solutions across Nigeria.",
};

export default function AboutUsPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutCommitment />
      <WhyChooseUs />
      <ProjectsSection />
      <CapabilitySection />
      <ContactInviteSection />
    </main>
  );
}
