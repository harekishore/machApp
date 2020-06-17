import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
// import { NavigationEvents } from "react-navigation";
import Spacer from "../../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const DisplayScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, signup, clearErrorMessage, localSignIn } = useContext(
    AuthContext
  );

  return (
    <View style={Styles.container}>
      <Text h3>SignUp</Text>
      <Spacer />
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
      {state.errorMessage ? (
        <Text style={Styles.error}>{state.errorMessage}</Text>
      ) : null}
      <Button
        title="Sign Up"
        onPress={() =>
          signup({ email, password }, (whereTo) => {
            navigation.navigate(whereTo);
            navigation.reset({ index: 0, routes: [{ name: whereTo }] });
          })
        }
      />
      <TouchableOpacity onPress={() => navigation.navigate("signin")}>
        <Text style={Styles.bluetext}>
          Already have an account!! Sign In instead!
        </Text>
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
