"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { RolloverText } from "@/components/rollover-text";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

const bayerMatrix = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

function DitherGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const cell = width < 600 ? 4 : 5;
      const centerX = width * 0.5;
      const centerY = height * 0.96;
      const radiusX = width * 0.49;
      const radiusY = height * 0.93;
      const light = [-0.42, 0.58, 0.7];
      const lightLength = Math.hypot(...light);
      const normalizedLight = light.map((axis) => axis / lightLength);

      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          const nx = (x + cell / 2 - centerX) / radiusX;
          const ny = (centerY - (y + cell / 2)) / radiusY;
          const radial = nx * nx + ny * ny;
          if (radial >= 1) continue;

          const nz = Math.sqrt(1 - radial);
          const diffuse = Math.max(
            0,
            nx * normalizedLight[0] + ny * normalizedLight[1] + nz * normalizedLight[2],
          );
          const edgeShade = Math.sqrt(nz);
          const shade = Math.min(0.92, (0.12 + diffuse * 0.9) * (0.66 + edgeShade * 0.34));
          const threshold = (bayerMatrix[Math.floor(y / cell) % 8][Math.floor(x / cell) % 8] + 0.5) / 64;

          if (shade > threshold) {
            context.fillStyle = shade > 0.68 ? "rgba(106, 29, 28, 0.27)" : "rgba(174, 69, 62, 0.2)";
            context.fillRect(x, y, cell - 0.8, cell - 0.8);
          }
        }
      }
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, []);

  return <canvas className="contact-invite__globe" ref={canvasRef} aria-hidden="true" />;
}

export function ContactInviteSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("is-visible");
        observer.unobserve(section);
      },
      { threshold: 0.15 },
    );

    section.classList.add("is-ready");
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-invite" ref={sectionRef} aria-labelledby="contact-invite-title">
      <div className="contact-invite__content page-width">
        <ScrollRevealHeading
          id="contact-invite-title"
          level="h2"
          className="contact-invite__title"
          lines={["Tell us about your project,", "operational requirement or", "service need."]}
        />
        <Link className="button button--primary contact-invite__button" href="/contact">
          <RolloverText>Contact us for your project</RolloverText>
        </Link>
      </div>
      <div className="contact-invite__globe-window">
        <DitherGlobe />
      </div>
    </section>
  );
}