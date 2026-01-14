import Home from "@/src/shared/ui/Home";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Redux() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Redux",
    });
  }, [navigation]);

  return <Home />;
}
