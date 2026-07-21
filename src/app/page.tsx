import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import NewsCard from "@/components/NewsCard";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { resolveCoverImage } from "@/lib/cover";

const CAROUSEL_SIZE = 3;

export default async function Home() {
  const allPosts = getAllPosts();
  const heroPostsRaw = allPosts.slice(0, CAROUSEL_SIZE);
  const heroSlugs = new Set(heroPostsRaw.map((p) => p.slug));
  const heroPosts = await Promise.all(
    heroPostsRaw.map(async (post) => ({
      ...post,
      coverImage: await resolveCoverImage(post),
    })),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {heroPosts.length > 0 && (
        <section className="mb-14">
          <HeroCarousel posts={heroPosts} />
        </section>
      )}

      {categories.map((cat) => {
        const posts = allPosts
          .filter((p) => p.category === cat.slug && !heroSlugs.has(p.slug))
          .slice(0, 3);

        if (posts.length === 0) return null;

        return (
          <section key={cat.slug} className="mb-14">
            <div className="mb-5 flex items-end justify-between border-b border-border pb-3">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                {cat.label}
              </h2>
              <Link
                href={`/categoria/${cat.slug}`}
                className="font-display text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:text-accent"
              >
                Ver tudo →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <NewsCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
