"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { CardEdges } from "@/components/card-edges";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

type ImageListSectionProps = {
  id: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
  items: string[];
};

/**
 * Burgundy band: heading + summary, then a photo beside a bordered bullet list.
 * The photo grows in from the bottom, the card draws its border and the bullets
 * stagger in — each as it scrolls into view.
 */
export function ImageListSection({ id, title, summary, image, items }: ImageListSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-list-reveal]");
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
    <section className="image-list-section" ref={sectionRef} aria-labelledby={id}>
      <div className="page-width">
        <ScrollRevealHeading
          id={id}
          level="h2"
          className="image-list-section__title"
          lines={[title]}
        />
        <p className="image-list-section__summary" data-list-reveal>
          {summary}
        </p>

        <div className="image-list-section__body">
          <div className="image-list-section__visual" data-list-reveal>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="eager"
              sizes="(max-width: 760px) 100vw, 45vw"
            />
          </div>

          <div
            className="image-list-section__card"
            data-list-reveal
            style={{ "--card-delay": "120ms" } as CSSProperties}
          >
            <CardEdges />
            <ul>
              {items.map((item, index) => (
                <li
                  key={item}
                  style={{ "--item-delay": `${180 + index * 50}ms` } as CSSProperties}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
