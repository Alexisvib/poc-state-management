import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Text, View } from "react-native";

export default function Mobx() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "MobX",
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
      <Text>MOBX</Text>
    </View>
  );
}
