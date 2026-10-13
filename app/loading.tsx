export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-canvas" role="status" aria-label="Loading">
      <span className="h-px w-24 origin-left animate-pulse bg-accent" />
    </div>
  );
}
