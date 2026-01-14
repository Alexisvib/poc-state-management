import { useEffect } from "react";
import { useNavigation } from "expo-router";
import Home from "@/src/shared/ui/Home";

export default function Mobx() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "MobX",
    });
  }, [navigation]);

  return <Home />;
}
