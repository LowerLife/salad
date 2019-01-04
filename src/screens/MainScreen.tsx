import React from "react";
import { StyleSheet, View } from "react-native";
import { observer, inject } from "mobx-react";

import { SAText } from "../components/customs";
import { UserType } from "../stores/User";
import { fontStyles } from "../styles";

@inject(({ User }: { User: UserType }) => ({
  monthSalary: User.monthSalary,
  joinDate: User.joinDate,
  salaryDate: User.salaryDate,
  workStartTime: User.workStartTime,
  workEndTime: User.workEndTime
}))
@observer
export default class MainScreen extends React.Component<UserType> {
  public componentDidMount = () => {
    console.log(this.props);
  };

  public render() {
    return (
      <View style={styles.container}>
        <SAText style={[fontStyles.anton24Pt]}>MAINScreen</SAText>
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
    marginLeft: 34
  }
});
