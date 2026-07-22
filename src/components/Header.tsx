import Link from "next/link";
import { categories } from "@/lib/categories";
import MobileNav from "@/components/MobileNav";
import { SITE_NAME } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-2xl font-bold tracking-wide">
          {SITE_NAME.slice(0, -1)}
          <span className="text-accent">{SITE_NAME.slice(-1)}</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex sm:gap-2">
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

        <MobileNav categories={categories} />
      </div>
    </header>
  );
}
