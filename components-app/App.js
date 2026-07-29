import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Button from './components/Button';

// ScrollView issue
// ScrollView has 2 containers - Outer and Inner
// `style` sets Outer, needs to be flex:1 to take all space
// `contentContainerStyle` cannot have flex otherwise it gets forced to viewport's height

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : undefined}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.container}
          >
            <Image
              source={require("./assets/images/ntu-building.webp")}
              style={styles.bannerImg}
            />
            <Header title="AI Engineering Course" color="darkblue" />
            <Image
              source={{ uri: "https://i.imgur.com/9wvRTDo.png" }}
              style={styles.image}
            />
            <SubHeader title="Sign Up Form" />
            <Text style={styles.mainText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              autoComplete="off"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
              autoComplete="off"
            />
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter notes here..."
              multiline
              textAlignVertical="top"
              autoCorrect={false}
            />
            <Button title="Submit" onPress={() => console.log({ name, email, notes })} />
            <StatusBar style="dark" />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1, REMOVE THIS
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  bannerImg: {
    width: "90%",
    resizeMode: "contain",
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  mainText: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  textInput: {
    height: 40,
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#333",
    padding: 10,
    margin: 12,
  },
  notesInput: {
    height: 100,
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#333",
    padding: 10,
    margin: 12,
  },
});
