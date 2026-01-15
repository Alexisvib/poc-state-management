import CartView from "@/src/features/cart/components/CartView";
import { useRootStore } from "@/src/state/mobx/hooks";
import { useNavigation } from "expo-router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const Mobx = observer(() => {
  const navigation = useNavigation();

  const { cart, checkout } = useRootStore();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "MobX",
    });
  }, [navigation]);

  return (
    <CartView
      items={cart.itemsView}
      totalItems={cart.totalItems}
      totalPrice={cart.totalPrice}
      onAdd={(item) => cart.addItem(item)}
      onRemove={(id) => cart.removeItem(id)}
      onUpdateQuantity={(id, q) => cart.updateQuantity(id, q)}
      canCheckout={cart.items.length > 0}
      onCheckout={() => checkout.checkout()}
    />
  );
});

export default function MobxScreen() {
  return <Mobx />;
}
