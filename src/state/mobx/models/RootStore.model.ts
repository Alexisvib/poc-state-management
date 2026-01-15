import { types } from "mobx-state-tree";
import { CartModel } from "./Cart.model";
import { CheckoutModel } from "./Checkout.model";

export const RootStore = types.model("RootStore", {
  cart: CartModel,
  checkout: CheckoutModel,
});
