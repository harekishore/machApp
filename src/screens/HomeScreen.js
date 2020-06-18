import React from "react";
import { Text, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Signout from "./Signout";
import axios from "axios";

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
      <Button
        title="Press"
        onPress={() => {
          const test = axios
            .get("https://www.googleapis.com/drive/v3/files")
            .then((result) => result.json())
            .catch((err) => console.log(err));
          console.log(test);
        }}
      />
    </>
  );
};

export default HomeScreen;
