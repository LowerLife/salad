import React from "react";
import { StyleSheet, View } from "react-native";
import { observer, inject } from "mobx-react";

import { BasicHeader } from "../components/headers";
import { SAText } from "../components/customs";
import { UserType } from "../stores/User";
import { colors, fontStyles } from "../styles";
import { deviceSizes } from "../utils";

export default class DayScreen extends React.Component<{}> {
  public componentDidMount = () => {
    console.log(this.props);
  };

  public render() {
    return (
      <View style={styles.container}>
        <BasicHeader textColor="white" />
        <SAText>1 DAY</SAText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    width: deviceSizes.width,
    height: deviceSizes.height
  },
  blackLine: {
    backgroundColor: "black",
    width: 46,
    height: 4,
    marginLeft: 34
  }
});
