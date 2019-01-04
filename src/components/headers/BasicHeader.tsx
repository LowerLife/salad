import React from "react";
import { View, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { SAText } from "../customs";
import { fontStyles } from "../../styles";

interface IProps {
  backgroundColor?: string;
}

export const BasicHeader: React.SFC<IProps> = ({ backgroundColor }) => (
  <View style={[styles.container, { backgroundColor }]}>
    <SAText style={fontStyles.anton24Pt}>B</SAText>
    <View style={styles.blackLine} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: getStatusBarHeight(true) + 51,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: getStatusBarHeight(true)
  },
  blackLine: {
    backgroundColor: "black",
    width: 46,
    height: 4
  }
});
