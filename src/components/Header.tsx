import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-2xl font-bold tracking-wide">
          RUBIC<span className="text-accent">K</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="font-display px-3 py-2 text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
