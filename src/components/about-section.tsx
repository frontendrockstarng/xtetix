"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RolloverText } from "@/components/rollover-text";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

const metrics = [
  { value: 14, suffix: "+", label: "Years in operation" },
  { value: 5, suffix: "", label: "Core service areas" },
  { value: 6, suffix: "", label: "Industry sectors" },
  { value: 5, suffix: "", label: "Featured projects" },
];

function CountUpMetric({
  value,
  suffix,
  label,
}: (typeof metrics)[number]) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const metric = document.querySelector<HTMLElement>(
      `[data-metric-label="${label}"]`,
    );
    if (!metric) return;

    let frameId = 0;
    let delayId: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(metric);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCount(value);
          return;
        }

        const duration = 1100;
        const startedAt = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setCount(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };

        delayId = window.setTimeout(() => {
          frameId = requestAnimationFrame(animate);
        }, 110);
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(metric);
    return () => {
      observer.disconnect();
      if (delayId !== undefined) window.clearTimeout(delayId);
      cancelAnimationFrame(frameId);
    };
  }, [label, value]);

  return (
    <div className="about-section__metric" data-metric-label={label}>
      <p className="about-section__metric-value" aria-label={`${value}${suffix}`}>
        <span aria-hidden="true">{count ?? 0}</span>
        <span aria-hidden="true">{suffix}</span>
      </p>
      <p className="about-section__metric-label">{label}</p>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const revealItems = section.querySelectorAll<HTMLElement>("[data-about-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          observer.unobserve(target);
          window.setTimeout(() => target.classList.add("is-visible"), 70);
        });
      },
      { threshold: 0, rootMargin: "0px" },
    );

    revealItems.forEach((item) => {
      item.classList.add("is-ready");
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" aria-labelledby="about-title">
      <div className="about-section__inner page-width">
        <div className="about-section__intro">
          <div className="about-section__story">
            <ScrollRevealHeading
              id="about-title"
              level="h2"
              lines={["Built to support critical operations", "across major industries"]}
            />
            <p className="about-section__description" data-about-reveal>
              Established in 2012, XTETIX Concepts Limited is an indigenous
              Nigerian company providing integrated construction,
              infrastructure, facility management, procurement, marine
              logistics and project support services.
            </p>
          </div>
          <div className="about-section__metrics" aria-label="Company at a glance">
            {metrics.map((metric) => (
              <CountUpMetric key={metric.label} {...metric} />
            ))}
          </div>
        </div>

        <div className="about-section__visual is-image-reveal" data-about-reveal>
          <Image
            src="/assets/aboutUsImg.webp"
            alt="Construction workers silhouetted against the sun on an infrastructure project"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1440px"
          />
        </div>

        <div className="about-section__closing">
          <p className="about-section__closing-copy" data-about-reveal>
            Our capabilities span the project lifecycle, helping clients execute
            projects, maintain operational facilities and support critical
            infrastructure across oil &amp; gas, energy, marine, industrial and
            public-sector environments.
          </p>
          <Link
            className="button button--primary about-section__cta"
            href="/about-us"
            data-about-reveal
          >
            <RolloverText>Read more</RolloverText>
          </Link>
        </div>
      </div>
    </section>
  );
}