import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product Not Found | E V O S T E" };
  return { title: `${product.name} | E V O S T E` };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square w-full bg-gray-200 flex items-center justify-center text-gray-500">
          image
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.tagline}</p>
          <p className="mb-6 leading-relaxed">{product.description}</p>
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Notes</h2>
            <ul className="flex flex-wrap gap-2 text-sm text-gray-700">
              {product.notes.map(n => (
                <li key={n} className="bg-gray-100 px-2 py-1 rounded">{n}</li>
              ))}
            </ul>
          </div>
          <p className="text-xl font-semibold mb-6">${product.price}</p>
          <button className="px-5 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-500 text-sm font-medium">Add to Cart</button>
        </div>
      </div>
    </main>
  );
}
