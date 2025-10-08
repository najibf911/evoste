"use client";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function Navbar() {
  // Optional: replace with props / context
  const demoCartItems = [
    { id: 1, name: "Product A", qty: 1 },
    { id: 2, name: "Product B", qty: 2 },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Close panels with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cartItems = demoCartItems; // swap with real data

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
                onClick={() => setIsCartOpen(o => !o)}
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
                  {cartItems.reduce((s, i) => s + i.qty, 0)}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative inline-flex items-center justify-center rounded-full bg-white/60 dark:bg-neutral-800/60 border border-neutral-300/60 dark:border-neutral-700/60 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 p-2 transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
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
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden animate-fade-in"
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
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
              onClick={() => setIsCartOpen(false)}
            />
            <aside className="fixed right-0 top-0 h-screen w-[320px] sm:w-[360px] z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-l border-neutral-200/60 dark:border-neutral-800/60 shadow-xl flex flex-col animate-slide-in">
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
                <h2 className="font-semibold text-neutral-800 dark:text-neutral-100">
                  Cart
                </h2>
                <button
                  className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 focus:outline-none"
                  onClick={() => setIsCartOpen(false)}
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
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-md border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-800/40 px-3 py-3 shadow-sm"
                  >
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      {item.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      x{item.qty}
                    </span>
                  </div>
                ))}
                {!cartItems.length && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Your cart is empty.
                  </p>
                )}
              </div>
              <div className="border-t border-neutral-200/60 dark:border-neutral-800/60 p-5">
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
