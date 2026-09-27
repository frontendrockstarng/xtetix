import Link from "next/link";
import { RolloverText } from "@/components/rollover-text";
import { ScrollRevealHeading } from "@/components/scroll-reveal-heading";

type PlaceholderPageProps = {
  title: string;
  intro: string;
};

export function PlaceholderPage({ title, intro }: PlaceholderPageProps) {
  return (
    <main className="placeholder-page page-width">
      <p className="eyebrow">Xtetix Concepts Ltd</p>
      <ScrollRevealHeading level="h1" lines={[title]} />
      <p>{intro}</p>
      <Link className="button button--primary" href="/contact">
        <RolloverText>Contact us</RolloverText>
      </Link>
    </main>
  );
}