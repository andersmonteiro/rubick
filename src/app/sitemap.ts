import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...categories.map((cat) => ({
      url: `${SITE_URL}/categoria/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/noticia/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
  ];
}
