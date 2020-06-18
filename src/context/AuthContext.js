import CreateDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { call } from "react-native-reanimated";
import firebase from "firebase";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_Error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "acc_exist":
      return { ...state, errorMessage: action.payload };
    case "clearError":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const localSignIn = (dispatch) => async (callback) => {
  let token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signup", payload: token });
    callback("Home");
  } else {
    callback("login");
  }
};

const checkGSignIn = () => (sendTo) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      sendTo("Home");
    } else {
      sendTo("login");
    }
  });
};

const signup = (dispatch) => async ({ email, password }, callback) => {
  try {
    const response = await trackerAPI.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });
    if (callback) callback("Home");
  } catch (error) {
    dispatch({ type: "add_Error", payload: "Thappu Maacchhhhhh :P" });
    if (error.message === "Request failed with status code 422") {
      dispatch({
        type: "acc_exist",
        payload: "Ne register panni pulutha venam, sign in pannu",
      });
      callback("signin");
    }
    console.log(error.message);
  }
};

const signin = (dispatch) => async ({ email, password }, callback) => {
  try {
    const response = await trackerAPI.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });
    if (response.data.token && callback) callback("Home");
  } catch (error) {
    dispatch({ type: "add_Error", payload: "Thappu Maacchhhhhh :P" });
    console.log(error.message);
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clearError" });
};

const signout = (dispatch) => async (callback) => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  callback("login");
};

export const { Context, Provider } = CreateDataContext(
  authReducer,
  { signup, signin, clearErrorMessage, checkGSignIn, signout, localSignIn },
  { token: null, errorMessage: "" }
);
