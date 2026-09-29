import type { Metadata } from "next";
import { CapabilitySection } from "@/components/capability-section";
import { ContactInviteSection } from "@/components/contact-invite-section";
import { ImagePageHero } from "@/components/image-page-hero";
import { ProjectShowcase } from "@/components/project-showcase";
import { SafetyAssuranceSection } from "@/components/safety-assurance-section";
import { WhyChooseUs } from "@/components/why-choose-us";

export const metadata: Metadata = {
  title: "Projects | Xtetix Concepts",
  description:
    "Our project portfolio across infrastructure and energy, delivered safely, efficiently and to the highest standards of quality and environmental responsibility.",
};

const projects = [
  {
    id: "project-eroton-title",
    title: "Eroton exploration & production FLB temporary accommodation project (Akaso/Alakiri Field)",
    summary:
      "Provision, installation, and deployment of modular accommodation facilities to support field personnel and operational requirements. The project was executed in compliance with applicable safety, quality, and operational standards.",
    images: [
      { src: "/assets/projects/eroton-1.jpg", alt: "Row of blue-trimmed modular accommodation units along a paved, landscaped walkway" },
      { src: "/assets/projects/eroton-2.jpg", alt: "Crane lifting a modular accommodation unit onto a flatbed trailer as the crew guides it" },
      { src: "/assets/projects/eroton-3.jpg", alt: "Modular units being set down on a barge at the quayside" },
      { src: "/assets/projects/eroton-4.jpg", alt: "Crew in orange coveralls erecting a steel frame on a waterfront yard beside a tugboat" },
      { src: "/assets/projects/eroton-5.jpg", alt: "Xtetix FLB temporary housing project" },
      { src: "/assets/projects/eroton-6.jpg", alt: "Xtetix FLB temporary housing project" }
    ],
  },
  {
    id: "project-omix-title",
    title: "OMIX laboratory project, Lagos",
    summary:
      "Executed construction and infrastructure support works for the development of laboratory facilities, including site preparation, installation support, and related civil works.",
    images: [
      { src: "/assets/projects/omix-1.jpg", alt: "Project omix laboratory by xtetix concept limited" },
      { src: "/assets/projects/omix-2.jpg", alt: "Project omix laboratory by xtetix concept limited" },
      { src: "/assets/projects/omix-3.jpg", alt: "Project omix laboratory by xtetix concept limited" },
      { src: "/assets/projects/omix-4.jpg", alt: "Project omix laboratory by xtetix concept limited" },
      { src: "/assets/projects/omix-5.jpg", alt: "Project omix laboratory by xtetix concept limited" },
    ],
  },
  {
    id: "project-antan-title",
    title: "ANTAN field revamp",
    summary:
      "Successfully executed civil and infrastructure rehabilitation works to support ongoing field operations and improve facility functionality.",
    images: [
      { src: "/assets/projects/antan-1.jpg", alt: "ANTAN rehabilitation work by xteitix concept limited" },
      { src: "/assets/projects/antan-2.jpg", alt: "ANTAN rehabilitation work by xteitix concept limited" },
      { src: "/assets/projects/antan-3.jpg", alt: "ANTAN rehabilitation work by xteitix concept limited" },
      { src: "/assets/projects/antan-4.jpg", alt: "ANTAN rehabilitation work by xteitix concept limited" },
      { src: "/assets/projects/antan-5.jpg", alt: "ANTAN rehabilitation work by xteitix concept limited" },
      { src: "/assets/projects/antan-6.jpg", alt: "ANTAN rehabilitation work by xteitix concept limited" },
    ],
  },
  {
    id: "project-seplat-title",
    title: "Seplat energy / Horatio project infectious diseases hospital development, Orlu",
    summary:
      "Participated in the execution of infrastructure development works supporting the construction of critical healthcare facilities aimed at improving community healthcare capacity.",
    images: [
      { src: "/assets/projects/seplat-1.jpg", alt: "Seplat energy / Horatio project infectious diseases hospital development, Orlu by Xtetix concept limited" },
      { src: "/assets/projects/seplat-2.jpg", alt: "Seplat energy / Horatio project infectious diseases hospital development, Orlu by Xtetix concept limited" },
      { src: "/assets/projects/seplat-3.jpg", alt: "Seplat energy / Horatio project infectious diseases hospital development, Orlu by Xtetix concept limited" },
      { src: "/assets/projects/seplat-4.jpg", alt: "Seplat energy / Horatio project infectious diseases hospital development, Orlu by Xtetix concept limited" },
    ],
  },
  {
    id: "project-green-energy-title",
    title:
      "Green energy international limited / Lekoil field logistics base turnaround maintenance project (Otakikpo field)",
    summary:
      "Provided facility support, maintenance services, logistics coordination, and project execution support for turnaround activities aimed at enhancing operational efficiency and facility reliability.",
    images: [
      { src: "/assets/projects/green-energy-1.jpg", alt: "Green energy international limited / Lekoil field project by Xtetix concept limited" },
      { src: "/assets/projects/green-energy-2.jpg", alt: "Green energy international limited / Lekoil field project by Xtetix concept limited" },
      { src: "/assets/projects/green-energy-3.jpg", alt: "Green energy international limited / Lekoil field project by Xtetix concept limited" },
      { src: "/assets/projects/green-energy-4.jpg", alt: "Green energy international limited / Lekoil field project by Xtetix concept limited" },
      { src: "/assets/projects/green-energy-5.jpg", alt: "Green energy international limited / Lekoil field project by Xtetix concept limited" },
      { src: "/assets/projects/green-energy-6.jpg", alt: "Green energy international limited / Lekoil field project by Xtetix concept limited" },
    ],
  },
  {
    id: "project-cawthorne-title",
    title: "Cawthorne channel project modular accommodation & site support facility development",
    summary:
      "The project included site preparation, modular building installation, interior finishing works, and facility support services, delivered in compliance with applicable quality, safety, and operational standards.",
    images: [
      { src: "/assets/projects/cawthorne-1.jpg", alt: "Cawthorne channel project by Xtetix concept" },
      { src: "/assets/projects/cawthorne-2.jpg", alt: "Cawthorne channel project by Xtetix concept" },
      { src: "/assets/projects/cawthorne-3.jpg", alt: "Cawthorne channel project by Xtetix concept" },
      { src: "/assets/projects/cawthorne-4.jpg", alt: "Cawthorne channel project by Xtetix concept" },
      { src: "/assets/projects/cawthorne-5.jpg", alt: "Cawthorne channel project by Xtetix concept" },
      { src: "/assets/projects/cawthorne-6.jpg", alt: "Cawthorne channel project by Xtetix concept" },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <ImagePageHero
        id="projects-hero-title"
        lines={["Proven impact across", "infrastructure & energy"]}
        summary="Our project portfolio reflects our ability to deliver quality solutions safely, efficiently, and in accordance with project specifications, client expectations, and industry standards. We have consistently supported clients in achieving their business objectives while maintaining the highest standards of safety, quality, and environmental responsibility."
        image={{
          src: "/assets/projects-hero.webp",
          alt: "Aerial view of a materials yard stacked with pallets of precast concrete, with a flatbed crane truck loading",
        }}
      />

      {projects.map((project, index) => (
        <ProjectShowcase key={project.id} {...project} tone={index % 2 === 0 ? "light" : "white"} />
      ))}

      <WhyChooseUs />
      <SafetyAssuranceSection />
      <CapabilitySection />
      <ContactInviteSection />
    </main>
  );
}
