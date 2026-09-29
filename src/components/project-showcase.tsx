"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 40;

type ProjectShowcaseProps = {
  id: string;
  title: string;
  summary: string;
  images: { src: string; alt: string }[];
  tone?: "light" | "white";
};

/** One project: copy beside an autoplaying image slider with thumbnails. */
export function ProjectShowcase({ id, title, summary, images, tone = "light" }: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const swipeStartRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);

  const count = images.length;
  const playing = canAutoplay && inView && !paused && count > 1;

  const goTo = (index: number) => {
    const next = (index + count) % count;
    if (next === active) return;
    setPrevious(active);
    setActive(next);
  };

  // Scroll reveal, plus tracking whether the slider is on screen for autoplay.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-showcase-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanAutoplay(!reducedMotion);

    const viewObserver = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    viewObserver.observe(section);

    if (reducedMotion) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return () => viewObserver.disconnect();
    }

    // Wait for the photo to decode so the grow-in never runs on an empty frame.
    const reveal = (target: Element) => {
      const img = target.querySelector("img");
      const show = () => target.classList.add("is-visible");
      if (!img || img.complete) return show();
      img.decode().then(show, show);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealObserver.unobserve(entry.target);
          reveal(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((target) => {
      target.classList.add("is-ready");
      revealObserver.observe(target);
    });

    return () => {
      viewObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setPrevious(active);
      setActive((active + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, count]);

  // Keep the active thumbnail visible when the strip scrolls on small screens.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumb || strip.scrollWidth <= strip.clientWidth) return;
    const left = thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") swipeStartRef.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (start === null) return;
    const distance = event.clientX - start;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) goTo(active + (distance < 0 ? 1 : -1));
  };

  return (
    <section
      className={`project-showcase project-showcase--${tone}`}
      ref={sectionRef}
      aria-labelledby={id}
      data-playing={playing}
    >
      <div className="project-showcase__inner page-width">
        <div className="project-showcase__copy">
          <ScrollRevealHeading id={id} level="h2" className="project-showcase__title" lines={[title]} />
          <p className="project-showcase__summary" data-showcase-reveal>
            {summary}
          </p>
        </div>

        <div
          className="project-showcase__media"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
        >
          <div
            className="project-showcase__stage"
            data-showcase-reveal
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              swipeStartRef.current = null;
            }}
          >
            <div className="project-showcase__slides">
              {images.map((image, index) => {
                const isActive = index === active;
                const state = isActive
                  ? previous === null
                    ? " is-active"
                    : " is-active is-entering"
                  : index === previous
                    ? " is-previous"
                    : "";

                return (
                  <div
                    className={`project-showcase__slide${state}`}
                    key={image.src}
                    aria-hidden={!isActive}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 692px"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {count > 1 && (
            <div
              className="project-showcase__thumbs"
              ref={thumbsRef}
              role="group"
              aria-label={`${title} images`}
              data-showcase-reveal
            >
              {images.map((image, index) => (
                <button
                  className={`project-showcase__thumb${index === active ? " is-active" : ""}`}
                  type="button"
                  key={image.src}
                  onClick={() => goTo(index)}
                  aria-label={`Show image ${index + 1} of ${count}: ${image.alt}`}
                  aria-pressed={index === active}
                  style={{ "--thumb-delay": `${270 + index * 40}ms` } as CSSProperties}
                >
                  <Image src={image.src} alt="" fill sizes="80px" />
                  {index === active && (
                    <span
                      className="project-showcase__progress"
                      key={active}
                      style={{ "--autoplay-ms": `${AUTOPLAY_MS}ms` } as CSSProperties}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
