import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold tracking-wide">
              RUBIC<span className="text-accent">K</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Cobertura de jogos, séries, filmes e animes. Este site é um
              projeto de demonstração e o conteúdo publicado é fictício.
            </p>
          </div>

          <div className="flex gap-8">
            <div>
              <p className="font-display mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                Categorias
              </p>
              <ul className="space-y-1 text-sm">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/categoria/${cat.slug}`}
                      className="text-foreground/80 transition-colors hover:text-accent"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} Rubick. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
