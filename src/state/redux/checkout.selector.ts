import { RootState } from "./store";

// Checkout selectors
export const selectCheckoutStatus = (state: RootState) => state.checkout.status;

export const selectCheckoutError = (state: RootState) =>
  state.checkout.lastError;

// Transverse rule: Cart -> Checkout
export const selectCanCheckout = (state: RootState) =>
  state.cart.items.length > 0;
