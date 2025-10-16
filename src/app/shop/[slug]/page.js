import { notFound } from "next/navigation";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import AddToCartButton from "@/components/AddToCartButton";
import { getProduct, products } from "@/lib/products";
import ivoryImg from "@/assets/ivory-bloom-30.jpg";
import citrineImg from "@/assets/citrine-flame-30.jpg";
import midnightImg from "@/assets/midnight-cherry-30.jpg";
import ordusoirImg from "@/assets/or-du-soir-30.jpg";
import oudImg from "@/assets/oud-legendaire-30.jpg";

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product Not Found | E V O S T E" };
  return { title: `${product.name} | E V O S T E` };
}

function formatPrice(value, currency = "USD", locale = "en-US") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value ?? 0);
  } catch {
    return `$${Number(value || 0).toFixed(2)}`;
  }
}

export default async function ProductPage({ params }) {
  const baseEnv = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");
  let base = baseEnv;
  if (!base) {
    // This page is server-rendered; construct absolute URL from headers via dynamic fetch
    // Using relative URLs with fetch in Next.js can fail when not in a request context; absolute is safer
    const devDefault = "http://localhost:3000";
    try {
      // Try to infer host from Vercel/Next runtime
      const host = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
      if (host) {
        base = host.startsWith("http") ? host : `https://${host}`;
      } else {
        base = devDefault;
      }
    } catch {
      base = devDefault;
    }
  }
  const res = await fetch(`${base}/api/products/${params.slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return notFound();
  const product = await res.json();

  const imagesBySlug = {
    "citrine-flame": citrineImg,
    "ivory-bloom": ivoryImg,
    "midnight-cherry": midnightImg,
    "or-du-soir": ordusoirImg,
    "oud-legendaire": oudImg,
  };

  const mapped = imagesBySlug[product.slug];
  const imageSrc = product.image || mapped || placeholderB;
  const isStatic = typeof imageSrc !== "string";
  const price = formatPrice(product.price, product.currency || "USD");

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <Reveal variant="scale">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 ring-1 ring-black/5">
            {isStatic ? (
              <Image
                src={imageSrc}
                alt={`${product.name} bottle`}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <img src={imageSrc} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
            )}
            {product.volumes?.map((v, i) => (
              <span key={i} className="absolute top-3 left-3 text-[11px] font-medium px-2 py-1 rounded-full bg-white/20 backdrop-blur-md text-black ring-1 ring-white/30 shadow-sm">
                {v}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal variant="up" delay={80}>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">{product.name}</h1>
            {product.tagline && <p className="text-green-500 mb-4">{product.tagline}</p>}
            {product.description && <p className="mb-6 leading-relaxed">{product.description}</p>}
            {product.notes?.length > 0 && (
              <div className="mb-4">
                <h2 className="font-semibold mb-1">Notes</h2>
                <ul className="flex flex-wrap gap-2 text-sm text-gray-700">
                  {product.notes.map((n) => (
                    <li key={n} className="bg-gray-100 px-2 py-1 rounded">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-2xl font-semibold mb-6">{price}</p>
            <AddToCartButton
              product={product}
              className="px-4 py-2 text-white rounded-xl hover:bg-green-500/50 border-green-500/80 cursor-pointer border bg-green-900/40 transition backdrop-blur-sm hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
    </main>
  );
}
