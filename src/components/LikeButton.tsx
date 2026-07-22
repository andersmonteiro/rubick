"use client";

import { useEffect, useState } from "react";

function getClientId(): string {
  const key = "rubick_client_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clientId = getClientId();
    fetch(`/api/like/${slug}?clientId=${encodeURIComponent(clientId)}`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count ?? 0);
        setLiked(Boolean(data.liked));
      })
      .catch(() => {
        setCount(0);
      });
  }, [slug]);

  async function handleLike() {
    if (liked || loading) return;
    setLoading(true);
    try {
      const clientId = getClientId();
      const res = await fetch(`/api/like/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId }),
      });
      const data = await res.json();
      setCount(data.count ?? count);
      setLiked(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={liked || loading}
      style={liked ? { color: "var(--accent)", borderColor: "var(--accent)" } : undefined}
      className="btn-bracket btn-bracket-outline disabled:cursor-default"
    >
      {liked ? "♥" : "♡"} Curtir{count !== null ? ` (${count})` : ""}
    </button>
  );
}
