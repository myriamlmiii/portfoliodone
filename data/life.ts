export interface LifeItem {
  title: string;
  detail: string;
  year?: string;
  logo?: string;
}

export const life: readonly LifeItem[] = [
  {
    title: "Writer",
    detail:
      "Future Young Writer Award, youngest recipient at 16 (2022), grant from Groupe Scolaire Lange Bleu. I organized a poetry reading at Dar El Ajaza retirement home with that grant. Unpublished French novel: Frénésie.",
    year: "2022",
  },
  {
    title: "DJ Mimi & campus life",
    detail:
      "First female DJ in AUI history (techno / schranz, Numark). Elected to the Student Government Association (2024). Guitar and piano in the AUI auditorium.",
  },
  {
    title: "Sororities",
    logo: "/logos/phi-nu.png",
    detail:
      "Founded Phi Nu, AUI's first sorority, from scratch in 2026; 50 members joined. Previously initiated the Alpha Pi Phi Cygnet Chapter chartering process at UFV (2025).",
  },
  {
    title: "Languages",
    detail:
      "Arabic (native). French: DALF C1 and DELF B2 (93/100). English: IELTS Band 7 and TOEFL (AUI). I work, teach, and write across all three.",
  },
  {
    title: "Volunteer",
    detail:
      "Lions Club medical campaigns in rural Morocco. Hands in Hands humanitarian caravans. ALCS HIV/AIDS and women-focused prevention. AUI graduation (1,250+ attendees). BC Cancer Research Day volunteer. Scholars of Sustenance food rescue in Bangkok. IOSN Ifrane.",
  },
  {
    title: "Sport",
    detail:
      "Futsal and swimming. Gold medal, Best Young Local Swimmer, Doukkala (2018). AUI women's futsal team, 3rd place at the Cubs Tournament (May 2023).",
  },
];
