import { devtools } from "@csark0812/zustand-expo-devtools";
import { create } from "zustand";
import { useCartStore } from "./cart.store";

type CheckoutState = {
  canCheckout: boolean;
  checkout: () => void;
};

export const useCheckoutStore = create<CheckoutState>()(
  devtools(
    (set) => ({
      checkout: () => {
        const items = useCartStore.getState().items;

        if (items.length === 0) {
          set(() => ({}), false, "checkout/blocked_empty_cart");
          return;
        }

        set(() => ({}), false, "checkout/proceed");

        console.log("Proceeding to checkout with items:", items);
      },
    }),
    {
      name: "zustand-checkout-store",
    }
  )
);
