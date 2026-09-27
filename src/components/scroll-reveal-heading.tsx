"use client";

import { useEffect, useRef } from "react";

type ScrollRevealHeadingProps = {
  className?: string;
  id?: string;
  level: "h1" | "h2" | "h3" | "h4";
  lines: string[];
};

export function ScrollRevealHeading({
  className,
  id,
  level,
  lines,
}: ScrollRevealHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const Heading = level;

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let revealDelay: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealDelay = window.setTimeout(() => {
            heading.classList.add("is-visible");
          }, 140);
          observer.unobserve(heading);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -12% 0px" },
    );

    heading.classList.add("is-ready");
    observer.observe(heading);

    return () => {
      observer.disconnect();
      if (revealDelay !== undefined) window.clearTimeout(revealDelay);
    };
  }, []);

  return (
    <Heading
      ref={headingRef}
      id={id}
      className={`scroll-heading${className ? ` ${className}` : ""}`}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, index) => (
        <span
          className="scroll-heading__line"
          key={`${index}-${line}`}
          aria-hidden="true"
        >
          <span>{line}</span>
        </span>
      ))}
    </Heading>
  );
}