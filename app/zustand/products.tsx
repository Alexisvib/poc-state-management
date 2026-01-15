import { ProductsView } from "@/src/features/products/components/ProductView";
import { useProducts } from "@/src/state/query/useProducts";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function ZustandProducts() {
  const { data, isLoading, error } = useProducts();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Zustand - Products",
    });
  }, [navigation]);

  return (
    <ProductsView products={data ?? []} isLoading={isLoading} error={error} />
  );
}
