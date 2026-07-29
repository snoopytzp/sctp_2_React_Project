// components/SubHeader.js
import { StyleSheet, Text } from 'react-native';

function SubHeader({ title, color = 'darkblue' }) {
  return <Text style={[styles.subHeader, { color }]}>{title}</Text>;
}

const styles = StyleSheet.create({
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default SubHeader;