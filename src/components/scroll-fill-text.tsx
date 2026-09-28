"use client";

import { useEffect, useRef } from "react";

type ScrollFillTextProps = {
  text: string;
  className?: string;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

/**
 * Large statement text that slides up on reveal, then fills word by word
 * (40% → 100% opacity) as it scrolls through the viewport.
 */
export function ScrollFillText({ text, className }: ScrollFillTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.setProperty("--fill", "1");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    element.classList.add("is-ready");
    observer.observe(element);

    let target = 0;
    let current = 0;
    let frameId = 0;

    const render = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      element.style.setProperty("--fill", current.toFixed(4));
      frameId = current === target ? 0 : requestAnimationFrame(render);
    };

    const measure = () => {
      const rect = element.getBoundingClientRect();
      // Starts when the text's top reaches 85% of the viewport,
      // completes when its bottom reaches 45%.
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.45;
      target = clamp((start - rect.top) / (start - end + rect.height));
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <p
      ref={ref}
      className={`scroll-fill${className ? ` ${className}` : ""}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${index}-${word}`}
          className="scroll-fill__word"
          style={{ "--i": index / words.length } as React.CSSProperties}
          aria-hidden="true"
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
