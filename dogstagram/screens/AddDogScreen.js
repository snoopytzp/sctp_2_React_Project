// screens/AddDogScreen.js
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/colors";
import Button from "../components/Button";

const imageOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
};

export default function AddDogScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const pickImageHandler = async () => {
    const result = await launchImageLibraryAsync(imageOptions);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const checkCameraPermission = async () => {
    if (Platform.OS === "android") return true;

    if (cameraPermission.status === "undetermined") {
      const { granted } = await requestCameraPermission();
      return granted;
    }

    if (cameraPermission.status === "denied") {
      Alert.alert(
        "Camera Permissions Denied",
        "Please enable camera permissions in your settings for this app."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const permissionGranted = await checkCameraPermission();
    if (!permissionGranted) return;
    const result = await launchCameraAsync(imageOptions);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const confirmImageHandler = () => {
    navigation.navigate("MyDogs", { dog: image });
  };

  return (
  <View style={styles.container}>
    <Text style={styles.instructionText}>
      Choose an existing photo or take a new one.
    </Text>

    <View style={styles.buttonsContainer}>
      <Button onPress={pickImageHandler}>Pick a Photo</Button>
      <Button onPress={takeImageHandler}>Take a Photo</Button>
    </View>

    {!image && (
      <Text style={styles.instructionText}>No photo selected yet.</Text>
    )}

    {image && (
      <>
        <View>
          <Text style={styles.instructionText}>Preview</Text>
          <Image style={styles.previewImage} source={{ uri: image }} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={confirmImageHandler}>Save</Button>
          <Button onPress={() => setImage(null)}>Clear</Button>
        </View>
      </>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    padding: 10,
  },
  instructionText: {
    fontFamily: "Rubik_400Regular",
    textAlign: "center",
    paddingVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});