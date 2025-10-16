import { NextResponse } from "next/server";
import { products } from "@/lib/products";

// Revalidate this route every 60 seconds (ISR for fetches with cache)
export const revalidate = 60;

export async function GET(request) {
  // Optional: support query ?slug=... to fetch a single product via this endpoint
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (slug) {
    const item = products.find((p) => p.slug === slug);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  }

  return NextResponse.json(products);
}
