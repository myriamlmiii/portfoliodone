import { SHOW_PENDING } from "@/lib/pending";

/** Marks content still to confirm. Renders nothing unless NEXT_PUBLIC_SHOW_PENDING=true. */
export function PendingBadge({ label = "Pending", className = "" }: { label?: string; className?: string }) {
  if (!SHOW_PENDING) return null;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-400 ${className}`}
    >
      {label}
    </span>
  );
}

const statusStyles = {
  live: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  "in-progress": "bg-sky-500/12 text-sky-700 dark:text-sky-400",
  research: "bg-accent/12 text-accent",
} as const;

export function StatusBadge({ status, label }: { status: keyof typeof statusStyles; label: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
