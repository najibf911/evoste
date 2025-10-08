import ReviewsCarousel from "@/components/ReviewsCarousel";
import FadeImage from "@/components/FadeImage";
import Reveal from "@/components/Reveal";
import heroImage from "@/assets/parfum-evoste.png";
import pageImage from "@/assets/parfum-evoste2.png";

export default function Home() {
  return (
    <main className="bg-black">
      <section
        id="home"
        className="relative flex items-center justify-center h-[90vh] overflow-hidden"
      >
        <FadeImage
          src={heroImage}
          alt="Evoste fragrance hero"
          placeholder="blur"
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
          duration={900}
        />
        <div className="absolute inset-0" />
        <div className="relative text-center px-4">
          <Reveal once>
            <h1 className="text-5xl md:text-7xl font-bold tracking-widest text-white drop-shadow">
              E V O S T E
            </h1>
          </Reveal>
          <Reveal delay={120} once>
            <p className="mt-4 text-lg md:text-xl text-white/80">
              Your scent. Their memory. Forever.
            </p>
          </Reveal>
          <Reveal delay={240} once>
            <a
              href="#about"
              className="inline-block mt-8 rounded-full bg-white/10 border border-white/30 backdrop-blur px-8 py-3 text-sm font-medium text-white hover:bg-white/20 transition"
            >
              Discover More
            </a>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="py-24 bg-[#e5e7eb]"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <Reveal once>
            <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight mb-6">
              About Us
            </h2>
          </Reveal>
          <Reveal delay={120} once>
            <p className="text-lg leading-relaxed text-gray-700">
              EVOSTE is more than a fragrance brand – it is a journey through
              the senses. Each bottle holds a curated collection of exclusive
              scents, inspired by deep emotions, unforgettable moments, and the
              untamed richness of nature. From the warmth of sunlit blossoms to
              the mystery of twilight woods, every note is carefully crafted to
              evoke feeling and memory.
              <br />
              <br />
              Our fragrances are a tribute to elegance, authenticity, and
              individuality – designed for those who desire more than just
              perfume. They are for those who seek connection, presence, and
              identity in every spritz. With EVOSTE, scent becomes a signature,
              a statement, and a story.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <Reveal once>
            <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight mb-6">
              Why Choose EVOSTE?
            </h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 items-center text-gray-700 cursor-default">
            {[
              "Fast-moving, emotional luxury product",
              "High profit margins",
              "Eye-catching, premium packaging",
              "Strong brand storytelling (easy to market)",
              "Full support: marketing kit, training, fast delivery",
              "BPOM-ready & trusted ingredients",
            ].map((item, i) => (
              <Reveal
                key={item}
                delay={i * 80}
                once
                as="li"
                className="flex gap-3 rounded-lg border items-start border-gray-200 bg-gray-50/60 p-4 text-sm hover:shadow-sm transition"
                initialClass="opacity-0 translate-y-3"
                showClass="opacity-100 translate-y-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-green-600 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.25a1 1 0 0 1-1.423.01L3.29 9.153a1 1 0 1 1 1.42-1.408l3.08 3.109 6.49-6.54a1 1 0 0 1 1.424-.024z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Image */}
      <section className="relative h-96 md:h-[500px] lg:h-[600px]">
        <FadeImage
          src={pageImage}
          alt="Evoste fragrance page"
          placeholder="blur"
          priority
          fill
          sizes="100vw"
          className="object-cover object-center"
          duration={900}
        />
      </section>

      <section>
        <Reveal once>
          <ReviewsCarousel />
        </Reveal>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal once>
            <h3 className="text-xl text-black font-semibold mb-4">
              Suggested Retail Price (SRP)
            </h3>
          </Reveal>
          <Reveal delay={120} once>
            <div className="inline-block rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-medium">30ml</span> = Rp 199.000 <br />
                <span className="font-medium">50ml</span> = Rp 299.000
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-b from-gray-50 to-gray-100"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Reveal once>
            <h2 className="text-3xl md:text-4xl font-semibold italic text-black tracking-tight mb-6">
              Ready to Start Your EVOSTE Journey?
            </h2>
            <p className="text-gray-700 mb-6">
              Join our fast-growing Reseller network. DM us or contact us on
              WhatsApp to get started. We can't wait to welcome you to the
              EVOSTE family!
            </p>
          </Reveal>
          <Reveal delay={120} once>
            <div className="inline-block rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                MOQ: 12 pcs | 24 pcs | 48 pcs
                <br />
                Email:{" "}
                <a href="mailto:info@evoste.com" className="text-blue-600">
                  info@evoste.com
                </a>{" "}
                <br />
                Phone:{" "}
                <a href="tel:+62123456789" className="text-blue-600">
                  +62 123 456 789
                </a>
                <br />
                Worldwide Shipping Available.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
