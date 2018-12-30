import React from "react";
import { observer, inject } from "mobx-react";
import { StyleSheet, View, Text } from "react-native";

export default class SplashScreen extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>SplashScreen</Text>
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
  }
});
