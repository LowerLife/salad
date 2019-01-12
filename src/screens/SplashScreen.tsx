import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

const AnimatedLogo = require("../../assets/lotties/b_life.json");

export default class SplashScreen extends React.Component<{}> {
  public render() {
    return (
      <View style={styles.container}>
        <LottieView source={AnimatedLogo} autoPlay />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  blackLine: {
    backgroundColor: "black",
    width: 46,
    height: 4,
    marginLeft: 34
  }
});
