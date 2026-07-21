import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getCategory } from "@/lib/categories";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function NewsCard({ post }: { post: PostMeta }) {
  const category = getCategory(post.category);

  return (
    <Link href={`/noticia/${post.slug}`} className="group block">
      <article className="card-glitch h-full overflow-hidden">
        <div
          className={`flex h-36 items-center justify-center bg-gradient-to-br ${post.gradient} border-b border-border`}
        >
          <span className="font-display text-outline text-4xl font-bold uppercase">
            {category?.label ?? post.category}
          </span>
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-center gap-3">
            {category && <span className={category.tagClass}>{category.label}</span>}
            <time className="text-xs text-muted">{formatDate(post.date)}</time>
          </div>

          <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
