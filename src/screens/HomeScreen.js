import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Signout from "./Signout";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <>
      <Text>This is Home screen</Text>
      {/* <NavigationContainer independent={true}>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Signout" component={Signout} />
        </Drawer.Navigator>
      </NavigationContainer> */}
    </>
  );
};

export default HomeScreen;
