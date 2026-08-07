import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
  ImageBackground,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Crypto from "expo-crypto";
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { useFonts } from "expo-font";
import Button from "./components/Button";
import { Colors } from "./styles/colors";
import LoadingOverlay from "./components/LoadingOverlay";

const API_URL = "https://dog.ceo/api/breeds/image/random";

const renderDogItem = ({ item }) => (
  <Image source={{ uri: item.url }} style={styles.dogImage} />
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

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
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleClearDogs = () => {
    if (dogs.length === 0) {
      Alert.alert("Clear Dogs", "No dogs to clear", [{ text: "Okayy....." }]);
      return;
    }

    Alert.alert("Clear Dogs", "Are you sure you want to clear all dogs?", [
      { text: "Cancel" },
      { text: "OK", style: "destructive", onPress: () => setDogs([]) },
    ]);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#333" />;
  }

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={[Colors.PRIMARY_LIGHT_2, Colors.PRIMARY_LIGHT_1]}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require("./assets/images/wallpaper.jpg")}
          style={{ flex: 1 }}
          imageStyle={{ opacity: 0.1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.appHeader}>🐶 Dogstagram</Text>
              <Text style={styles.welcomeText}>👋 Welcome! Get a dog!</Text>

              <View style={styles.buttonsContainer}>
                <Button onPress={getDog}>Get Dog</Button>
                <Button onPress={handleClearDogs}>Clear</Button>
              </View>
              <View style={styles.dogsContainer}>
                {/* <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={scrollToEnd}
                showsVerticalScrollIndicator={false}
              >
                {dogs.map((dog) => (
                  <Image
                    key={dog.id}
                    source={{ uri: dog.url }}
                    style={styles.dogImage}
                  />
                ))}
              </ScrollView> */}

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
            </View>
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 60,
    // alignItems: "stretch"
    // alignItems: "center"
  },
  appHeader: {
    fontFamily: "Rubik_700Bold",
    color: Colors.PRIMARY,
    fontSize: 24,
    // fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
