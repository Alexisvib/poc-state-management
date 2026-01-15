import { ProductsView } from "@/src/features/products/components/ProductView";
import { store } from "@/src/state/redux/store";
import { useGetProductsQuery } from "@/src/state/rtk/productsApi";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";

const ReduxProductsScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "RTK / redux - Products",
    });
  }, [navigation]);

  return (
    <ProductsView products={data ?? []} isLoading={isLoading} error={error} />
  );
};

export default function ReduxScreen() {
  return (
    <Provider store={store}>
      <ReduxProductsScreen />
    </Provider>
  );
}
