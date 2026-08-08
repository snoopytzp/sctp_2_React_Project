// screens/LoginScreen.js
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import { Colors } from "../styles/colors";

export default function LoginScreen({ navigation }) {
  const { login, biometricLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.appHeader}>🐶 Dogstagram</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonsContainer}>
        <Button onPress={() => login(username, password)}>Login</Button>
        <Button onPress={() => navigation.navigate("Register")}>
          Register
        </Button>
      </View>
      <TouchableOpacity
        onPress={biometricLogin}
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="finger-print" size={48} color={Colors.PRIMARY} />
        <Text style={{ marginTop: 10, fontFamily: "Rubik_400Regular" }}>
          Login with Biometric
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  appHeader: {
    fontFamily: "Rubik_700Bold",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.PRIMARY,
  },
  title: {
    fontFamily: "Rubik_700Bold",
    color: Colors.PRIMARY,
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 700,
  },
  input: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
