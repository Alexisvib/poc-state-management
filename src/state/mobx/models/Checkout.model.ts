import { getRoot, types } from "mobx-state-tree";

export const CheckoutModel = types
  .model("Checkout", {
    status: types.optional(
      types.enumeration(["idle", "blocked", "completed"]),
      "idle"
    ),
    lastError: types.maybe(types.string),
  })
  .actions((self) => ({
    checkout() {
      const root = getRoot<any>(self);
      const items = root.cart.items;

      if (items.length === 0) {
        self.status = "blocked";
        self.lastError = "Cart is empty";
        return;
      }

      self.status = "completed";
      self.lastError = undefined;
      root.cart.clear();
    },
  }));
