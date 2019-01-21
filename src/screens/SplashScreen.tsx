import React from "react";
import { StyleSheet, View, Image } from "react-native";

import Images from "../../assets/images";
import { colors } from "../styles";

export default class SplashScreen extends React.PureComponent<{}> {
  public render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Images.gif_logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center"
  },
  blackLine: {
    backgroundColor: "black",
    width: 46,
    height: 4,
    marginLeft: 34
  },
  logo: {
    width: 120,
    height: 120
  }
});
