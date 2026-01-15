import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CheckoutState = {
  status: "idle" | "blocked" | "completed";
  lastError?: string;
};

const initialState: CheckoutState = {
  status: "idle",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    checkoutBlocked(state, action: PayloadAction<string>) {
      state.status = "blocked";
      state.lastError = action.payload;
    },
    checkoutCompleted(state) {
      state.status = "completed";
      state.lastError = undefined;
    },
    resetCheckout(state) {
      state.status = "idle";
      state.lastError = undefined;
    },
  },
});

export const { checkoutBlocked, checkoutCompleted, resetCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
