export type CategorySlug = "jogos" | "series" | "filmes" | "animes";

export interface Category {
  slug: CategorySlug;
  label: string;
  tagClass: string;
}

export const categories: Category[] = [
  { slug: "jogos", label: "Jogos", tagClass: "tag-pill" },
  { slug: "series", label: "Séries", tagClass: "tag-pill tag-pill-series" },
  { slug: "filmes", label: "Filmes", tagClass: "tag-pill tag-pill-filmes" },
  { slug: "animes", label: "Animes", tagClass: "tag-pill tag-pill-animes" },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
