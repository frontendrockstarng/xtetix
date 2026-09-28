"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { RolloverText } from "@/components/rollover-text";
import { ScrollFillText } from "@/components/scroll-fill-text";

const statement =
  "At Xtetix Concepts Limited, we remain committed to developing local capacity, promoting Nigerian Content, maintaining world-class HSEQ standards, and continuously improving our service delivery to meet the evolving needs of our clients.";

export function AboutCommitment() {
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        cta.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    cta.classList.add("is-ready");
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-commitment" aria-label="Our commitment">
      <div className="page-width">
        <ScrollFillText text={statement} />
        <Link
          className="button button--primary about-commitment__cta"
          href="/hseq-policy"
          ref={ctaRef}
        >
          <RolloverText>Learn more about our HSEQ policy</RolloverText>
        </Link>
      </div>
    </section>
  );
}
