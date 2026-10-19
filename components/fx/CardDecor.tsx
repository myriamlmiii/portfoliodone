"use client";

/** Teal L-brackets, a top flare line and a cursor spotlight (reads --mx/--my set by the parent). Purely decorative. */
export function CardDecor() {
  return (
    <>
      <span
        aria-hidden="true"
        className="card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      {(["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"] as const).map((c) => (
        <span key={c} aria-hidden="true" className={`pointer-events-none absolute h-3 w-3 border-accent/70 transition-all duration-300 group-hover:h-5 group-hover:w-5 ${c}`} />
      ))}
    </>
  );
}
