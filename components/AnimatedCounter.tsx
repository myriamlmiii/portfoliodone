"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Stat } from "@/types";

function formatValue(value: number, decimals = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function AnimatedCounter({ stat, delay = 0 }: { stat: Stat; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);
  const decimals = stat.decimals ?? 0;

  const Icon = (icons[stat.icon as keyof typeof icons] as LucideIcon) ?? icons.Circle;

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const duration = 1100;
      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(eased * stat.value);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, stat.value, delay]);

  return (
    <div ref={ref} className="flex flex-col gap-4 border-t border-line py-8">
      <Icon size={22} className="text-accent" strokeWidth={1.5} />
      <span className="tabular text-[36px] font-semibold leading-none text-ink md:text-[48px]">
        {formatValue(value, decimals)}
        {stat.suffix}
      </span>
      <span className="max-w-[240px] text-sm leading-snug text-muted">{stat.label}</span>
    </div>
  );
}
