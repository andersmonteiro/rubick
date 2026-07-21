"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getCategory } from "@/lib/categories";

const AUTOPLAY_MS = 6000;

export default function HeroCarousel({ posts }: { posts: PostMeta[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => setIndex((i + posts.length) % posts.length),
    [posts.length],
  );

  useEffect(() => {
    if (paused || posts.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % posts.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, posts.length]);

  if (posts.length === 0) return null;

  const post = posts[index];
  const category = getCategory(post.category);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <article
        key={post.slug}
        className={`card-glitch animate-fade-in relative flex h-[380px] flex-col justify-end overflow-hidden bg-gradient-to-br ${post.gradient} p-6 sm:h-[420px] sm:p-10`}
      >
        <span className="font-display text-outline pointer-events-none absolute right-4 top-4 text-5xl font-bold uppercase opacity-40 sm:text-7xl">
          {category?.label ?? post.category}
        </span>

        <div className="relative">
          {category && <span className={category.tagClass}>{category.label}</span>}
          <h1 className="font-display mt-4 line-clamp-3 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
            <Link href={`/noticia/${post.slug}`} className="transition-colors hover:text-accent">
              {post.title}
            </Link>
          </h1>
          <p className="mt-4 line-clamp-2 max-w-xl text-sm text-muted sm:text-base">{post.excerpt}</p>
          <Link href={`/noticia/${post.slug}`} className="btn-bracket mt-6 inline-flex">
            Ler matéria
          </Link>
        </div>

        {posts.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Notícia anterior"
              onClick={() => goTo(index - 1)}
              className="carousel-nav absolute bottom-6 right-20 hidden sm:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Próxima notícia"
              onClick={() => goTo(index + 1)}
              className="carousel-nav absolute bottom-6 right-6 hidden sm:flex"
            >
              ›
            </button>
          </>
        )}
      </article>

      {posts.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {posts.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Ir para notícia ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 w-8 transition-colors ${
                i === index ? "bg-accent" : "bg-border hover:bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
