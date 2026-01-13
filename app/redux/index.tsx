import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { View, Text } from "react-native";

export default function Redux() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Redux",
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
      <Text>REDUX</Text>
    </View>
  );
}
