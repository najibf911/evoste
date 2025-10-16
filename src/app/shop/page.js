import React, { Suspense } from "react";
import { headers } from "next/headers";
import ShopContent from "@/components/ShopContent";

export const metadata = {
  title: "Shop",
  description: "Browse our latest products with prices, images, and quick actions.",
  openGraph: {
    title: "Shop",
    description: "Browse our latest products with prices, images, and quick actions.",
    url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/shop",
    type: "website"
  }
};

function getLocale() {
  const h = headers();
  const accept = h.get("accept-language") || "en-US";
  return accept.split(",")[0] || "en-US";
}

function formatPrice(value, currency = "USD", locale = "en-US") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value ?? 0);
  } catch {
    return `$${Number(value || 0).toFixed(2)}`;
  }
}

async function getProducts() {
  // Adjust the API path if your products endpoint differs
  const baseEnv = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");
  let base = baseEnv;
  if (!base) {
    const h = headers();
    const host = h.get("host") || "localhost:3000";
    const proto = process.env.NODE_ENV === "development" ? "http" : "https";
    base = `${proto}://${host}`;
  }
  const res = await fetch(`${base}/api/products`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : data.products || [];
}

function ProductsSkeleton() {
  const items = Array.from({ length: 8 });
  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
      {items.map((_, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
          <div style={{ background: "#f2f2f2", height: 160, borderRadius: 6 }} />
          <div style={{ height: 12, width: "70%", background: "#f2f2f2", marginTop: 12, borderRadius: 6 }} />
          <div style={{ height: 12, width: "40%", background: "#f2f2f2", marginTop: 8, borderRadius: 6 }} />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <div style={{ height: 32, flex: 1, background: "#f2f2f2", borderRadius: 6 }} />
            <div style={{ height: 32, width: 80, background: "#f2f2f2", borderRadius: 6 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product, locale }) {
  const price = formatPrice(product.price, product.currency || "USD", locale);
  return (
    <article style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
      <a href={`/shop/${product.slug || product.id || ""}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6, background: "#fafafa" }}
          loading="lazy"
        />
        <h3 style={{ margin: "10px 0 4px", fontSize: 16 }}>{product.name}</h3>
      </a>
      <p style={{ margin: 0, color: "#444" }}>{price}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <a
          href={`/shop/${product.slug || product.id || ""}`}
          style={{
            display: "inline-block",
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 6,
            textDecoration: "none",
            color: "#111",
            background: "#fff"
          }}
        >
          Quick view
        </a>
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Wire this to your cart action"
          style={{
            padding: "8px 12px",
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
            borderRadius: 6,
            cursor: "not-allowed",
            opacity: 0.6
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

async function ProductsSection({ locale }) {
  const products = await getProducts();
  return <ShopContent products={products} locale={locale} />;
}

export default async function Page() {
  const locale = getLocale();
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsSection locale={locale} />
      </Suspense>
    </main>
  );
}
