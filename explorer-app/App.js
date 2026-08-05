// App.js
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppStackNavigator from "./navigation/AppStackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppStackNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}