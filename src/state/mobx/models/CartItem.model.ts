import { types } from "mobx-state-tree";

export const CartItemModel = types.model("CartItem", {
  id: types.identifier,
  title: types.string,
  price: types.number,
  quantity: types.number,
});
