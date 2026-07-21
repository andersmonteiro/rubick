"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/lib/categories";

export default function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="carousel-nav flex"
      >
        <span className="relative block h-3 w-4">
          <span
            className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${
              open ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[5px] h-0.5 w-4 bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[10px] h-0.5 w-4 bg-current transition-transform ${
              open ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-3">
          <ul className="flex flex-col">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categoria/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="font-display block px-2 py-3 text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-accent"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
