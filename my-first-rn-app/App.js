// App.js
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

useEffect(() => {
  if (!isRunning) return;

  const timer = setInterval(() => {
    console.log("tick", seconds);
    setSeconds((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(timer);
}, [isRunning]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My First React Native App</Text>
      <Text style={styles.counter}>Seconds: {seconds}</Text>
      <Button
        title={isRunning ? "Pause" : "Start"}
        onPress={() => setIsRunning((prev) => !prev)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  counter: {
    fontSize: 32,
    marginBottom: 24,
  },
});