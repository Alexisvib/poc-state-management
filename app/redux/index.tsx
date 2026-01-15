import CartView from "@/src/features/cart/components/CartView";
import {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
} from "@/src/state/redux/cart.selector";
import {
  addItem,
  removeItem,
  updateQuantity,
} from "@/src/state/redux/cart.slice";
import { selectCanCheckout } from "@/src/state/redux/checkout.selector";
import { checkout } from "@/src/state/redux/checkout.thunks";
import { store, useAppDispatch, useAppSelector } from "@/src/state/redux/store";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";

function ReduxCartScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const canCheckout = useAppSelector(selectCanCheckout);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Redux",
    });
  }, [navigation]);

  return (
    <CartView
      items={items}
      totalItems={totalItems}
      totalPrice={totalPrice}
      onAdd={(item) => dispatch(addItem(item))}
      onRemove={(id) => dispatch(removeItem(id))}
      onUpdateQuantity={(id, quantity) =>
        dispatch(updateQuantity({ id, quantity }))
      }
      canCheckout={canCheckout}
      onCheckout={() => dispatch(checkout())}
      goToProducts={() => router.push("/redux/products")}
    />
  );
}

export default function ReduxScreen() {
  return (
    <Provider store={store}>
      <ReduxCartScreen />
    </Provider>
  );
}
