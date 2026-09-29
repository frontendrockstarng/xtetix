"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { CardEdges } from "@/components/card-edges";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

type CommitmentCardsProps = {
  id: string;
  title: string;
  image: { src: string; alt: string };
  /** Groups of bullet points, one per card (4 for "staggered", 3 for "split"). */
  groups: string[][];
  /** Intro paragraph; shown bottom-left in the "split" layout. */
  summary?: string;
  /**
   * "staggered": title + card top, three cards along the bottom.
   * "split": title + two cards across the top, summary + one card at the bottom.
   */
  layout?: "staggered" | "split";
};

/** Dark photo band with a grid of bordered bullet-point cards. */
export function CommitmentCards({
  id,
  title,
  image,
  groups,
  summary,
  layout = "staggered",
}: CommitmentCardsProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".commitment-card, .commitment-cards__summary");
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

      <div
        className={`commitment-cards__grid commitment-cards__grid--${layout} page-width`}
        ref={gridRef}
      >
        <ScrollRevealHeading
          id={id}
          level="h2"
          className="commitment-cards__title"
          lines={[title]}
        />
        {summary ? <p className="commitment-cards__summary">{summary}</p> : null}
        {groups.map((points, index) => (
          <div
            className="commitment-card"
            key={points[0]}
            style={{ "--card-delay": `${index * 50}ms` } as CSSProperties}
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
