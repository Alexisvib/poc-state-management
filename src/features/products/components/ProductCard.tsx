import { Product } from "@/src/features/products/models/Product";
import { Button, Image, Text, View } from "react-native";

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <View
      style={{
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <Image
        source={{ uri: product.image }}
        style={{ height: 100, resizeMode: "contain" }}
      />

      <Text style={{ fontWeight: "600", marginTop: 8 }}>{product.title}</Text>

      <Text style={{ marginVertical: 4 }}>{product.price} €</Text>

      {onAddToCart && (
        <Button title="Add to cart" onPress={() => onAddToCart(product)} />
      )}
    </View>
  );
}
