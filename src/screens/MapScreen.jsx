import { View, StyleSheet } from "react-native";

export const MapScreen = () => {
  return <View style={styles.container}>
    <Text>MAP SCREEN</Text>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});