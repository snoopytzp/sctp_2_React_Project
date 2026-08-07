// App.js
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import * as Crypto from "expo-crypto";
import { FlatList } from "react-native";
import { Alert } from "react-native";
import Button from "./components/Button";
import { Colors } from "./styles/colors";
import LoadingOverlay from "./components/LoadingOverlay";

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
      setDogs((prevDogs) => [
        ...prevDogs,
        { id: Crypto.randomUUID(), url: data.message },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDogItem = ({ item }) => (
    <Image source={{ uri: item.url }} style={styles.dogImage} />
  );

  const handleClearDogs = () => {
    if (dogs.length === 0) {
      Alert.alert("Clear Dogs", "No dogs to clear", [{ text: "OK" }]);
      return;
    }

    Alert.alert("Clear Dogs", "Are you sure you want to clear all dogs?", [
      { text: "Cancel" },
      { text: "OK", onPress: () => setDogs([]) },
    ]);
  };

  return (
  <SafeAreaProvider>
  <LinearGradient colors={[Colors.PRIMARY_LIGHT_2, Colors.PRIMARY_LIGHT_1]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Text style={styles.appHeader}>🐶 Dogstagram</Text>
            <View style={styles.buttonsContainer}>
              <View style={styles.dogsContainer}>
                  <FlatList
                    ref={scrollViewRef}
                    onContentSizeChange={scrollToEnd}
                    data={dogs}
                    keyExtractor={(dog) => dog.id}
                    renderItem={renderDogItem}
                    ListEmptyComponent={<Text>🫤 No dogs yet!</Text>}
                    showsVerticalScrollIndicator={false}
                  />
                  {isLoading && <LoadingOverlay />}
              </View>
              <Button onPress={getDog}>Get Dog</Button>
              <Button onPress={handleClearDogs}>Clear</Button>
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
  buttonContainer: {
    backgroundColor: "#6741d9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",

    // Shadow for Android - higher value means a bigger shadow
    elevation: 8,
    // Shadow for iOS
    shadowColor: "#000",
    // width: horizontal offset, height: vertical offset
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    // 1 = sharp shadow, 10 = soft blurry shadow
    shadowRadius: 2,
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
  appHeader: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.PRIMARY,
  },
});