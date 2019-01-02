import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { SAText } from "../components/customs";
import { fontStyles } from "../styles";

export default class SplashScreen extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <SAText style={[fontStyles.anton24Pt]}>B</SAText>
        <View style={styles.blackLine} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  blackLine: {
    backgroundColor: "black",
    width: 46,
    height: 4,
    marginLeft: 33
  }
});
