import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`section-heading ${className}`}>
      {eyebrow && <p className="type-eyebrow mb-3 text-accent">{eyebrow}</p>}
      <h2 className="font-display type-section-title text-ink">
        {title}
        {accent && <span className="font-normal italic text-accent">{accent}</span>}
      </h2>
      {intro && <p className="content-reading type-body mt-4 text-muted">{intro}</p>}
    </Reveal>
  );
}
