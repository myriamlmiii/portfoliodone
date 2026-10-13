import { useEffect, useRef, useState } from "react";

/** True once the element has come within `margin` of the viewport; never flips back. */
export function useInViewOnce<T extends Element>(margin = "300px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, seen]);
  return [ref, seen] as const;
}
