import Link from "next/link";
import { categories } from "@/lib/categories";
import { SITE_NAME } from "@/lib/site";

const legalLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/privacidade", label: "Privacidade" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold tracking-wide">
              {SITE_NAME.slice(0, -1)}
              <span className="text-accent">{SITE_NAME.slice(-1)}</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Cobertura de jogos, séries, filmes e animes.
            </p>
          </div>

          <div className="flex gap-10">
            <div>
              <p className="font-display mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                Categorias
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
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

            <div>
              <p className="font-display mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                Site
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
            reservados.
          </p>
          <a
            href="/rss.xml"
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
