// components/Header.js
import { StyleSheet, Text } from 'react-native';

function Header({ title, color = 'darkblue' }) {
  return (
    <Text style={[styles.header, { color, borderBottomColor: color }]}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 5,
  },
});

export default Header;