import { CartItem } from "@/src/features/cart/models/Cart";
import { devtools } from "@csark0812/zustand-expo-devtools";
import { create } from "zustand";

type CartState = {
  items: CartItem[];

  // derived
  totalItems: number;
  totalPrice: number;

  // actions
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
};

export const useCartStore = create<CartState>()(
  devtools(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      add: (product) =>
        set(
          (state) => {
            const existing = state.items.find((i) => i.id === product.id);

            const items = existing
              ? state.items.map((i) =>
                  i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                )
              : [...state.items, { ...product, quantity: 1 }];

            return computeDerived(items);
          },
          false,
          "cart/add"
        ),

      remove: (itemId) =>
        set(
          (state) => {
            const items = state.items.filter((i) => i.id !== itemId);
            return computeDerived(items);
          },
          false,
          "cart/remove"
        ),

      updateQuantity: (itemId, quantity) =>
        set(
          (state) => {
            const safeQty = Math.max(1, quantity);

            const items = state.items.map((i) =>
              i.id === itemId ? { ...i, quantity: safeQty } : i
            );

            return computeDerived(items);
          },
          false,
          "cart/updateQuantity"
        ),
    }),
    {
      name: "zustand-cart-store",
    }
  )
);

function computeDerived(items: CartItem[]) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    items,
    totalItems,
    totalPrice,
  };
}
