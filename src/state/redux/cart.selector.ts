import { RootState } from "./store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
