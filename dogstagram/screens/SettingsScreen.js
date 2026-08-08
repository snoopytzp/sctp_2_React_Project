// screens/SettingsScreen.js
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});