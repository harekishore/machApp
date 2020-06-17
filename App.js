import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/screens/Signup";
import SignIn from "./src/screens/Signin";
import HomeScreen from "./src/screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import Signout from "./src/screens/Signout";
import ResolveAuth from "./src/screens/ResolveAuth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Signout" component={Signout} />
    </Drawer.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName={SignUp}>
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="signin"
        component={SignIn}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"resolveAuth"}>
        <Stack.Screen
          name="resolveAuth"
          component={ResolveAuth}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="login"
          component={LoginStack}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreenStack}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
