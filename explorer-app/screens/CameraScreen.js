import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "@react-native-vector-icons/ionicons";
import { commonStyles } from "../styles/common";
import { Colors } from "../styles/colors";

function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const handleBarcodeScanned = ({ type, data }) => {
    console.log("barcode scanned:", data )
    navigation.navigate("BarcodeResult", { barcodeData: data });
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync(true);
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Media Library permission is required to save photos.",
        );
        return;
      }
      const photo = await cameraRef.current.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);
      Alert.alert("Photo Taken", "Photo saved to media library.");
    } catch (error) {
      console.log("Error taking photo:", error);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionMessage}>
          We need your permission to show the camera.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <CameraView
        facing={facing}
        style={styles.camera}
        ref={cameraRef}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={toggleCameraFacing} style={styles.button}>
          <Text style={styles.buttonText}>Flip Camera</Text>
          <Ionicons name="camera-reverse" size={36} color={Colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
          <Ionicons name="camera" size={36} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionMessage: {
    textAlign: "center",
    marginBottom: 8,
  },
  camera: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    position: "absolute",
    bottom: 64,
    left: 0,
    right: 0,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: `${Colors.PRIMARY}80`,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default CameraScreen;
