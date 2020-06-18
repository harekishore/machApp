import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "../../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
// import { GoogleSigninButton } from "expo-google-sign-in";
import firebase from "firebase";

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const onSignIn = (googleUser) => {
  console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
        // googleUser.getAuthResponse().id_token
      );
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          if (result.additionalUserInfo.isNewUser) {
            firebase
              .database()
              .ref("/users" + result.user.uid)
              .set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
                created_At: Date.now(),
              });
          } else {
            firebase
              .database()
              .ref("/users" + result.user.uid)
              .update({
                last_logged_In: Date.now(),
              });
          }
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      // androidClientId: YOUR_CLIENT_ID_HERE,
      behaviour: "web",
      iosClientId:
        "64822002040-72qs90561v8pf7nccc532ag4g9cuus9h.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

const DisplayScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    state,
    signin,
    clearErrorMessage,
    localSignIn,
    checkGSignIn,
  } = useContext(AuthContext);

  useEffect(() => {
    checkGSignIn((whereTo) => {
      navigation.navigate(whereTo);
      console.log(whereTo);
      if (whereTo != "login")
        navigation.reset({ index: 0, routes: [{ name: whereTo }] });
    });
  }, []);

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
      <Spacer />
      <Button title="Google Signin" onPress={() => signInWithGoogleAsync()} />
      <TouchableOpacity>
        <Text style={Styles.bluetext}>Forget Password!</Text>
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
