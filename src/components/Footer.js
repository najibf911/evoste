import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-20 lg:px-20 lg:pt-20 lg:pb-5  p-4 bg-black text-white mt-8">
      <div className="flex items-center text-center lg:text-left flex-col lg:items-start lg:flex-row justify-center lg:justify-between gap-10">
        {/* Footer Branding */}
        <div className="mx-4 flex flex-col items-between gap-2">
          <Link href="/" className="text-5xl font-bold">
            E V O S T E
          </Link>
          <p className="italic stretch">Your scent. Their memory. Forever.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
          {/* Our Products */}
          <div className="mx-4 flex flex-col gap-1">
            <h3 className="font-semibold text-lg mb-2 lg:mb-4 cursor-default">Our Products</h3>
            <Link href="/shop/midnight-cherry" className="hover:text-green-500">
              Midnight Cherry
            </Link>
            <Link href="/shop/ivory-bloom" className="hover:text-green-500">
              Ivory Bloom
            </Link>
            <Link href="/shop/citrine-flame" className="hover:text-green-500">
              Citrine Flame
            </Link>
            <Link href="/shop/or-du-soir" className="hover:text-green-500">
              Or Du Soir
            </Link>
            <Link href="/shop/oud-legendaire" className="hover:text-green-500">
              Oud Legendaire
            </Link>
          </div>
          {/* Contact */}
          <div className="mx-4 flex flex-col gap-1">
            <h3 className="font-semibold text-lg mb-2 lg:mb-4 cursor-default">Contact</h3>
            <a href="tel:+6287777745791" className="hover:text-green-500">
              (+62) 877-7774-5791
            </a>
            <a
              href="https://instagram.com/evosteofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
            >
              @evosteofficial
            </a>
            <p className="text-sm cursor-default text-gray-300">
              Worldwide shipment
            </p>
          </div>
        </div>
      </div>

      <div className=" mx-4">
        <p className="text-sm text-center lg:text-right text-gray-400 cursor-default">
          &copy; {new Date().getFullYear()} E V O S T E. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
