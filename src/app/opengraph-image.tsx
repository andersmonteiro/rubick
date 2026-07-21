import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0a0c",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#f2ff2e",
          }}
        >
          RUBICK
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 58,
            fontWeight: 700,
            color: "#f2f2f0",
            maxWidth: 900,
          }}
        >
          Jogos, Séries, Filmes e Animes
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 26,
            color: "#9a9a9f",
            maxWidth: 800,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size },
  );
}
