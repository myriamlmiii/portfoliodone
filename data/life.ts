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
      "Future Young Writer Award at 16, the youngest recipient (2022). A poetry reading at Dar El Ajaza retirement home. Unpublished French novel: Frénésie.",
    year: "2022",
  },
  {
    title: "DJ Mimi",
    detail: "First female DJ in AUI history (techno / schranz, Numark).",
  },
  {
    title: "Sport",
    detail: "Gold medal, Best Young Local Swimmer, Doukkala (2018). AUI women's futsal.",
  },
];
