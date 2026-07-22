import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça o ${SITE_NAME}, cobertura de jogos, séries, filmes e animes.`,
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          Sobre o {SITE_NAME}
        </h1>
      </div>

      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-a:text-accent">
        <p>
          O <strong>{SITE_NAME}</strong> é um site de notícias dedicado a
          jogos, séries, filmes e animes. Cobrimos lançamentos, adiamentos,
          trailers, bilheteria e tudo que move o mundo do entretenimento —
          com matérias curtas, diretas e sempre baseadas em fontes reais.
        </p>

        <h2>Como produzimos o conteúdo</h2>
        <p>
          Cada matéria é pesquisada e escrita a partir de fontes públicas e
          verificáveis antes da publicação. Usamos ferramentas de pesquisa e
          escrita assistida por IA como parte do processo, mas todo o
          conteúdo é revisado antes de ir para o ar.
        </p>

        <h2>Imagens</h2>
        <p>
          As capas de filmes e séries são fornecidas pela{" "}
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            TMDB
          </a>
          , e as capas de jogos pela{" "}
          <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer">
            RAWG
          </a>
          . Este produto usa a API do TMDB, mas não é endossado ou
          certificado pelo TMDB.
        </p>

      </div>
    </div>
  );
}
