"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RolloverText } from "@/components/rollover-text";

const capabilities = [
  "Skills Acquisition",
  "Local Enterprise",
  "Workforce Development",
  "Knowledge Transfer",
  "Community Development",
];

export function CapabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("is-visible");
      setIsVisible(true);
      return;
    }

    section.classList.add("is-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(section);
        setIsVisible(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => section.classList.add("is-visible"));
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % capabilities.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      className="capability-section"
      ref={sectionRef}
      aria-labelledby="capability-title"
    >
      <div className="capability-section__inner page-width">
        <div className="capability-section__lead">
          <p id="capability-title" className="capability-section__lead-title">
            Building Nigerian
            <br />
            {" "}capability
          </p>
        </div>

        <div className="capability-slider" aria-label="Our capability priorities">
          <div
            className="capability-slider__track"
            aria-hidden="true"
            style={{
              transform: `translateY(calc((-4 - ${activeIndex}) * var(--capability-item-height)))`,
            } as CSSProperties}
          >
            {[...capabilities, ...capabilities, ...capabilities].map((capability, index) => (
              <span
                className={`capability-slider__item${index === capabilities.length + activeIndex ? " is-active" : ""}`}
                key={`${capability}-${index}`}
              >
                {capability}
              </span>
            ))}
          </div>
          <span className="sr-only">
            {capabilities.join(", ")}
          </span>
        </div>

        <div className="capability-section__content">
          <p className="capability-section__description">
            As an indigenous Nigerian company, XTETIX is committed to workforce
            development, local supplier participation, knowledge transfer and
            sustainable economic value creation.
          </p>
          <Link className="button button--outline capability-section__cta" href="/local-content">
            <RolloverText>Our local content commitment</RolloverText>
          </Link>
        </div>
      </div>
    </section>
  );
}