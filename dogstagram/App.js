// App.js
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
import { Image } from "react-native";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "https://dog.ceo/api/breeds/image/random";

  const getDog = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setDogs((prevDogs) => [...prevDogs, data.message]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appHeader}>🐶 Dogstagram</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.dogsContainer}>
          {dogs.map((dogUrl, index) => (
            <Image key={index} source={{ uri: dogUrl }} style={styles.dogImage} />
          ))}
        </View>
        <Button title="Get Dog" onPress={getDog} />
        <Button title="Clear" onPress={() => setDogs([])} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
  },
  dogsContainer: {
    flex: 1,
    alignItems: "center",
  },
  dogImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
});