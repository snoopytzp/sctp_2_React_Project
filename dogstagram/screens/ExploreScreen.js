// screens/ExploreScreen.js
import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import * as Crypto from "expo-crypto";
import { Colors } from "../styles/colors";
import LoadingOverlay from "../components/LoadingOverlay";

const API_URL = "https://dog.ceo/api/breeds/image/random";

const renderDogItem = ({ item }) => (
  <Image source={{ uri: item.url }} style={styles.dogImage} />
);

export default function ExploreScreen() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

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

  const scrollToEnd = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const handleClearDogs = () => {
    if (dogs.length === 0) {
      Alert.alert("Clear Dogs", "There are no dogs to clear.", [
        { text: "Okayyy..." },
      ]);
      return;
    }

    Alert.alert("Clear Dogs", "Are you sure you want to clear all dogs?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => setDogs([]) },
    ]);
  };

  const handleGetDogPress = async () => {
    await getDog();
    scrollToEnd();
  };

  const handleEndReached = () => {
    if (!isLoading && dogs.length > 0) {
      getDog();
    }
  };

  return (
    <LinearGradient
      colors={[Colors.PRIMARY_LIGHT_2, Colors.PRIMARY_LIGHT_1]}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../assets/images/wallpaper.jpg")}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={styles.container}>
          <Text style={styles.appHeader}>🐶 Dogstagram</Text>
          <Text style={styles.welcomeText}>👋 Welcome! Get a dog!</Text>

          <View style={styles.buttonsContainer}>
            <Button onPress={handleGetDogPress}>Get Dog</Button>
            <Button onPress={handleClearDogs}>Clear</Button>
          </View>

          <View style={styles.dogsContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ref={flatListRef}
              data={dogs}
              keyExtractor={(dog) => dog.id}
              renderItem={renderDogItem}
              ListEmptyComponent={<Text>😊 No dogs yet!</Text>}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
            />
            {isLoading && <LoadingOverlay />}
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    fontFamily: "Rubik_700Bold",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.PRIMARY,
  },
  welcomeText: {
    fontFamily: "Rubik_400Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
    justifyContent: "center",
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