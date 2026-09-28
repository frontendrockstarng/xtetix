import Link from "next/link";
import { RolloverText } from "@/components/rollover-text";
import { ClientMarquee } from "@/components/client-marquee";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { ProjectsSection } from "@/components/projects-section";
import { SafetyAssuranceSection } from "@/components/safety-assurance-section";
import { CapabilitySection } from "@/components/capability-section";
import { ContactInviteSection } from "@/components/contact-invite-section";
import { HeroVideo } from "@/components/hero-video";

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <HeroVideo />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content page-width">
          <h1
            id="hero-title"
            aria-label="Integrated infrastructure & project support solutions"
          >
            <span className="hero__line" aria-hidden="true">
              <span>Integrated infrastructure &amp;</span>
            </span>
            <span className="hero__line" aria-hidden="true">
              <span>project support solutions</span>
            </span>
          </h1>
          <p className="hero__summary">
            <span className="hero__line">
              <span>An indigenous Nigerian company delivering construction, infrastructure, facility</span>
            </span>
            <span className="hero__line">
              <span>management, procurement, marine logistics and pipeline support services across critical industries.</span>
            </span>
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" href="/contact">
              <RolloverText>Get a quote</RolloverText>
            </Link>
            <Link className="button button--outline" href="/services">
              <RolloverText>Explore services</RolloverText>
            </Link>
          </div>
        </div>
        <a className="hero__scroll" href="#next" aria-label="Scroll to next section">
          <span />
        </a>
      </section>
      <div id="next" className="home-next" aria-hidden="true" />
      <ClientMarquee />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectsSection />
      <SafetyAssuranceSection />
      <CapabilitySection />
      <ContactInviteSection />
    </main>
  );
}