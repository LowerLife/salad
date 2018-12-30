import React from "react";
import { observer, inject } from "mobx-react";
import { StyleSheet, View, Text } from "react-native";
import { UserType } from "./../stores/User";

@inject(({ User }: { User: UserType }) => ({
  setUserInfo: User.setUserInfo
}))
@observer
export default class InputInfoScreen extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>InfoInput</Text>
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
