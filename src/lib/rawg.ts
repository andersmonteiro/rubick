const RAWG_API_BASE = "https://api.rawg.io/api";

interface RawgSearchResult {
  background_image: string | null;
}

interface RawgSearchResponse {
  results: RawgSearchResult[];
}

export async function searchGameCover(query: string): Promise<string | null> {
  const apiKey = process.env.RAWG_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `${RAWG_API_BASE}/games?key=${apiKey}&search=${encodeURIComponent(query)}&page_size=1`,
      { next: { revalidate: 60 * 60 * 24 * 7 } },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as RawgSearchResponse;
    return data.results?.[0]?.background_image ?? null;
  } catch {
    return null;
  }
}
