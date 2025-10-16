"use client";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product, variant, qty = 1, className = "", children }) {
  const { addItem, openCart } = useCart();

  const onClick = () => {
    const id = product.slug || product.id || product.name;
    addItem({
      id,
      name: product.name,
      price: product.price,
      variant,
      qty,
      image: product.image,
    });
    openCart();
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      {children || "Add to Cart"}
    </button>
  );
}
