import Link from "next/link";
import { products } from "@/lib/products";

export const metadata = { title: "Shop | E V O S T E" };

export default function ShopPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <Link
            key={p.slug}
            href={`/shop/${p.slug}`}
            className="group border rounded-lg p-5 hover:shadow transition flex flex-col"
          >
            <div className="aspect-square w-full bg-gray-200 mb-4 flex items-center justify-center text-gray-500 text-sm">
              img
            </div>
            <h2 className="font-semibold text-lg group-hover:underline">{p.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{p.tagline}</p>
            <p className="mt-auto font-medium">${p.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
