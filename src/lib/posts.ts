import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CategorySlug } from "@/lib/categories";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  category: CategorySlug;
  date: string;
  excerpt: string;
  author: string;
  featured: boolean;
  gradient: string;
  externalQuery: string | null;
  tags: string[];
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export interface Post extends PostMeta {
  content: string;
}

function readAllFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllPosts(): Post[] {
  const files = readAllFiles();

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title as string,
      category: data.category as CategorySlug,
      date: data.date as string,
      excerpt: data.excerpt as string,
      author: (data.author as string) ?? "Redação Rubick",
      featured: Boolean(data.featured),
      gradient: (data.gradient as string) ?? "from-accent/30 via-surface to-surface",
      externalQuery: (data.externalQuery as string) ?? null,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      content,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPost(): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}

export interface TagInfo {
  slug: string;
  label: string;
}

export function getAllTags(): TagInfo[] {
  const bySlug = new Map<string, string>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      if (!bySlug.has(slug)) bySlug.set(slug, tag);
    }
  }

  return Array.from(bySlug.entries())
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getPostsByTagSlug(tagSlug: string): Post[] {
  return getAllPosts().filter((p) => p.tags.some((t) => slugifyTag(t) === tagSlug));
}
