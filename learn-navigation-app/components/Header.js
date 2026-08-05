import { Text, StyleSheet } from "react-native";

function Header({ children }) {
  return <Text style={styles.headerText}>{children}</Text>;
}

export default Header;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
});