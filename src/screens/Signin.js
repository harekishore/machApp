import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "../../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const DisplayScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, signin, clearErrorMessage, localSignIn } = useContext(
    AuthContext
  );

  return (
    <View style={Styles.container}>
      <Text h3>SignIn</Text>
      <Spacer />
      {state.errorMessage ? (
        <Text style={Styles.error}>{state.errorMessage}</Text>
      ) : null}
      <Spacer />
      <Input
        label="Email"
        onChange={({ nativeEvent }) => setEmail(nativeEvent.text)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
        onChange={({ nativeEvent }) => setPassword(nativeEvent.text)}
        secureTextEntry={true}
      />
      <Button
        title="Sign In"
        onPress={() =>
          signin({ email, password }, (whereTo) => {
            navigation.navigate(whereTo);
            navigation.reset({ index: 0, routes: [{ name: whereTo }] });
          })
        }
      />
      <TouchableOpacity>
        <Text style={Styles.bluetext}>Forget Password!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={Styles.bluetext}>Don't have an account! Sign Up! </Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginBottom: 100,
    justifyContent: "center",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  bluetext: {
    marginTop: 20,
    fontSize: 12,
    color: "blue",
  },
});

export default DisplayScreen;
