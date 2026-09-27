"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { RolloverText } from "@/components/rollover-text";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

const projects = [
  {
    title:
      "Eroton exploration & production FLB temporary accommodation project (Akaso/Alakiri Field)",
    description:
      "Provision, installation and deployment of modular accommodation facilities to support field personnel and operational requirements. The project was executed in compliance with applicable safety, quality and operational standards.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=85",
        alt: "Timber framing at an active construction project",
      },
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=85",
        alt: "Construction site with workers and equipment",
      },
      {
        src: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?auto=format&fit=crop&w=1800&q=85",
        alt: "Building work underway on a large project",
      },
    ],
  },
  {
    title: "ANTAN field revamp",
    description:
      "Project successfully executed civil and infrastructure rehabilitation works to support ongoing field operations and improve facility functionality.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
        alt: "Glass and steel commercial building",
      },
      {
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=85",
        alt: "Contemporary building exterior",
      },
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
        alt: "Completed modern building interior",
      },
    ],
  },
  {
    title: "SEPLAT energy / HORATIO project. Infectious diseases hospital development, Orlu",
    description:
      "Participated in the execution of infrastructure development works supporting the construction of critical healthcare facilities aimed at improving community healthcare capacity.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1400&q=85",
        alt: "Modern hospital building and healthcare facility",
      },
      {
        src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=85",
        alt: "Bright hospital corridor",
      },
      {
        src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
        alt: "Healthcare professionals in a clinical environment",
      },
    ],
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          observer.unobserve(target);
          target.classList.add("is-ready");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => target.classList.add("is-visible"));
          });
        });
      },
      { threshold: 0.08 },
    );

    section.querySelectorAll<HTMLElement>("[data-project-reveal]").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeProject !== null && !dialog.open) dialog.showModal();
    if (activeProject === null && dialog.open) dialog.close();
  }, [activeProject]);

  const openGallery = (projectIndex: number) => {
    setActiveImage(0);
    setActiveProject(projectIndex);
  };

  const handleGalleryKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (activeProject === null) return;
    const imageCount = projects[activeProject].images.length;

    if (event.key === "ArrowRight") {
      setActiveImage((current) => (current + 1) % imageCount);
    }
    if (event.key === "ArrowLeft") {
      setActiveImage((current) => (current - 1 + imageCount) % imageCount);
    }
  };

  const selectedProject = activeProject === null ? null : projects[activeProject];
  const selectedImage = selectedProject?.images[activeImage];

  return (
    <section className="projects-section" ref={sectionRef} aria-labelledby="projects-title">
      <div className="projects-section__inner page-width">
        <header className="projects-section__heading">
          <ScrollRevealHeading
            id="projects-title"
            level="h2"
            lines={["Proven experience.", "Practical delivery"]}
          />
          <p data-project-reveal>
            Explore selected projects delivered across construction,
            infrastructure, facility management, logistics and project support.
          </p>
        </header>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              className={`project-card${index === 0 ? " project-card--featured" : ""}`}
              data-project-reveal
              key={project.title}
              style={{ "--project-delay": `${index * 120}ms` } as React.CSSProperties}
            >
              <div className="project-card__media">
                <Image
                  className="project-card__image"
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  fill
                  unoptimized
                  sizes={index === 0 ? "(max-width: 760px) 100vw, 1320px" : "(max-width: 760px) 100vw, 640px"}
                />
              </div>
              <div className="project-card__details">
                <div className="project-card__copy">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <button
                  className="button button--outline project-card__button"
                  type="button"
                  onClick={() => openGallery(index)}
                  aria-label={`See images for ${project.title}`}
                >
                  <RolloverText>See images</RolloverText>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-section__more" data-project-reveal>
          <Link className="button button--primary" href="/projects">
            <RolloverText>See more projects</RolloverText>
          </Link>
        </div>
      </div>

      <dialog
        className="project-gallery"
        ref={dialogRef}
        aria-label={selectedProject ? `Project gallery: ${selectedProject.title}` : "Project gallery"}
        onCancel={(event) => {
          event.preventDefault();
          setActiveProject(null);
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) setActiveProject(null);
        }}
        onKeyDown={handleGalleryKeyDown}
      >
        {selectedProject && selectedImage && (
          <div className="project-gallery__content">
            <div className="project-gallery__topbar">
              <p>{selectedProject.title}</p>
              <button
                className="project-gallery__close"
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close gallery"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="project-gallery__image-wrap">
              <Image
                key={selectedImage.src}
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                unoptimized
                sizes="100vw"
              />
              <button
                className="project-gallery__arrow project-gallery__arrow--previous"
                type="button"
                onClick={() =>
                  setActiveImage((current) =>
                    (current - 1 + selectedProject.images.length) % selectedProject.images.length,
                  )
                }
                aria-label="Previous image"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                className="project-gallery__arrow project-gallery__arrow--next"
                type="button"
                onClick={() =>
                  setActiveImage((current) => (current + 1) % selectedProject.images.length)
                }
                aria-label="Next image"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="project-gallery__footer">
              <p>{selectedImage.alt}</p>
              <span>
                {activeImage + 1} / {selectedProject.images.length}
              </span>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}