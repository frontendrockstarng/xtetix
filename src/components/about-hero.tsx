"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const STATIC_LAYOUT_QUERY = "(max-width: 760px), (prefers-reduced-motion: reduce)";

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const range = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const easeOut = (t: number) => 1 - (1 - t) ** 3;

export function AboutHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const staticLayout = window.matchMedia(STATIC_LAYOUT_QUERY);
    let target = 0;
    let current = 0;
    let frameId = 0;

    const apply = (progress: number) => {
      // 0–10%: hold full width · 10–65%: close in · 50–90%: copy fades in.
      track.style.setProperty("--shrink", easeInOut(range(progress, 0.1, 0.65)).toFixed(4));
      track.style.setProperty("--mission", easeOut(range(progress, 0.5, 0.8)).toFixed(4));
      track.style.setProperty("--vision", easeOut(range(progress, 0.6, 0.9)).toFixed(4));
    };

    const render = () => {
      // Ease toward the scroll position so wheel steps don't feel jumpy.
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply(current);
      frameId = current === target ? 0 : requestAnimationFrame(render);
    };

    const measure = () => {
      if (staticLayout.matches) return;
      const distance = track.offsetHeight - stage.offsetHeight;
      target = distance > 0 ? clamp(-track.getBoundingClientRect().top / distance) : 0;
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    staticLayout.addEventListener("change", measure);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      staticLayout.removeEventListener("change", measure);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <div className="about-hero__intro page-width">
        <h1
          id="about-hero-title"
          className="about-hero__title"
          aria-label="Experience. Capability. Excellence."
        >
          {["Experience. Capability.", "Excellence."].map((line) => (
            <span className="about-hero__line" key={line} aria-hidden="true">
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="about-hero__summary">
          Established in 2012, the company has built a reputation for delivering safe,
          reliable, and cost-effective solutions that support critical infrastructure,
          operational facilities, and project execution environments.
        </p>
      </div>

      <div className="about-reveal" ref={trackRef}>
        <div className="about-reveal__stage page-width" ref={stageRef}>
          <div className="about-reveal__frame">
            <div className="about-reveal__image">
              <div className="about-reveal__image-intro">
                <Image
                  src="/assets/about-hero.webp"
                  alt="Xtetix crew carrying out maintenance on a vessel deck at sea"
                  fill
                  priority
                  sizes="(max-width: 760px) 100vw, 1440px"
                />
              </div>
            </div>

            <div className="about-reveal__copy about-reveal__copy--mission">
              <h2>Mission</h2>
              <p>
                To deliver high-quality construction, procurement, facility management,
                logistics and pipeline support services through operational excellence,
                innovation, strict safety compliance and a lasting commitment to our
                clients&apos; success.
              </p>
            </div>

            <div className="about-reveal__copy about-reveal__copy--vision">
              <h2>Vision</h2>
              <p>
                To be the preferred indigenous infrastructure, construction, facility
                management and project support company in Nigeria, recognised for safety,
                reliability, quality and sustainable value for every stakeholder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
