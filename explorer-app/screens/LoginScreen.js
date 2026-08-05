// screens/LoginScreen.js
import { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import AuthContext from "../contexts/AuthContext";
import { Colors } from "../styles/colors";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, biometricLogin } = useContext(AuthContext);

  return (
    <View style={styles.container}>
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
        <Button title="Login" onPress={() => login(username, password)} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <Ionicons
        name="finger-print"
        size={48}
        color={Colors.PRIMARY}
        onPress={biometricLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
});

export default LoginScreen;