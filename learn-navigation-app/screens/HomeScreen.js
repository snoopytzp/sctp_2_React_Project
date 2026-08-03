import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { Colors } from "../styles/colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header>Home</Header>
      <Text>Welcome to the Home screen!</Text>
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
