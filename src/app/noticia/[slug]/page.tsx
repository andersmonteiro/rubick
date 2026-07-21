import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getPostsByCategory, slugifyTag } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import { resolveCoverImage } from "@/lib/cover";
import { formatDate } from "@/lib/date";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import YouTubeEmbed from "@/components/mdx/YouTubeEmbed";
import MdxImage from "@/components/mdx/MdxImage";
import ShareButtons from "@/components/ShareButtons";
import NewsCard from "@/components/NewsCard";

const mdxComponents = { YouTubeEmbed, img: MdxImage };

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
  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const postUrl = `${SITE_URL}/noticia/${post.slug}`;
  const schemaImage = coverImage ?? `${SITE_URL}/noticia/${post.slug}/opengraph-image`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: [schemaImage],
    datePublished: post.date,
    dateModified: post.date,
    author: [{ "@type": "Organization", name: post.author }],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <time className="text-xs text-muted">
          {formatDate(post.date, { day: "2-digit", month: "long", year: "numeric" })}
        </time>
      </div>

      <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
        {post.title}
      </h1>

      <p className="mt-4 text-sm text-muted">Por {post.author}</p>

      <div className="prose prose-invert mt-8 max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-a:text-accent">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      {post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${slugifyTag(tag)}`}
              className="border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted transition-colors hover:border-accent hover:text-accent"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 border-y border-border py-6">
        <ShareButtons url={postUrl} title={post.title} />
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between border-b border-border pb-3">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              Leia também
            </h2>
            {category && (
              <Link
                href={`/categoria/${category.slug}`}
                className="font-display text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:text-accent"
              >
                Ver tudo →
              </Link>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <NewsCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
