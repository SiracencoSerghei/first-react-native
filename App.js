import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { CommentsScreen } from "./src/screens/CommentsScreen";
import { MapScreen } from "./src/screens/MapScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
// import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const MainStack = createStackNavigator();
  return (
    <>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <NavigationContainer>
            <MainStack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              <MainStack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
              <MainStack.Screen name="Login" component={LoginScreen} />

              <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: "Posts",
                  headerShown: false,
                }}
              />
              <MainStack.Screen
                name="Comments"
                component={CommentsScreen}
                options={{ headerShown: false }}
              />
              <MainStack.Screen
                name="Map"
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
            </MainStack.Navigator>
          </NavigationContainer>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
