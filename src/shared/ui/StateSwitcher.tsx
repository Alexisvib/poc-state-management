import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function StateSwitcher() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.buttonShadow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/redux")}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Redux</Text>
        </Pressable>
      </View>
      <View style={styles.buttonShadow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/zustand")}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Zustand</Text>
        </Pressable>
      </View>
      <View style={styles.buttonShadow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/mobx")}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>MobX</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    paddingHorizontal: 24,
    backgroundColor: "#f3f4f6",
    width: "100%",
  },
  buttonShadow: {
    alignSelf: "stretch",
    maxWidth: 360,
    borderRadius: 999,
    shadowColor: "#1d87d6",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  button: {
    minHeight: 60,
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: "100%",
    borderRadius: 999,
    backgroundColor: "#58b7f6",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
    textAlign: "center",
  },
});
