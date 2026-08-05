// navigation/AppStackNavigator.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../styles/colors";
import TabNavigator from "./TabNavigator";
import BarcodeResultScreen from "../screens/BarcodeResultScreen";

const Stack = createNativeStackNavigator();

function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BarcodeResult"
        component={BarcodeResultScreen}
        options={{ title: "Barcode Result" }}
      />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;