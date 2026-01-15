import CartRow from "@/src/features/cart/components/CartRow";
import type { CartItem } from "@/src/features/cart/models/Cart";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CartViewProps {
  canCheckout: boolean;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  onAdd: (item: Omit<CartItem, "quantity">) => void;
  onCheckout: () => void;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  goToProducts?: () => void;
}

export const CartView = ({
  canCheckout,
  items,
  totalItems,
  totalPrice,
  onAdd,
  onCheckout,
  onRemove,
  onUpdateQuantity,
  goToProducts,
}: CartViewProps) => {
  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Text style={styles.title}>🛒 Cart</Text>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          style={styles.list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartRow
              item={item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          )}
        />
      )}

      <View style={styles.summary}>
        <Text>Total items: {totalItems}</Text>
        <Text>Total price: ${totalPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.checkout}>
        <Pressable
          accessibilityRole="button"
          disabled={!canCheckout}
          onPress={onCheckout}
          style={({ pressed }) => [
            styles.checkoutButton,
            !canCheckout && styles.checkoutButtonDisabled,
            pressed && canCheckout && styles.checkoutButtonPressed,
          ]}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>

      {/* Fake product buttons (temporary, for UI testing only) */}
      <View style={styles.actions}>
        <Button
          title="Add fake product"
          onPress={() =>
            onAdd({
              id: "product-1",
              title: "Demo Product",
              price: 10,
            })
          }
        />
      </View>
      {goToProducts && (
        <View style={styles.actions}>
          <Button title="Go to Products" onPress={() => goToProducts()} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkout: {
    marginTop: 16,
  },
  checkoutButton: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#0a84ff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  checkoutButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  checkoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  empty: {
    fontStyle: "italic",
    marginVertical: 16,
  },
  emptyContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  summary: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  actions: {
    marginTop: 16,
  },
});

export default CartView;
