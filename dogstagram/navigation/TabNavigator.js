// navigation/TabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Colors } from "../styles/colors";
import ExploreScreen from "../screens/ExploreScreen";
import MyDogsScreen from "../screens/MyDogsScreen";
import AddDogScreen from "../screens/AddDogScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
        headerTitleStyle: { fontFamily: "Rubik_700Bold" },
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarLabelStyle: { fontFamily: "Rubik_400Regular" },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyDogs"
        component={MyDogsScreen}
        options={{
          title: "My Dogs",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddDog"
        component={AddDogScreen}
        options={{
          title: "Add Dog",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}