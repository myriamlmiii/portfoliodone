"use client";

import { useRef, type AnchorHTMLAttributes, type PointerEvent } from "react";

/** Anchor that is gently pulled toward the pointer; resets on leave. Adds target=_blank for external URLs. */
export function MagneticLink({
  href = "",
  children,
  className = "",
  strength = 1,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { strength?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const external = /^https?:\/\//.test(href);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.3 * strength}px, ${y * 0.4 * strength}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      data-hot
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      style={{ transition: "transform 220ms cubic-bezier(.16,1,.3,1)" }}
    >
      {children}
    </a>
  );
}
