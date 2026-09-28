type PageHeroIntroProps = {
  id: string;
  lines: string[];
  summary: string;
};

/** Heading + summary row used at the top of inner pages; animates on load. */
export function PageHeroIntro({ id, lines, summary }: PageHeroIntroProps) {
  return (
    <div className="page-hero__intro page-width">
      <h1 id={id} className="page-hero__title" aria-label={lines.join(" ")}>
        {lines.map((line) => (
          <span className="page-hero__line" key={line} aria-hidden="true">
            <span>{line}</span>
          </span>
        ))}
      </h1>
      <p className="page-hero__summary">{summary}</p>
    </div>
  );
}
