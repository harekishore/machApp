import React from "react";
import { StyleSheet, View } from "react-native";

const Spacer = ({ children }) => {
  return <View style={Styles.space}>{children}</View>;
};

const Styles = StyleSheet.create({
  space: {
    margin: 15,
  },
});

export default Spacer;
