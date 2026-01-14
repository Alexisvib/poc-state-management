import type { CartItem } from "@/src/features/cart/models/Cart";
import { Button, StyleSheet, Text, View } from "react-native";

interface CartRowProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartRow = ({ item, onRemove, onUpdateQuantity }: CartRowProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.rowInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text>${item.price}</Text>
      </View>

      <View style={styles.rowActions}>
        <Button
          title="-"
          onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
        />
        <Text style={styles.qty}>{item.quantity}</Text>
        <Button
          title="+"
          onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
        />
        <Button title="Remove" onPress={() => onRemove(item.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  rowInfo: {
    marginBottom: 8,
  },
  itemTitle: {
    fontWeight: "600",
  },
  rowActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qty: {
    minWidth: 24,
    textAlign: "center",
  },
});

export default CartRow;
