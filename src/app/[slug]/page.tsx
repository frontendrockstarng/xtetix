import { notFound } from "next/navigation";
import { PlaceholderPage } from "@/components/placeholder-page";

const pages: Record<string, { title: string; intro: string }> = {
  services: {
    title: "Services",
    intro: "Integrated services for complex projects and operational environments.",
  },
  projects: {
    title: "Projects",
    intro: "Proven experience. Practical delivery.",
  },
  gallery: {
    title: "Gallery",
    intro: "A closer look at our people, projects and work in the field.",
  },
  contact: {
    title: "Tell us about your project.",
    intro: "Share your operational requirement or service need with our team.",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) notFound();

  return <PlaceholderPage title={page.title} intro={page.intro} />;
}