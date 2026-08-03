import { Button, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { Colors } from "../styles/colors";

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header>Menu</Header>
      <MenuOptions />
    </View>
  );
}

function MenuOptions() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.buttonsContainer}>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Explore" onPress={() => navigation.navigate("Explore")} />
      <Button
        title="Hot Deals"
        onPress={() => navigation.navigate("HotDeals")}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
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
  buttonsContainer: {
    gap: 5,
  },
});
