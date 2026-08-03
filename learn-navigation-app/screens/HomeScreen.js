import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";
import { Colors } from "../styles/colors";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  console.log(
    "🟢 navigation stack - HomeScreen",
    JSON.stringify(navigation.getState().routes, null, 2),
  );

  useFocusEffect(
    useCallback(() => {
      setSearchQuery("");
    }, []),
  );

  // const clearSearchQuery = () => setSearchQuery("");

  // runs when the scnree is focused
  // useFocusEffect(() => {
  //   console.log("🟢 HomeScreen is focused");

  //   return () => console.log("🔴 Homescreen is unfocused");
  // });

  // useFocusEffect(clearSearchQuery)

  return (
    <View style={styles.container}>
      <Header>Home</Header>
      <Text style={styles.welcomeText}>Welcome to the Home screen!</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button
        title="Apple iPhone @ $999"
        onPress={() =>
          navigation.navigate("ProductDetail", {
            product: "Apple iPhone",
            id: 124,
            price: 999,
          })
        }
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
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "80%",
  },
});
