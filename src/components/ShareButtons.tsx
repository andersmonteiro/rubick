"use client";

import { useState } from "react";

type CopyState = "idle" | "copied" | "error";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    } finally {
      setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  return (
    <div>
      <span className="font-display block text-xs font-semibold uppercase tracking-wide text-muted">
        Compartilhar
      </span>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bracket btn-bracket-outline justify-center text-center"
        >
          WhatsApp
        </a>
        <a
          href={twitterHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bracket btn-bracket-outline justify-center text-center"
        >
          X
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-bracket btn-bracket-outline justify-center text-center"
        >
          {copyState === "copied"
            ? "Copiado!"
            : copyState === "error"
              ? "Erro"
              : "Copiar link"}
        </button>
      </div>
    </div>
  );
}
