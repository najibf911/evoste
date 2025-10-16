"use client";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ivoryImg from "@/assets/ivory-bloom-30.jpg";
import citrineImg from "@/assets/citrine-flame-30.jpg";
import midnightImg from "@/assets/midnight-cherry-30.jpg";
import ordusoirImg from "@/assets/or-du-soir-30.jpg";
import oudImg from "@/assets/oud-legendaire-30.jpg";
import placeholderB from "@/assets/parfum-evoste2.png";

function formatPrice(value, currency = "USD", locale = "en-US") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value ?? 0);
  } catch {
    return `$${Number(value || 0).toFixed(2)}`;
  }
}

export default function ShopContent({ products = [], locale = "en-US" }) {
  const imagesBySlug = {
    "citrine-flame": citrineImg,
    "ivory-bloom": ivoryImg,
    "midnight-cherry": midnightImg,
    "or-du-soir": ordusoirImg,
    "oud-legendaire": oudImg,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Reveal as="h1" variant="up" className="text-4xl md:text-5xl font-extrabold text-center tracking-tight  mb-10">
        Shop
      </Reveal>
      <Reveal as="p" variant="fade" delay={80} className="text-center text-gray-200 mb-10">
        Discover our products. Prices are formatted for your locale.
      </Reveal>

      {(!products || products.length === 0) ? (
        <div className="text-center py-16 text-gray-200">No products found.</div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => {
            const slug = p.slug || p.id || "";
            const price = formatPrice(p.price, p.currency || "USD", locale);
            const mapped = imagesBySlug[slug];
            const imageSrc = p.image || mapped || placeholderB;
            const isStatic = typeof imageSrc !== "string"; // static import vs URL/string

            const rawVolume = p.volumes;
            const volumeLabels = (() => {
              if (!rawVolume) return [];
              const list = Array.isArray(rawVolume)
              ? rawVolume
              : typeof rawVolume === "object"
              ? Object.keys(rawVolume)
              : [rawVolume];
              return list.map((v) => {
              const s = String(v).trim();
              return /^\d+$/.test(s) ? `${s}ml` : s;
              });
            })();

            return (
              <Reveal key={slug || p.name || i} variant="up" delay={i * 80}>
              <a
                href={`/shop/${slug}`}
                className="group rounded-2xl ring-1 ring-black/5 bg-white/80 backdrop-blur p-5 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 mb-4">
                {isStatic ? (
                  <Image
                  src={imageSrc}
                  alt={`${p.name} bottle`}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <img
                  src={imageSrc}
                  alt={p.name}
                  className="h-full w-full object-cover  transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  />
                )}
                {volumeLabels.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {volumeLabels.map((label, idx) => (
                    <span
                    key={idx}
                    className="text-[11px] font-medium px-2 py-1 rounded-full bg-black/70 text-white"
                    >
                    {label}
                    </span>
                  ))}
                  </div>
                )}
                </div>

                <h2 className="font-semibold text-lg group-hover:underline text-black tracking-tight">{p.name}</h2>
                {p.tagline && (
                <p className="text-sm text-gray-500 mb-3">{p.tagline}</p>
                )}

                <div className="mt-auto flex items-center justify-between">
                <p className="font-semibold text-black">{price}</p>
                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition">View details →</span>
                </div>
              </a>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
