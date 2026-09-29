"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

type ServiceDetailProps = {
  id: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
  offerings: string[];
  tone?: "light" | "white";
};

/** One service: heading, summary, wide photo and an inline list of offerings. */
export function ServiceDetail({ id, title, summary, image, offerings, tone = "light" }: ServiceDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-service-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    // Wait for the photo to decode so the grow-in never runs on an empty frame.
    const reveal = (target: Element) => {
      const img = target.querySelector("img");
      const show = () => target.classList.add("is-visible");
      if (!img || img.complete) return show();
      img.decode().then(show, show);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          reveal(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((target) => {
      target.classList.add("is-ready");
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`service-detail service-detail--${tone}`}
      ref={sectionRef}
      aria-labelledby={id}
    >
      <div className="page-width">
        <ScrollRevealHeading id={id} level="h2" className="service-detail__title" lines={[title]} />
        <p className="service-detail__summary" data-service-reveal>
          {summary}
        </p>

        <div className="service-detail__visual" data-service-reveal>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="eager"
            sizes="(max-width: 760px) 100vw, 1440px"
          />
        </div>

        <div className="service-detail__offerings" data-service-reveal>
          <h3>Service offerings</h3>
          <ul>
            {offerings.map((offering, index) => (
              <li key={offering} style={{ "--item-delay": `${index * 40}ms` } as CSSProperties}>
                {offering}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
