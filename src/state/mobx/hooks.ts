import { createContext, useContext } from "react";
import { rootStore } from "./root.store";

const StoreContext = createContext(rootStore);

export const useRootStore = () => useContext(StoreContext);
