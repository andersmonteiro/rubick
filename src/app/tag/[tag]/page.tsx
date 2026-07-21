import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import { getAllTags, getPostsByTagSlug } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getAllTags().find((t) => t.slug === tagSlug);
  if (!tag) return {};

  const title = `Notícias sobre ${tag.label}`;
  const description = `Todas as matérias sobre ${tag.label} no ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: { canonical: `/tag/${tag.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: tagSlug } = await params;
  const tag = getAllTags().find((t) => t.slug === tagSlug);
  if (!tag) notFound();

  const posts = getPostsByTagSlug(tag.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 border-b border-border pb-4">
        <span className="tag-pill">{tag.label}</span>
        <h1 className="font-display mt-3 text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          Notícias sobre {tag.label}
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">Nenhuma matéria com essa tag ainda.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
