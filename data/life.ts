export interface LifeItem {
  title: string;
  detail: string;
  year?: string;
  logo?: string;
}

export const life: readonly LifeItem[] = [
  { title: "Writer", detail: "Future Young Writer Award at 16. Unpublished French novel, Frénésie.", year: "2022" },
  { title: "Music", detail: "First female DJ in AUI history. Techno / schranz." },
  { title: "Volunteer", detail: "Lions Club, ALCS, Scholars of Sustenance." },
];
