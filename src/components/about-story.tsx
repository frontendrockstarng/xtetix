"use client";

import { useEffect, useRef, useState } from "react";
import { StorySection } from "@/components/story-section";

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

function AboutMetrics() {
  const listRef = useRef<HTMLDListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        list.classList.add("is-visible");
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    list.classList.add("is-ready");
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <dl className="about-story__metrics" ref={listRef}>
      {metrics.map((metric, index) => (
        <div
          className="about-story__metric"
          key={metric.label}
          style={{ "--metric-delay": `${index * 120}ms` } as React.CSSProperties}
        >
          <dt className="about-story__metric-label">{metric.label}</dt>
          <dd className="about-story__metric-value" aria-label={`${metric.value}${metric.suffix}`}>
            <span aria-hidden="true">
              <CountUp value={metric.value} start={visible} />
              {metric.suffix}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function AboutStory() {
  return (
    <StorySection
      label="Our approach"
      statement="Through a combination of technical expertise, experienced personnel, strategic partnerships, and a commitment to operational excellence, Xtetix delivers projects that meet the highest standards of quality, safety, and performance."
      image={{
        src: "/assets/about-sunset.webp",
        alt: "Construction workers silhouetted against a red sun on a building frame",
      }}
      closing="Our capabilities span the full project lifecycle, from site preparation and civil works to procurement, facility maintenance, pipeline support services, logistics coordination, and infrastructure rehabilitation. We work closely with clients to develop practical and sustainable solutions that improve operational efficiency, reduce project risks, and ensure successful project outcomes."
    >
      <AboutMetrics />
    </StorySection>
  );
}
