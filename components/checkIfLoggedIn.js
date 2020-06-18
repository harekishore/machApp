import firebase from "firebase";

export const checkIfLoggedIn = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback("Home");
    } else {
      callback("login");
    }
  });
};
