"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePreferences } from "./Preferences";

export function Journey() {
  const { t } = usePreferences();

  return (
    <section className="section-pad border-b border-line">
      <div className="container-content">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-[13px] text-muted"
        >
          {t.journeyKicker}
        </motion.p>

        <div className="flex flex-col items-center">
          {t.journey.map((step, i) => {
            const isLast = i === t.journey.length - 1;
            return (
              <div key={step} className="flex flex-col items-center">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`px-4 text-center font-display font-medium leading-[1.05] ${
                    isLast
                      ? "text-[clamp(32px,6.5vw,84px)] text-accent"
                      : "text-[clamp(26px,5.5vw,72px)] text-ink"
                  }`}
                >
                  {step}
                </motion.h2>
                {!isLast && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.15 }}
                    className="my-1 text-muted sm:my-2"
                  >
                    <ChevronDown size={22} strokeWidth={1.5} />
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
