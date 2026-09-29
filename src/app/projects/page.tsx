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

const projectImages = (slug: string, alts: string[]) =>
  alts.map((alt, index) => ({ src: `/assets/projects/${slug}-${index + 1}.webp`, alt }));

const projects = [
  {
    id: "project-eroton-title",
    title: "Eroton exploration & production FLB temporary accommodation project (Akaso/Alakiri Field)",
    summary:
      "Provision, installation, and deployment of modular accommodation facilities to support field personnel and operational requirements. The project was executed in compliance with applicable safety, quality, and operational standards.",
    images: projectImages("eroton", [
      "Rows of modular accommodation units facing each other across a cleared site",
      "Open container unit standing on a grassy site",
      "Worker looking out from the doorway of an orange modular unit",
    ]),
  },
  {
    id: "project-omix-title",
    title: "OMIX laboratory project, Lagos",
    summary:
      "Executed construction and infrastructure support works for the development of laboratory facilities, including site preparation, installation support, and related civil works.",
    images: projectImages("omix", [
      "Single-storey white laboratory building with blue shutters",
      "Paved walkway between two facility buildings",
      "Worker climbing the stairs of a dark modular building",
      "Worker beside a yellow backhoe loader on site",
      "Modern two-storey building behind a lawn",
    ]),
  },
  {
    id: "project-antan-title",
    title: "ANTAN field revamp",
    summary:
      "Successfully executed civil and infrastructure rehabilitation works to support ongoing field operations and improve facility functionality.",
    images: projectImages("antan", [
      "Workers in hard hats on an elevated concrete deck lined with scaffolding",
      "Workers on scaffolding along a concrete deck",
      "Crew in high-visibility vests on an excavated road site",
      "Worker on top of a concrete pier with exposed rebar",
      "Workers in hard hats assembling a rebar cage",
      "Crew in hard hats and vests at work on site",
    ]),
  },
  {
    id: "project-seplat-title",
    title: "Seplat energy / Horatio project infectious diseases hospital development, Orlu",
    summary:
      "Participated in the execution of infrastructure development works supporting the construction of critical healthcare facilities aimed at improving community healthcare capacity.",
    images: projectImages("seplat", [
      "Timber formwork and rebar across foundation trenches with workers on site",
      "Concrete mixer among timber props on a building site",
      "Worker at a cement mixer beside a building under construction",
      "Crew in hard hats and high-visibility vests lined up on site",
      "Tower crane above a building under construction",
      "Workers silhouetted on building scaffolding",
      "Workers in PPE beside barriers on a road works site",
    ]),
  },
  {
    id: "project-green-energy-title",
    title:
      "Green energy international limited / Lekoil field logistics base turnaround maintenance project (Otakikpo field)",
    summary:
      "Provided facility support, maintenance services, logistics coordination, and project execution support for turnaround activities aimed at enhancing operational efficiency and facility reliability.",
    images: projectImages("green-energy", [
      "Gloved worker installing a rooftop solar panel",
      "Worker in PPE fitting an overhead fixture",
      "Technician working on an electrical control panel",
      "Workers in hard hats and vests inspecting rebar on site",
      "Worker in a hard hat handling equipment indoors",
      "Workers cutting steel on a busy site",
    ]),
  },
  {
    id: "project-cawthorne-title",
    title: "Cawthorne channel project modular accommodation & site support facility development",
    summary:
      "The project included site preparation, modular building installation, interior finishing works, and facility support services, delivered in compliance with applicable quality, safety, and operational standards.",
    images: projectImages("cawthorne", [
      "Room mid-finish with tiled wall panels, a work table and a ladder",
      "Worker on a rope painting an orange facade",
      "Worker in a hard hat and gloves at a timber-framed wall",
      "Worker in a hard hat measuring a wall with a tape",
      "Worker in PPE fitting an overhead fixture",
      "Workers beside a building wrapped in timber scaffolding",
      "Finished room with timber flooring and a yellow feature wall",
    ]),
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
