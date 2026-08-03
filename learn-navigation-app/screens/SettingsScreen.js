import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { Colors } from "../styles/colors";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header>Settings</Header>
      <Text>Welcome to the Settings screen!</Text>
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
