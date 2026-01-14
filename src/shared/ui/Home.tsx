import { CartView } from "@/src/features/cart/components/CartView";
import { CartItem } from "@/src/features/cart/models/Cart";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState<CartItem[]>([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <CartView
      canCheckout={items.length > 0}
      items={items}
      totalItems={totalItems}
      totalPrice={totalPrice}
      onAdd={(product) => {
        setItems((prev) => {
          const existing = prev.find((i) => i.id === product.id);
          if (existing) {
            return prev.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          }
          return [...prev, { ...product, quantity: 1 }];
        });
      }}
      onCheckout={() => {
        console.log("Checkout clicked");
      }}
      onRemove={(id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }}
      onUpdateQuantity={(id, quantity) => {
        setItems((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          )
        );
      }}
    />
  );
}
