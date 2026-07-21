export const SITE_NAME = "Rubick";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "Notícias, lançamentos e coberturas sobre jogos, séries, filmes e animes.";
