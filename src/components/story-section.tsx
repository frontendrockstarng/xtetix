"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { ScrollFillText } from "@/components/scroll-fill-text";

type StorySectionProps = {
  label: string;
  statement: string;
  image: { src: string; alt: string };
  closing: string;
  /** Optional content between the statement and the image (e.g. metrics). */
  children?: ReactNode;
};

/**
 * Scroll-fill statement, then an image that grows in from the bottom and a
 * closing paragraph that fades up — each revealed as it enters the viewport.
 */
export function StorySection({ label, statement, image, closing, children }: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = section.querySelectorAll<HTMLElement>("[data-story-reveal]");

    // Don't start the grow-in until the photo is decoded, otherwise the
    // animation runs on an empty frame and the image pops in afterwards.
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
      { threshold: 0.05 },
    );

    items.forEach((item) => {
      item.classList.add("is-ready");
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="story-section" ref={sectionRef} aria-label={label}>
      <div className="story-section__inner page-width">
        <ScrollFillText text={statement} />
        {children}
        <div className="story-section__visual" data-story-reveal>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="eager"
            sizes="(max-width: 760px) 100vw, 1440px"
          />
        </div>
        <p className="story-section__closing" data-story-reveal>
          {closing}
        </p>
      </div>
    </section>
  );
}
