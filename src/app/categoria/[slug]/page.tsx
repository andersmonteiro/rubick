import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import { categories, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const title = `Notícias de ${category.label}`;
  const description = `Últimas notícias, lançamentos e coberturas de ${category.label.toLowerCase()} no ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: { canonical: `/categoria/${category.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 border-b border-border pb-4">
        <span className={category.tagClass}>{category.label}</span>
        <h1 className="font-display mt-3 text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          Notícias de {category.label}
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">Nenhuma matéria publicada nesta categoria ainda.</p>
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
