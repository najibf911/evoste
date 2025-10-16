import Image from "next/image";
import AboutImage from "@/assets/parfume-citrine-2.jpg";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About | E V O S T E",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal as="h1" variant="up" className="text-4xl md:text-5xl font-extrabold text-center tracking-tight bg-clip-text text-black">
          About Us
        </Reveal>

        <div className="mt-12 lg:mx-24 grid gap-10 grid-cols-1 ">
          <Reveal className="relative group" variant="scale" delay={100}>
            <div
              className="absolute -inset-2 rounded-2xl blur opacity-60 group-hover:opacity-100 transition"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-xl">
              <Image
                src={AboutImage}
                alt="Parfume Citrine"
                loading="lazy"
                placeholder="blur"
                width={800}
                height={600}
                // quality={85}
                // sizes="(min-width: 1024px) 48vw, (min-width: 768px) 70vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <p className="text-lg lg:mt-12 text-justify leading-relaxed text-gray-700">
              EVOSTE is more than a fragrance brand – it is a journey through the senses.
              Each bottle holds a curated collection of exclusive scents, inspired by
              deep emotions, unforgettable moments, and the untamed richness of
              nature. From the warmth of sunlit blossoms to the mystery of twilight
              woods, every note is carefully crafted to evoke feeling and memory.
              <br />
              <br />
              Our fragrances are a tribute to elegance, authenticity, and individuality –
              designed for those who desire more than just perfume. They are for those
              who seek connection, presence, and identity in every spritz. With
              EVOSTE, scent becomes a signature, a statement, and a story.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
