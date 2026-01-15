import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkoutBlocked, checkoutCompleted } from "./checkout.slice";
import { RootState } from "./store";

export const checkout = createAsyncThunk<void, void, { state: RootState }>(
  "checkout/submit",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const items = state.cart.items;

    if (items.length === 0) {
      dispatch(checkoutBlocked("Cart is empty"));
      return;
    }

    // Simulate checkout success
    dispatch(checkoutCompleted());
  }
);
