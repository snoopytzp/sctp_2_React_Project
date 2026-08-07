// App.js
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import * as Crypto from "expo-crypto";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "https://dog.ceo/api/breeds/image/random";
  const scrollViewRef = useRef(null);

  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

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
  <SafeAreaProvider>
    <LinearGradient colors={["#e5dbff", "#f3f0ff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Text style={styles.appHeader}>🐶 Dogstagram</Text>
            <View style={styles.buttonsContainer}>
              <View style={styles.dogsContainer}>
                <ScrollView ref={scrollViewRef} onContentSizeChange={scrollToEnd} showsVerticalScrollIndicator={false}>
                  {dogs.map((dogUrl, index) => (
                    <Image key={index} source={{ uri: dogUrl }} style={styles.dogImage} />
                  ))}
                </ScrollView>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#333" />
                  </View>
                )}
              </View>
              <Button title="Get Dog" onPress={getDog} />
              <Button title="Clear" onPress={() => setDogs([])} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  </SafeAreaProvider>
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
  mainContainer: {
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center", 
    alignItems: "center",
},
});