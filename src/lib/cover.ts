import type { PostMeta } from "@/lib/posts";
import { searchMoviePoster, searchTvPoster } from "@/lib/tmdb";
import { searchGameCover } from "@/lib/rawg";

export async function resolveCoverImage(post: PostMeta): Promise<string | null> {
  if (!post.externalQuery) return null;

  switch (post.category) {
    case "jogos":
      return searchGameCover(post.externalQuery);
    case "filmes":
      return searchMoviePoster(post.externalQuery);
    case "series":
      return searchTvPoster(post.externalQuery);
    case "animes":
      return (await searchTvPoster(post.externalQuery)) ?? searchMoviePoster(post.externalQuery);
    default:
      return null;
  }
}
