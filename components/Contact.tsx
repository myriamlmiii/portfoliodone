"use client";

import { ArrowUpRight, CalendarDays, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "./Reveal";
import { usePreferences } from "./Preferences";

const EMAIL = "lmeriem28@gmail.com";
const CALENDLY = "https://calendly.com/meriem-lmoubariki/30min";

export function Contact() {
  const { t } = usePreferences();

  const links = [
    { href: `mailto:${EMAIL}`, icon: Mail, label: EMAIL, note: t.contact.intro, external: false },
    { href: CALENDLY, icon: CalendarDays, label: t.contact.meeting, note: t.contact.meetingNote, external: true },
    { href: "https://linkedin.com/in/meriem-lmoubariki-591710351", icon: Linkedin, label: "LinkedIn", note: "Professional profile", external: true },
    { href: "https://github.com/myriamlmiii", icon: Github, label: "GitHub", note: "github.com/myriamlmiii", external: true },
  ];
  const referencesHref = `mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.referencesSubject)}&body=${encodeURIComponent(t.contact.referencesEmailBody)}`;

  return (
    <footer id="contact" className="section-pad bg-canvas">
      <div className="container-content">
        <Reveal className="section-heading">
          <p className="type-eyebrow mb-3 text-accent">{t.contact.kicker}</p>
          <h2 className="font-display type-section-title text-ink">
            {t.contact.titleBefore}
            <span className="font-normal italic text-accent">{t.contact.titleAccent}</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="mb-5 flex flex-col gap-6 rounded-xl bg-ink p-6 text-canvas md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-xl">
              <p className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-tight">{t.contact.references}</p>
              <p className="type-body mt-3 max-w-[60ch] text-canvas/70">{t.contact.referencesBody}</p>
            </div>
            <a
              href={referencesHref}
              className="interactive-target inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-5 text-base font-medium text-canvas transition-opacity hover:opacity-90"
            >
              {t.contact.referencesCta}
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {links.map(({ href, icon: Icon, label, note, external }) => (
            <a
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group flex min-h-24 items-start gap-4 border-t border-line bg-surface p-5 transition-colors hover:border-accent sm:p-6"
            >
              <Icon size={22} className="mt-0.5 shrink-0 text-accent" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3 text-base font-semibold text-ink">
                  <span className="truncate">{label}</span>
                  <ArrowUpRight size={16} className="shrink-0 text-muted transition-colors group-hover:text-accent" />
                </span>
                <span className="type-meta mt-1 block text-muted">{note}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="type-meta mt-16 flex flex-col gap-3 border-t border-line pt-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026</span>
          <span>{t.contact.footer}</span>
        </div>
      </div>
    </footer>
  );
}
