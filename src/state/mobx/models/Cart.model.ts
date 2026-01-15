import type { CartItem } from "@/src/features/cart/models/Cart";
import { types } from "mobx-state-tree";
import { CartItemModel } from "./CartItem.model";

export const CartModel = types
  .model("Cart", {
    items: types.array(CartItemModel),
  })
  .views((self) => ({
    get itemsView(): CartItem[] {
      return self.items.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
      }));
    },

    get totalItems() {
      return self.items.reduce((sum, i) => sum + i.quantity, 0);
    },

    get totalPrice() {
      return self.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
  }))
  .actions((self) => ({
    addItem(item: { id: string; title: string; price: number }) {
      const existing = self.items.find((i) => i.id === item.id);
      if (existing) existing.quantity += 1;
      else self.items.push({ ...item, quantity: 1 });
    },
    removeItem(id: string) {
      self.items.replace(self.items.filter((i) => i.id !== id));
    },
    updateQuantity(id: string, quantity: number) {
      const it = self.items.find((i) => i.id === id);
      if (!it) return;
      it.quantity = Math.max(1, quantity);
    },
    clear() {
      self.items.clear();
    },
  }));
