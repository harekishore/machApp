import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuth = ({ navigation }) => {
  const { localSignIn } = useContext(AuthContext);
  useEffect(() => {
    localSignIn((whereTo) => {
      navigation.navigate(whereTo);
      navigation.reset({ index: 0, routes: [{ name: whereTo }] });
    });
  }, []);
  return null;
};

export default ResolveAuth;
