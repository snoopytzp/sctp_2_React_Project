// screens/BarcodeResultScreen.js
import { Button, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/common";

function BarcodeResultScreen({ route, navigation }) {
  const { barcodeData } = route.params;

  return (
    <View style={commonStyles.container}>
      <Text style={styles.title}>Barcode Result</Text>
      <Text style={styles.barcodeText}>{barcodeData}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  barcodeText: { fontSize: 18, marginBottom: 24 },
});

export default BarcodeResultScreen;