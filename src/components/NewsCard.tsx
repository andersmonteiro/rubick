import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import { resolveCoverImage } from "@/lib/cover";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function NewsCard({ post }: { post: PostMeta }) {
  const category = getCategory(post.category);
  const coverImage = await resolveCoverImage(post);

  return (
    <Link href={`/noticia/${post.slug}`} className="group block">
      <article className="card-glitch h-full overflow-hidden">
        <div
          className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${post.gradient} border-b border-border`}
        >
          {coverImage ? (
            <Image
              src={coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="font-display text-outline text-4xl font-bold uppercase">
              {category?.label ?? post.category}
            </span>
          )}
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
