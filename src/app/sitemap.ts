import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
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
    ...tags.map((tag) => ({
      url: `${SITE_URL}/tag/${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.4,
    })),
  ];
}
