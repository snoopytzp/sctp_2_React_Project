// screens/LocationScreen.js
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { commonStyles } from "../styles/common";
import { Colors } from "../styles/colors";

function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [retrievingLocation, setRetrievingLocation] = useState(false);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied.");
      return;
    }
    setRetrievingLocation(true);
    try {
      const retrievedLocation = await Location.getCurrentPositionAsync({});
      setLocation(retrievedLocation);
    } catch (error) {
      alert("Error retrieving location: " + error.message);
    } finally {
      setRetrievingLocation(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Button title="Get Location" onPress={getLocation} />
      {location && (
        <Text>
          Your coordinates: {location.coords.latitude},{" "}
          {location.coords.longitude}
        </Text>
      )}
      {retrievingLocation && (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      )}
      {location?.coords && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    marginTop: 16,
    borderRadius: 8,
  },
});

export default LocationScreen;