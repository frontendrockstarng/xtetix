"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RolloverText } from "@/components/rollover-text";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

const services = [
  {
    title: "Civil construction & infrastructure",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    alt: "Modern city buildings representing civil construction and infrastructure",
    description:
      "Our expertise covers site preparation, earthworks, infrastructure development, temporary accommodation solutions, foundation works and facility construction support services. Leveraging experienced personnel, modern equipment and industry best practices, we execute projects safely, efficiently and in accordance with client specifications and regulatory requirements.",
  },
  {
    title: "Facility Management",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=85",
    alt: "A facilities professional maintaining a commercial space",
    description:
      "Our services encompass preventive maintenance, industrial cleaning, janitorial services, fumigation, specialized equipment maintenance and infrastructure upkeep for commercial, industrial, marine and oil and gas facilities.",
  },
  {
    title: "Procurement & supply chain solutions",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85",
    alt: "Organized goods in a distribution warehouse",
    description:
      "Through our network of global manufacturers, OEMs, suppliers, stockists and logistics partners, we offer reliable sourcing solutions that support construction, maintenance, drilling, marine and production operations. Our procurement services focus on cost optimization, supply chain efficiency, vendor reliability and quality assurance.",
  },
  {
    title: "Marine logistics & offshore support",
    image:
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1600&q=85",
    alt: "Container vessel transporting cargo across the water",
    description:
      "Our services support exploration, production, construction, maintenance and marine transportation activities across offshore and coastal environments. Working with marine partners, vessel operators and logistics providers, we deliver dependable support that helps optimize operations, maintain project schedules and improve supply chain performance.",
  },
  {
    title: "Pipeline & flowline services",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1600&q=85",
    alt: "Industrial pipeline infrastructure at an energy facility",
    description:
      "We support operators through the planning, preparation, installation, maintenance, repair and integrity management of pipeline systems and associated infrastructure. Our approach combines engineering expertise, strict quality control and strong HSE compliance to help ensure safe, reliable and efficient operations.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sidebar = section.querySelector<HTMLElement>(".services-section__sticky");
    const blocks = Array.from(
      section.querySelectorAll<HTMLElement>("[data-service-block]"),
    );
    const sidebarObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !sidebar) return;
        sidebar.classList.add("is-visible");
        sidebarObserver.unobserve(sidebar);
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    if (sidebar) {
      sidebar.classList.add("is-ready");
      sidebarObserver.observe(sidebar);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - window.innerHeight * 0.48) -
              Math.abs(second.boundingClientRect.top - window.innerHeight * 0.48),
          )[0];

        if (!visible) return;
        const activeBlock = visible.target as HTMLElement;
        setActiveService(Number(activeBlock.dataset.serviceBlock));
      },
      { rootMargin: "-38% 0px -48% 0px", threshold: 0 },
    );

    blocks.forEach((block) => {
      block.classList.add("is-ready");
      observer.observe(block);
    });

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const imageFrame = entry.target as HTMLElement;
          imageObserver.unobserve(imageFrame);
          imageFrame.classList.add("is-ready");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => imageFrame.classList.add("is-visible"));
          });
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    section.querySelectorAll<HTMLElement>(".service-item__image").forEach((image) => {
      imageObserver.observe(image);
    });

    return () => {
      sidebarObserver.disconnect();
      observer.disconnect();
      imageObserver.disconnect();
    };
  }, []);

  const scrollToService = (index: number) => {
    sectionRef.current
      ?.querySelector(`[data-service-block="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      className="services-section"
      aria-labelledby="services-title"
      ref={sectionRef}
    >
      <div className="services-section__layout page-width">
        <aside className="services-section__sidebar">
          <div className="services-section__sticky">
            <ScrollRevealHeading
              id="services-title"
              level="h2"
              lines={["Services"]}
            />
            <p className="services-section__intro">
              Integrated services for complex projects and operational
              environments.
            </p>
            <ul className="services-index">
              {services.map((service, index) => (
                <li key={service.title}>
                  <button
                    className={`services-index__button${activeService === index ? " is-active" : ""}`}
                    type="button"
                    aria-current={activeService === index ? "step" : undefined}
                    onClick={() => scrollToService(index)}
                  >
                    <span className="services-index__title">{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="services-section__content">
          {services.map((service, index) => (
            <article
              className="service-item"
              data-service-block={index}
              key={service.title}
            >
              <ScrollRevealHeading
                level="h3"
                className="service-item__mobile-title"
                lines={[service.title]}
              />
              <div className="service-item__image">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 760px) 100vw, (max-width: 1279px) 58vw, 760px"
                />
              </div>
              <p className="service-item__description">{service.description}</p>
              <Link className="button button--outline service-item__link" href="/services">
                <RolloverText>Learn more</RolloverText>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}