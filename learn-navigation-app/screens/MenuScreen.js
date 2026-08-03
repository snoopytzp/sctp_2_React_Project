import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ExploreScreen from "./screens/ExploreScreen";
import HotDealsScreen from "./screens/HotDealsScreen";
import { Colors } from "./styles/colors";
import Ionicons from "@react-native-vector-icons/ionicons";
import MenuScreen from "./screens/MenuScreen";

const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HotDeals"
        component={HotDealsScreen}
        options={{
          headerTitle: "🔥 Hot Deals!",
          tabBarLabel: "Hot Deals!",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bonfire-sharp" size={size} color={color} />
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

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
        drawerActiveBackgroundColor: Colors.PRIMARY,
        drawerActiveTintColor: Colors.WHITE,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="HotDeals"
        component={HotDealsScreen}
        options={{
          headerTitle: "🔥 Hot Deals!",
          drawerLabel: "Hot Deals!",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bonfire" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
      }}
    >
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen
        name="HotDeals"
        component={HotDealsScreen}
        options={{ headerTitle: "🔥 Hot Deals!" }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <BottomTabsNavigator /> */}
      {/* <DrawerNavigator /> */}
      <StackNavigator />
    </NavigationContainer>
  );
}
