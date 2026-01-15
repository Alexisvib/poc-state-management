import { RootStore } from "./models/RootStore.model";

import { addMiddleware } from "mobx-state-tree";
export const rootStore = RootStore.create({
  cart: { items: [] },
  checkout: {},
});

// Global MST middleware (debug / logging)
addMiddleware(rootStore, (call, next) => {
  console.log("[MST ACTION]", call.name, call.args);
  return next(call);
});
