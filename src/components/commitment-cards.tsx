"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { CardEdges } from "@/components/card-edges";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

type CommitmentCardsProps = {
  id: string;
  title: string;
  image: { src: string; alt: string };
  /** Four groups of bullet points, one per card. */
  groups: string[][];
};

/** Dark photo band with a staggered grid of bordered bullet-point cards. */
export function CommitmentCards({ id, title, image, groups }: CommitmentCardsProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".commitment-card");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.2 },
    );

    cards.forEach((card) => {
      card.classList.add("is-ready");
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="commitment-cards" aria-labelledby={id}>
      <Image
        className="commitment-cards__background"
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
      />
      <div className="commitment-cards__overlay" aria-hidden="true" />

      <div className="commitment-cards__grid page-width" ref={gridRef}>
        <ScrollRevealHeading
          id={id}
          level="h2"
          className="commitment-cards__title"
          lines={[title]}
        />
        {groups.map((points, index) => (
          <div
            className="commitment-card"
            key={points[0]}
            style={{ "--card-delay": `${index * 90}ms` } as CSSProperties}
          >
            <CardEdges />
            <ul>
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
