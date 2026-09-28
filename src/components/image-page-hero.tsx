import Image from "next/image";
import { PageHeroIntro } from "@/components/page-hero-intro";

type ImagePageHeroProps = {
  id: string;
  lines: string[];
  summary: string;
  image: { src: string; alt: string };
};

/** Inner-page hero: heading + summary, then a full-width image that grows in on load. */
export function ImagePageHero({ id, lines, summary, image }: ImagePageHeroProps) {
  return (
    <section className="page-hero page-hero--image" aria-labelledby={id}>
      <PageHeroIntro id={id} lines={lines} summary={summary} />
      <div className="page-width">
        <div className="page-hero__image">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 1440px"
          />
        </div>
      </div>
    </section>
  );
}
