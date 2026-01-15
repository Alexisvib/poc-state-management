import { Product } from "@/src/features/products/models/Product";
import { ScrollView, Text } from "react-native";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  isLoading: boolean;
  error?: unknown;
  onAddToCart?: (product: Product) => void;
};

export function ProductsView({
  products,
  isLoading,
  error,
  onAddToCart,
}: Props) {
  if (isLoading) {
    return <Text>Loading products...</Text>;
  }

  if (error) {
    return <Text>Failed to load products</Text>;
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </ScrollView>
  );
}
