import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { observer, inject } from "mobx-react";

import DayScreen from "../screens/DayScreen";
import MonthScreen from "../screens/MonthScreen";
import YearScreen from "../screens/YearScreen";
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
        <ScrollView style={styles.scroll} pagingEnabled>
          <DayScreen />
          <MonthScreen />
          <YearScreen />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  blackLine: {
    backgroundColor: "black",
    width: 46,
    height: 4,
    marginLeft: 34
  },
  scroll: {
    flex: 1
  }
});
