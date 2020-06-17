import React, { useContext } from "react";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const Signout = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  return (
    <Button
      title="Signout"
      onPress={() => signout((whereTo) => navigation.navigate(whereTo))}
    />
  );
};

export default Signout;
