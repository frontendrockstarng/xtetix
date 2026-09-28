"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollFillText } from "@/components/scroll-fill-text";

const statement =
  "Through a combination of technical expertise, experienced personnel, strategic partnerships, and a commitment to operational excellence, Xtetix delivers projects that meet the highest standards of quality, safety, and performance.";

const metrics = [
  { value: 14, suffix: "+", label: "Years in Operation" },
  { value: 5, suffix: "", label: "Core Service Areas" },
  { value: 6, suffix: "", label: "Industry Sectors" },
  { value: 5, suffix: "", label: "Featured Projects" },
];

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function CountUp({ value, start }: { value: number; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setCount(value);
      return;
    }

    let frameId = 0;
    const duration = 1400;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, value]);

  return <>{count}</>;
}

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  // One-shot reveals: metrics, image and closing paragraph.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll<HTMLElement>("[data-story-reveal]");
    if (prefersReducedMotion()) {
      setMetricsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          observer.unobserve(target);
          target.classList.add("is-visible");
          if (target.dataset.storyReveal === "metrics") setMetricsVisible(true);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => {
      item.classList.add("is-ready");
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-story" ref={sectionRef} aria-label="Our approach">
      <div className="about-story__inner page-width">
        <ScrollFillText text={statement} />

        <dl className="about-story__metrics" data-story-reveal="metrics">
          {metrics.map((metric, index) => (
            <div
              className="about-story__metric"
              key={metric.label}
              style={{ "--metric-delay": `${index * 120}ms` } as React.CSSProperties}
            >
              <dt className="about-story__metric-label">{metric.label}</dt>
              <dd className="about-story__metric-value" aria-label={`${metric.value}${metric.suffix}`}>
                <span aria-hidden="true">
                  <CountUp value={metric.value} start={metricsVisible} />
                  {metric.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="about-story__visual" data-story-reveal>
          <Image
            src="/assets/about-sunset.webp"
            alt="Construction workers silhouetted against a red sun on a building frame"
            fill
            sizes="(max-width: 760px) 100vw, 1440px"
          />
        </div>

        <p className="about-story__closing" data-story-reveal>
          Our capabilities span the full project lifecycle, from site preparation and civil
          works to procurement, facility maintenance, pipeline support services, logistics
          coordination, and infrastructure rehabilitation. We work closely with clients to
          develop practical and sustainable solutions that improve operational efficiency,
          reduce project risks, and ensure successful project outcomes.
        </p>
      </div>
    </section>
  );
}
