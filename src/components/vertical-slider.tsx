"use client";

import { useEffect, useState, type CSSProperties } from "react";

type VerticalSliderProps = {
  items: string[];
  label: string;
  /** Number of rows visible at once; the active item sits in the middle. */
  rows?: number;
  /** Autoplay only while true (e.g. once the section has scrolled into view). */
  playing: boolean;
  interval?: number;
  className?: string;
  itemClassName?: string;
};

/**
 * Infinite vertical ticker. Items are rendered three times; after the track
 * passes a full cycle it snaps back one cycle with transitions disabled, so the
 * loop always moves forward and never rewinds.
 */
export function VerticalSlider({
  items,
  label,
  rows = 3,
  playing,
  interval = 3000,
  className,
  itemClassName,
}: VerticalSliderProps) {
  const count = items.length;
  const [step, setStep] = useState(0);
  const [snapping, setSnapping] = useState(false);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setStep((current) => current + 1), interval);
    return () => window.clearInterval(timer);
  }, [playing, interval]);

  // Re-enable transitions two frames after a snap, once the jump has painted.
  useEffect(() => {
    if (!snapping) return;
    let frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(() => setSnapping(false));
    });
    return () => cancelAnimationFrame(frameId);
  }, [snapping]);

  const activeSlot = count + step;
  const offset = activeSlot - Math.floor(rows / 2);

  return (
    <div
      className={`vertical-slider${snapping ? " is-snapping" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--slider-rows": rows } as CSSProperties}
      aria-label={label}
    >
      <div
        className={`vertical-slider__track${snapping ? " is-snapping" : ""}`}
        style={{ "--slider-offset": offset } as CSSProperties}
        aria-hidden="true"
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget || step < count) return;
          setSnapping(true);
          setStep((current) => current - count);
        }}
      >
        {[...items, ...items, ...items].map((item, slot) => (
          <span
            key={`${item}-${slot}`}
            className={`vertical-slider__item${itemClassName ? ` ${itemClassName}` : ""}${slot === activeSlot ? " is-active" : ""}`}
            style={{ "--distance": Math.abs(slot - activeSlot) } as CSSProperties}
          >
            {item}
          </span>
        ))}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
