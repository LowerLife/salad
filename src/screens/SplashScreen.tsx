import React from "react";
import { observer, inject } from "mobx-react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface State {}

interface Props {
  number: number;
  increase: () => {};
  decrease: () => {};
}

@inject(({ Counter }) => ({
  number: Counter.number,
  increase: Counter.increase,
  decrease: Counter.decrease
}))
@observer
export default class SplashScreen extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.number}</Text>

        <TouchableOpacity onPress={this.props.increase}>
          <Text>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.props.decrease}>
          <Text>-</Text>
        </TouchableOpacity>
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
