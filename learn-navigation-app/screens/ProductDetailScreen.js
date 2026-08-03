// screens/ProductDetailScreen.js
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { Colors } from "../styles/colors";

export default function ProductDetailScreen() {
  return (
    <View style={styles.container}>
      <Header>Product Detail</Header>
      <Text>Welcome to the Product Detail screen!</Text>
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