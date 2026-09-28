"use client";

import { useEffect, useRef, useState } from "react";
import { VerticalSlider } from "@/components/vertical-slider";

type ObjectivesSectionProps = {
  id: string;
  title: string;
  items: string[];
  /** Visible rows in the slider (defaults to all items, up to 7). */
  rows?: number;
  /** "label" = small eyebrow-style title, "heading" = large section heading. */
  titleSize?: "label" | "heading";
};

/** Label on the left, auto-advancing vertical list of objectives on the right. */
export function ObjectivesSection({
  id,
  title,
  items,
  rows = Math.min(items.length, 7),
  titleSize = "label",
}: ObjectivesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("is-visible");
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    section.classList.add("is-ready");
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="objectives-section" ref={sectionRef} aria-labelledby={id}>
      <div className="objectives-section__inner page-width">
        <h2
          id={id}
          className={`objectives-section__title${titleSize === "heading" ? " objectives-section__title--heading" : ""}`}
        >
          {title}
        </h2>
        <VerticalSlider
          items={items}
          label={title}
          rows={rows}
          playing={visible}
          className="objectives-slider"
          itemClassName="objectives-slider__item"
        />
      </div>
    </section>
  );
}
