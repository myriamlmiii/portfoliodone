import type { AuthorityItem } from "@/types";

/** Logos live in /public/logos. Items without a file show the name until you drop one. */
export const authority: readonly AuthorityItem[] = [
  { name: "Al Akhawayn University", role: "Home institution", logo: "/logos/aui.png", href: "https://www.aui.ma" },
  { name: "University of the Fraser Valley", role: "First bilateral exchange student from AUI (Morocco)", logo: "/logos/ufv.svg", logoTone: "dark", href: "https://www.ufv.ca" },
  { name: "KMUTT", role: "Researcher, Thailand", logo: "/logos/kmutt.svg", logoTone: "dark", href: "https://www.kmutt.ac.th" },
  { name: "TAQA Morocco", role: "Data Analyst Intern", logo: "/logos/taqa.svg", logoTone: "dark", href: "https://www.taqamorocco.ma" },
  { name: "Boston Consulting Group", role: "She Hacks × BCG X", logo: "/logos/bcg.svg", href: "https://www.bcg.com" },
  { name: "GITEX Africa", role: "Invited startup & pitch", logo: "/logos/gitex-africa.png", logoTone: "dark", href: "https://www.gitexafrica.com" },
  { name: "Ravel Future", role: "AI & Automation Intern", logo: "/logos/ravel.webp", logoTone: "dark", href: "https://www.ravelfuture.com/" },
  { name: "U-Investors", role: "Tech Lead & Junior Analyst", logo: "/logos/u-investors.png", href: "https://u-investors.com/" },
];
