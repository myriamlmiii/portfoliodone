import type { EducationEntry } from "@/types";

export const education: readonly EducationEntry[] = [
  {
    id: "aui",
    school: "Al Akhawayn University (AUI)",
    degree: "B.S. in Computer Science, concentration in AI & Big Data Analytics; minor in Business Administration",
    location: "Ifrane, Morocco",
    dateRange: "2022 to December 2026",
    logo: "/logos/aui.png",
    logoTone: "light",
    highlights: [
      "Merit Scholarship (60%)",
      "Dean's List, Spring 2024 and Fall 2025",
      "Held six campus roles across research, teaching, peer mentoring, international-student support, and student services",
    ],
    projects: ["rag-class-assistant"],
  },
  {
    id: "ufv",
    school: "University of the Fraser Valley (UFV)",
    degree: "Bilateral exchange semester, machine learning, NLP, and finance",
    location: "British Columbia, Canada",
    dateRange: "Sep to Dec 2025",
    logo: "/logos/ufv.svg",
    logoTone: "dark",
    highlights: [
      "First exchange student from AUI (Morocco) at UFV",
      "1st place, UFV Community Ideation Jam 2025",
      "Presented research at BC Cancer Research Day 2025, Vancouver",
    ],
    projects: ["meeting-intelligence-system", "agriverse"],
  },
];
