import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

export const revalidate = 60;

export async function GET(_request, { params }) {
  const { slug } = params || {};
  const item = getProduct(slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}
