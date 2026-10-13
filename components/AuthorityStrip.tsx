"use client";

import Image from "next/image";
import { authority } from "@/data/authority";
import { Reveal } from "./Reveal";
import { usePreferences } from "./Preferences";

export function AuthorityStrip() {
  const { t } = usePreferences();

  return (
    <section id="authority" className="py-16">
      <div className="container-content">
        <Reveal className="mb-10 text-center text-[15px] font-medium text-muted">
          {t.authority}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-10 md:gap-x-10">
            {authority.map((item) => {
              const inner = (
                <>
                  {item.logo ? (
                    <span className={`relative flex h-16 w-32 items-center justify-center rounded-2xl border border-line px-4 py-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-ink/30 ${item.logoTone === "dark" ? "bg-[#18181b]" : "bg-white"}`}>
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-contain p-1"
                      />
                    </span>
                  ) : (
                    <span className="max-w-[160px] rounded-2xl border border-line bg-surface px-4 py-3 text-center font-display text-sm font-medium leading-tight text-ink">
                      {item.name}
                    </span>
                  )}
                  <span className="mt-2 max-w-[160px] text-center text-[13px] text-muted">
                    {item.role}
                  </span>
                </>
              );

              const className =
                "group flex flex-col items-center opacity-80 transition-all duration-200 hover:opacity-100";

              return item.href ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`${item.name}, ${item.role}`}
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <div key={item.name} title={`${item.name}, ${item.role}`} className={className}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
