import React, { useEffect, useContext } from "react";
import { Text, ActivityIndicator } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const LoadingScreen = ({ navigation }) => {
  const { checkGSignIn } = useContext(AuthContext);
  useEffect(() => {
    checkGSignIn((whereTo) => {
      navigation.navigate(whereTo);
      navigation.reset({ index: 0, routes: [{ name: whereTo }] });
    });
  }, []);
  return (
    <>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" />
    </>
  );
};

export default LoadingScreen;
