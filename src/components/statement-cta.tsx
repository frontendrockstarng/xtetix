"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { RolloverText } from "@/components/rollover-text";
import { ScrollFillText } from "@/components/scroll-fill-text";

type StatementCtaProps = {
  label: string;
  statement: string;
  cta?: { label: string; href: string };
};

/** Off-white band with a scroll-fill statement and a CTA button that fades up. */
export function StatementCta({ label, statement, cta }: StatementCtaProps) {
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = ctaRef.current;
    if (!link || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        link.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    link.classList.add("is-ready");
    observer.observe(link);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="statement-cta" aria-label={label}>
      <div className="page-width">
        <ScrollFillText text={statement} />
        {cta && (
          <Link className="button button--primary statement-cta__button" href={cta.href} ref={ctaRef}>
            <RolloverText>{cta.label}</RolloverText>
          </Link>
        )}
      </div>
    </section>
  );
}
