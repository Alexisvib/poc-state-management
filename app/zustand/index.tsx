import Home from "@/src/shared/ui/Home";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Zustand() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Zustand",
    });
  }, [navigation]);

  return <Home />;
}
