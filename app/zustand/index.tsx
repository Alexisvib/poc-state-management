import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { View, Text } from "react-native";

export default function Zustand() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Zustand",
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>ZUSTAND</Text>
    </View>
  );
}
