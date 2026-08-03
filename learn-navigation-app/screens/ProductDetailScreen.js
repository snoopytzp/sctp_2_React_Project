import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { Colors } from "../styles/colors";

export default function ProductDetailScreen() {

  const { params } = useRoute();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: `Product Details: ${params.product}`,
  //   });
  // }, [navigation, params.product]);

  return (
    <View style={styles.container}>
      <Header>Product Detail</Header>
      <Text>Product: {params.product}</Text>
      <Text>ID: {params.id}</Text>
      <Text>Price: ${params.price}</Text>
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
});
