"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { items: cartItems, totalQty, totalAmount, incQty, decQty, removeItem, isOpen: isCartOpen, closeCart, toggleCart } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close panels with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        closeCart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl shadow-[0_2px_6px_-1px_rgba(0,0,0,0.08),0_8px_24px_-6px_rgba(0,0,0,0.08)] transition-colors lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-10 py-3">
          {/* Brand */}
            <Link
              href="/"
              className="font-extrabold tracking-wide text-xl sm:text-2xl bg-gradient-to-r from-neutral-900 via-green-700 to-emerald-500 bg-clip-text text-transparent select-none"
            >
              E V O S T E
            </Link>

          <div className="flex items-center gap-2 sm:gap-6">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link
                href="/about"
                className="text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-500 after:transition-all hover:after:w-full"
              >
                About
              </Link>
              <Link
                href="/shop"
                className="text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-500 after:transition-all hover:after:w-full"
              >
                Shop
              </Link>
            </div>

            {/* Cart Button */}
            <div className="relative">
              <button
                className="group relative inline-flex items-center justify-center rounded-full bg-white/60 dark:bg-neutral-800/60 border border-neutral-300/60 dark:border-neutral-700/60 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 p-2 transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 cursor-pointer"
                aria-label="Toggle cart"
                aria-expanded={isCartOpen}
                onClick={toggleCart}
              >
                <svg
                  className="w-5 h-5 text-neutral-700 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h11a1 1 0 0 0 .95-.684l2.1-6.316A1 1 0 0 0 20.1 5H6.1M7 13l-1.5-8H3"
                  />
                  <circle cx="9" cy="19" r="1" />
                  <circle cx="17" cy="19" r="1" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow ">
                  {totalQty}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative inline-flex items-center justify-center rounded-full bg-white/60 dark:bg-neutral-800/60 border border-neutral-300/60 dark:border-neutral-700/60 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 p-2 transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 z-0"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(o => !o)}
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute left-1 right-1 top-2 h-0.5 rounded bg-neutral-800 dark:bg-neutral-200 transition-transform duration-300 ${
                    isMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-1 right-1 top-1/2 -mt-0.5 h-0.5 rounded bg-neutral-800 dark:bg-neutral-200 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-1 right-1 bottom-2 h-0.5 rounded bg-neutral-800 dark:bg-neutral-200 transition-transform duration-300 ${
                    isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 -z-1 bg-black/30 backdrop-blur-sm md:hidden animate-fade-in"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="md:hidden absolute top-full left-0 w-full z-40 origin-top animate-scale-in bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/60 shadow-lg">
              <div className="flex flex-col px-6 py-5 gap-4">
                <Link
                  href="/about"
                  className="font-medium text-neutral-800 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/shop"
                  className="font-medium text-neutral-800 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Cart Slide Over */}
        {isCartOpen && (
          <>
            <div
              className="absolute top-0 inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
              onClick={closeCart}
            />
            <aside className="absolute right-0 top-0 h-screen w-[320px] sm:w-[360px] z-50 bg-white/80 dark:bg-neutral-900/80 border-l border-neutral-200/60 dark:border-neutral-800/60 shadow-xl flex flex-col animate-slide-in">
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-sm">
                <h2 className="font-semibold text-neutral-800 dark:text-neutral-100">
                  Cart
                </h2>
                <button
                  className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 focus:outline-none"
                  onClick={closeCart}
                  aria-label="Close cart"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 backdrop-blur-sm">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.variant || '_'}`} className="flex items-center justify-between gap-3 rounded-md border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-800/40 px-3 py-3 shadow-sm">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate">{item.name}</div>
                      {item.variant && (
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Variant: {item.variant}</div>
                      )}
                      <div className="text-sm text-neutral-700 dark:text-neutral-300">
                        {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : "-"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 rounded border border-neutral-300 hover:bg-neutral-100/20 cursor-pointer text-sm" onClick={() => decQty(item.id, item.variant)}>-</button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button className="px-2 py-1 rounded border border-neutral-300 hover:bg-neutral-100/20 cursor-pointer text-sm" onClick={() => incQty(item.id, item.variant)}>+</button>
                    </div>
                    <button className="text-xs text-red-600 hover:underline cursor-pointer" onClick={() => removeItem(item.id, item.variant)}>Remove</button>
                  </div>
                ))}
                {!cartItems.length && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Your cart is empty.
                  </p>
                )}
              </div>
              <div className="border-t border-neutral-200/60 dark:border-neutral-800/60 p-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-300">Total</span>
                  <span className="font-semibold">
                    {typeof totalAmount === "number" ? `$${totalAmount.toFixed(2)}` : "-"}
                  </span>
                </div>
                <button className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600 text-white font-medium py-2.5 text-sm shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70">
                  Checkout
                </button>
              </div>
            </aside>
          </>
        )}
      </nav>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scaleY(.96) translateY(-4px); }
          100% { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        @keyframes slide-in {
          0% { transform: translateX(30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 160ms ease-out; }
        .animate-scale-in { animation: scale-in 200ms cubic-bezier(.4, .8, .3, 1); transform-origin: top; }
        .animate-slide-in { animation: slide-in 260ms cubic-bezier(.4, .8, .3, 1); }
      `}</style>
    </>
  );
}
