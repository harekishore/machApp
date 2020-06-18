import React, { useContext } from "react";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import firebase from "firebase";

const Signout = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  return (
    <>
      <Button
        title="Signout"
        onPress={() =>
          signout((whereTo) => {
            navigation.navigate(whereTo);
            navigation.reset({ index: 0, routes: [{ name: whereTo }] });
          })
        }
      />
      <Button
        title="Signout Google"
        onPress={() => {
          firebase.auth().signOut();
          navigation.navigate("loading");
        }}
      />
    </>
  );
};

export default Signout;
