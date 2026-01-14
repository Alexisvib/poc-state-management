import { CartView } from "@/src/features/cart/components/CartView";
import { useCartStore } from "@/src/state/zustand/cart.store";
import { useCheckoutStore } from "@/src/state/zustand/checkout.store";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Zustand() {
  const navigation = useNavigation();

  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const checkout = useCheckoutStore((s) => s.checkout);

  const canCheckout = items.length > 0;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Zustand",
    });
  }, [navigation]);

  return (
    <CartView
      items={items}
      totalItems={totalItems}
      totalPrice={totalPrice}
      onAdd={add}
      onRemove={remove}
      onUpdateQuantity={updateQuantity}
      canCheckout={canCheckout}
      onCheckout={checkout}
    />
  );
}
