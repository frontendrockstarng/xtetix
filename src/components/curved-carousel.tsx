import Image from "next/image";
import type { CSSProperties } from "react";

type CurvedCarouselProps = {
  label: string;
  images: { src: string; alt: string }[];
  /** Seconds for one full loop of the image set. */
  duration?: number;
};

/**
 * Full-bleed infinite marquee of photos, masked so the strip bows like the
 * inside of a cylinder (edges taller than the centre). The set is rendered
 * twice and the track slides by exactly one set, so the loop is seamless.
 */
export function CurvedCarousel({ label, images, duration = images.length * 9 }: CurvedCarouselProps) {
  return (
    <div
      className="curved-carousel"
      role="region"
      aria-label={label}
      style={{ "--carousel-duration": `${duration}s` } as CSSProperties}
    >
      <div className="curved-carousel__track">
        {[0, 1].map((copy) =>
          images.map((image, index) => (
            <div
              className="curved-carousel__item"
              key={`${copy}-${image.src}`}
              aria-hidden={copy === 1 ? true : undefined}
            >
              <Image
                src={image.src}
                alt={copy === 0 ? image.alt : ""}
                fill
                priority={copy === 0 && index < 3}
                sizes="(max-width: 760px) 78vw, 40vw"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
