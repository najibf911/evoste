"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

function storageAvailable() {
  try {
    const test = "__cart_test__";
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (!storageAvailable()) return;
    try {
      const raw = window.localStorage.getItem("cart:items");
      if (raw) {
        const parsed = JSON.parse(raw);
        const normalized = Array.isArray(parsed)
          ? parsed.map((i) => ({
              ...i,
              qty: typeof i.qty === "number" ? i.qty : Number(i.qty) || 1,
              price: typeof i.price === "number" ? i.price : Number(i.price) || 0,
            }))
          : [];
        setItems(normalized);
      }
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!storageAvailable()) return;
    try {
      window.localStorage.setItem("cart:items", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (item) => {
    // item: { id, name, price, qty=1, image?, variant? }
    setItems((prev) => {
      const key = `${item.id || item.slug || item.name}-${item.variant || "_"}`;
      const idx = prev.findIndex((i) => `${i.id}-${i.variant || "_"}` === key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (next[idx].qty || 1) + (item.qty || 1) };
        return next;
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const removeItem = (id, variant) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && (i.variant || "_") === (variant || "_"))));
  };

  const updateQty = (id, variant, qty) => {
    setItems((prev) => prev.map((i) => (i.id === id && (i.variant || "_") === (variant || "_") ? { ...i, qty } : i)));
  };

  const incQty = (id, variant) => {
    setItems((prev) => prev.map((i) => (i.id === id && (i.variant || "_") === (variant || "_") ? { ...i, qty: (i.qty || 1) + 1 } : i)));
  };

  const decQty = (id, variant) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id && (i.variant || "_") === (variant || "_") ? { ...i, qty: Math.max(0, (i.qty || 1) - 1) } : i))
        .filter((i) => (i.qty || 0) > 0)
    );
  };

  const clear = () => setItems([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((o) => !o);

  const totalQty = useMemo(() => items.reduce((s, i) => s + (i.qty || 0), 0), [items]);
  const totalAmount = useMemo(() => items.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0), [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, incQty, decQty, clear, isOpen, openCart, closeCart, toggleCart, totalQty, totalAmount }),
    [items, isOpen, totalQty, totalAmount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
