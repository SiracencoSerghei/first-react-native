import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { RegistrationScreen } from "./screens/RegistrationScreen";
// import { LoginScreen } from './screens/LoginScreen';
// import { PostsScreen } from "./screens/PostsScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen />
      <PostsScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
