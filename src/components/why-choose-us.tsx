"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { CardEdges } from "@/components/card-edges";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

const reasons = [
  {
    title: "Integrated service delivery",
    description:
      "Comprehensive project support solutions delivered through a single, reliable partner.",
  },
  {
    title: "Operational excellence",
    description:
      "Consistent delivery of safe, quality-driven and cost-effective solutions.",
  },
  {
    title: "Strong local content",
    description:
      "Commitment to capacity development, employment generation and indigenous participation.",
  },
  {
    title: "Experienced workforce",
    description:
      "Skilled professionals with extensive industry experience across multiple sectors.",
  },
  {
    title: "Quality assurance",
    description:
      "Processes aligned with recognized industry standards and client requirements.",
  },
  {
    title: "Safety first culture",
    description:
      "A proactive HSE philosophy focused on protecting people, assets and the environment.",
  },
  {
    title: "Client-focused approach",
    description:
      "Customized solutions tailored to specific operational and project requirements.",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          observer.unobserve(target);
          target.classList.add("is-ready");
          requestAnimationFrame(() => target.classList.add("is-visible"));
        });
      },
      { threshold: 0 },
    );

    section.querySelectorAll<HTMLElement>("[data-why-reveal]").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-choose" ref={sectionRef} aria-labelledby="why-title">
      <div className="why-choose__inner page-width">
        <div className="why-choose__heading">
          <ScrollRevealHeading
            id="why-title"
            level="h2"
            lines={["Why choose us"]}
          />
          <p className="why-choose__subheading" data-why-reveal>
            We remain dedicated to building lasting partnerships that create
            sustainable value and support the continued success of our clients’
            operations.
          </p>
        </div>

        <div className="why-choose__grid">
          {reasons.map((reason, index) => (
            <article
              className={`why-card${index === reasons.length - 1 ? " why-card--wide" : ""}`}
              data-why-reveal
              key={reason.title}
              style={{ "--card-delay": `${index * 120}ms` } as CSSProperties}
            >
              <CardEdges />
              <span className="why-card__index" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}