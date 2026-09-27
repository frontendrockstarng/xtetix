"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { RolloverText } from "@/components/rollover-text";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

export function SafetyAssuranceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const content = section.querySelectorAll<HTMLElement>("[data-safety-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    content.forEach((item) => {
      if (!reducedMotion.matches) item.classList.add("is-ready");
      observer.observe(item);
    });

    let frame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect();
        const offset = (bounds.top + bounds.height / 2 - window.innerHeight / 2) * -0.1;
        section.style.setProperty("--safety-parallax-offset", `${offset}px`);
      });
    };

    if (!reducedMotion.matches) {
      updateParallax();
      window.addEventListener("scroll", updateParallax, { passive: true });
      window.addEventListener("resize", updateParallax);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  return (
    <section
      className="safety-assurance"
      ref={sectionRef}
      aria-labelledby="safety-title"
    >
      <Image
        className="safety-assurance__background"
        src="/assets/safetyBG.jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="safety-assurance__overlay" aria-hidden="true" />
      <div className="safety-assurance__content page-width">
        <ScrollRevealHeading
          id="safety-title"
          level="h2"
          className="safety-assurance__title"
          lines={["Safety & quality are built into how we work"]}
        />
        <p className="safety-assurance__copy" data-safety-reveal>
          At Xtetix Concepts Limited, we recognize that our people are our
          greatest asset. Through leadership commitment, operational discipline
          and continuous improvement, we remain dedicated to achieving
          incident-free operations while delivering safe, reliable and
          quality-driven solutions to our clients.
        </p>
        <Link
          className="button button--primary safety-assurance__cta"
          href="/company"
          data-safety-reveal
        >
          <RolloverText>See how we prioritize safety</RolloverText>
        </Link>
      </div>
    </section>
  );
}