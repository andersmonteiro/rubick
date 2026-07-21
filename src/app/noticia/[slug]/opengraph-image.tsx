import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { getCategory } from "@/lib/categories";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT_BY_CATEGORY: Record<string, string> = {
  jogos: "#f2ff2e",
  series: "#7cf2ff",
  filmes: "#ff2e4d",
  animes: "#b98bff",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const category = post ? getCategory(post.category) : undefined;
  const accent = (post && ACCENT_BY_CATEGORY[post.category]) || "#f2ff2e";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0a0a0c",
          padding: "70px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 60,
            right: 70,
            fontSize: 90,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#1c1c20",
            textTransform: "uppercase",
          }}
        >
          {category?.label ?? ""}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            color: "#0a0a0c",
            background: accent,
            padding: "8px 20px",
            alignSelf: "flex-start",
            textTransform: "uppercase",
          }}
        >
          {category?.label ?? ""}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#f2f2f0",
            maxWidth: 1000,
          }}
        >
          {post?.title ?? "Rubick"}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#9a9a9f",
          }}
        >
          RUBICK
        </div>
      </div>
    ),
    { ...size },
  );
}
