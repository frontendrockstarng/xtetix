import { StatementCta } from "@/components/statement-cta";

export function AboutCommitment() {
  return (
    <StatementCta
      label="Our commitment"
      statement="At Xtetix Concepts Limited, we remain committed to developing local capacity, promoting Nigerian Content, maintaining world-class HSEQ standards, and continuously improving our service delivery to meet the evolving needs of our clients."
      cta={{ label: "Learn more about our HSEQ policy", href: "/hseq-policy" }}
    />
  );
}
