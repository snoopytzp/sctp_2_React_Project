// screens/SettingsScreen.js
import { useContext } from "react";
import { Button, View } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { commonStyles } from "../styles/common";

function SettingsScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={commonStyles.container}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

export default SettingsScreen;