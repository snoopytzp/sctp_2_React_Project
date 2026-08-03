// screens/HotDealsScreen.js
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { Colors } from "../styles/colors";

export default function HotDealsScreen() {
  return (
    <View style={styles.container}>
      <Header>Hot Deals</Header>
      <Text>Welcome to the Hot Deals screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
});