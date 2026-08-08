// screens/MyDogsScreen.js
import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function MyDogsScreen({ route }) {
  const [myDogs, setMyDogs] = useState([]);

  useEffect(() => {
    if (route.params?.dog) {
      setMyDogs((prevDogs) => [
        ...prevDogs,
        { id: randomUUID(), url: route.params.dog },
      ]);
    }
  }, [route.params?.dog]);

  return (
    <View style={styles.container}>
      <FlatList
        data={myDogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item.url }} />
        )}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text>No dogs yet.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});