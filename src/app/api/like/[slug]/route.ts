import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getPostBySlug } from "@/lib/posts";

function likesKey(slug: string) {
  return `likes:${slug}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getPostBySlug(slug)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const clientId = request.nextUrl.searchParams.get("clientId");
  const key = likesKey(slug);

  const [count, liked] = await Promise.all([
    redis.scard(key),
    clientId ? redis.sismember(key, clientId) : Promise.resolve(0),
  ]);

  return NextResponse.json({ count, liked: Boolean(liked) });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getPostBySlug(slug)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const clientId = body?.clientId;
  if (typeof clientId !== "string" || clientId.length < 8 || clientId.length > 100) {
    return NextResponse.json({ error: "invalid_client_id" }, { status: 400 });
  }

  const key = likesKey(slug);
  await redis.sadd(key, clientId);
  const count = await redis.scard(key);

  return NextResponse.json({ count, liked: true });
}
