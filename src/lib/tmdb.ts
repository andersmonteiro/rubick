const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

interface TmdbSearchResult {
  poster_path: string | null;
}

interface TmdbSearchResponse {
  results: TmdbSearchResult[];
}

async function searchTmdb(
  type: "movie" | "tv",
  query: string,
): Promise<string | null> {
  const token = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      `${TMDB_API_BASE}/search/${type}?query=${encodeURIComponent(query)}&language=pt-BR&page=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 * 60 * 24 * 7 },
      },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as TmdbSearchResponse;
    const posterPath = data.results?.[0]?.poster_path;
    return posterPath ? `${TMDB_IMAGE_BASE}${posterPath}` : null;
  } catch {
    return null;
  }
}

export function searchMoviePoster(query: string): Promise<string | null> {
  return searchTmdb("movie", query);
}

export function searchTvPoster(query: string): Promise<string | null> {
  return searchTmdb("tv", query);
}
