import type { Metadata } from "next";
import { CommitmentCards } from "@/components/commitment-cards";
import { ContactInviteSection } from "@/components/contact-invite-section";
import { ProjectsSection } from "@/components/projects-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { CurvedCarousel } from "@/components/curved-carousel";
import { PageHeroIntro } from "@/components/page-hero-intro";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Services | Xtetix Concepts",
  description:
    "Integrated services supporting complex projects across construction, infrastructure, energy, marine and industrial environments.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero page-hero--carousel" aria-labelledby="services-hero-title">
        <PageHeroIntro
          id="services-hero-title"
          lines={["Capabilities built around", "your operational needs"]}
          summary="Our integrated services are designed to support complex projects across construction, infrastructure, energy, marine, and industrial environments, combining technical expertise, operational efficiency, and a strong commitment to safety and quality."
        />
        <CurvedCarousel
          label="Our services in the field"
          images={[
            { src: "/assets/services-facility.webp", alt: "Technician in PPE operating valves in a fire-pump plant room" },
            { src: "/assets/services-civil.webp", alt: "Civil works crew excavating a trench beside road barriers" },
            { src: "/assets/services-warehouse.webp", alt: "Procurement warehouse aisle stacked with palletised goods" },
            { src: "/assets/services-marine.webp", alt: "Cargo vessel under way at sunset for marine logistics" },
            { src: "/assets/services-pipeline.webp", alt: "Parallel pipelines running across a hillside" },
          ]}
        />
      </section>

      <ServiceDetail
        id="service-civil-title"
        title="Civil construction & infrastructure development"
        summary="Whether supporting upstream field developments, operational facility expansions, or infrastructure rehabilitation projects, we provide practical construction solutions designed to improve project delivery, optimize costs, and ensure long-term operational reliability."
        image={{
          src: "/assets/service-civil-detail.webp",
          alt: "Construction crew tying rebar on a formwork deck supported by steel props",
        }}
        offerings={[
          "Site preparation and land development",
          "Earthworks and excavation",
          "Subgrade stabilization",
          "Brownfield revamp projects",
          "Greenfield development support",
          "Civil infrastructure works",
          "Foundation construction",
          "Modular buildings and portacabins",
          "Temporary camp facilities",
          "Project support infrastructure",
        ]}
      />

      <CommitmentCards
        id="service-marine-title"
        title="Marine logistics & offshore support"
        layout="split"
        summary="We provide specialized marine logistics and offshore support solutions that facilitate safe and efficient offshore operations. Our services support exploration, production, construction, maintenance, and marine transportation activities across offshore and coastal environments."
        image={{
          src: "/assets/services-marine-port.webp",
          alt: "Container ship being loaded by gantry cranes at a port",
        }}
        groups={[
          [
            "Offshore logistics support",
            "Vessel charter services",
            "Ship-to-Ship operations",
            "Crew boat services",
          ],
          ["Marine procurement", "Offshore project logistics", "Cargo handling coordination"],
          ["Tugboat services", "Security escort boats", "Equipment transportation"],
        ]}
      />

      <ServiceDetail
        id="service-facility-title"
        tone="white"
        title="Facility management"
        summary="By adopting industry best practices and proactive maintenance strategies, we help clients enhance asset performance, reduce operational downtime, extend facility lifespan, and maintain compliance with environmental and safety requirements."
        image={{
          src: "/assets/service-facility-detail.webp",
          alt: "Rope-access technicians in harnesses cleaning the glass facade of a high-rise",
        }}
        offerings={[
          "Facility operations support",
          "Industrial cleaning services",
          "Tank farm cleaning",
          "Warehouse cleaning services",
          "Aircraft cleaning services",
          "Marine vessel cleaning",
          "Janitorial services",
          "Floor restoration and treatment",
          "Facility repairs and maintenance",
          "Fumigation and pest control",
        ]}
      />

      <CommitmentCards
        id="service-pipeline-title"
        title="Pipeline & flowline services"
        layout="split"
        summary="We support operators through the planning, preparation, installation, maintenance, repair, and integrity management of pipeline systems and associated infrastructure. Our approach combines engineering expertise, strict quality control procedures, and strong HSE compliance to ensure safe and efficient transportation systems that maximize production reliability and asset performance."
        image={{
          src: "/assets/services-pipeline-welding.webp",
          alt: "Welder in a protective mask joining a steel pipeline section on an excavation site",
        }}
        groups={[
          [
            "Pipeline installation",
            "Flowline construction",
            "Fabrication services",
            "Welding and tie-in works",
          ],
          ["Trenching and excavation", "Backfilling services", "Structural support installation"],
          ["Inspection and maintenance", "Pipeline rehabilitation", "Pre-commissioning support"],
        ]}
      />

      <ServiceDetail
        id="service-procurement-title"
        title="Procurement & supply chain solutions"
        summary="Our procurement services are focused on cost optimization, supply chain efficiency, vendor reliability, quality assurance, and delivery performance, enabling clients to concentrate on their core business activities while minimizing procurement risks. Through our network of global manufacturers, OEMs, suppliers, stockists, and logistics partners, we offer reliable sourcing solutions that support construction, maintenance, drilling, marine, and production operations."
        image={{
          src: "/assets/service-procurement-detail.webp",
          alt: "Logistics worker wheeling boxed supplies on a hand truck from a delivery van",
        }}
        offerings={[
          "Pipes, valves and fittings (PVF)",
          "Heat exchanger tubes",
          "Mechanical equipment",
          "Electrical equipment",
          "Instrumentation systems",
          "Transformers",
          "Welding equipment and consumables",
          "PPE and safety equipment",
          "Industrial spare parts",
          "Marine equipment",
          "General industrial materials",
        ]}
      />

      <WhyChooseUs />
      <ProjectsSection />
      <ContactInviteSection />
    </main>
  );
}
