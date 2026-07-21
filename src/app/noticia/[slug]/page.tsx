import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import { resolveCoverImage } from "@/lib/cover";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/noticia/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const coverImage = await resolveCoverImage(post);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div
        className={`card-glitch relative mb-8 flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${post.gradient} sm:h-64`}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 640px) 768px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <span className="font-display text-outline text-5xl font-bold uppercase sm:text-7xl">
            {category?.label ?? post.category}
          </span>
        )}
      </div>

      <div className="mb-4 flex items-center gap-3">
        {category && <span className={category.tagClass}>{category.label}</span>}
        <time className="text-xs text-muted">{formatDate(post.date)}</time>
      </div>

      <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
        {post.title}
      </h1>

      <p className="mt-4 text-sm text-muted">Por {post.author}</p>

      <div className="prose prose-invert mt-8 max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-a:text-accent">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
