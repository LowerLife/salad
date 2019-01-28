import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { observer, inject } from "mobx-react";

import DayScreen from "../screens/DayScreen";
import MonthScreen from "../screens/MonthScreen";
import YearScreen from "../screens/YearScreen";
import { SalaryType } from "../stores/Salary";

// TODO: 아래 모두 자식 컴포넌트로 이동
@inject(({ Salary }: { Salary: SalaryType }) => ({
  dayMoney: Salary.dayMoney,
  monthMoney: Salary.monthMoney,
  yearMoney: Salary.yearMoney,
  startCalDayMoney: Salary.startCalDayMoney,
  startCalMonthMoney: Salary.startCalMonthMoney,
  startCalYearMoney: Salary.startCalYearMoney,
  getOffDiff: Salary.getoffTime,
  salaryDayDiff: Salary.salaryDayDiff,
  negoDayDiff: Salary.negoTime
}))
@observer
export default class MainScreen extends React.Component<SalaryType> {
  public componentDidMount = async () => {
    await this.props.startCalDayMoney();
    await this.props.startCalMonthMoney();
    await this.props.startCalYearMoney();
  };

  public render() {
    const {
      dayMoney,
      monthMoney,
      yearMoney,
      getOffDiff,
      salaryDayDiff,
      negoDayDiff
    } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          pagingEnabled
          showsVerticalScrollIndicator={false}
        >
          <DayScreen money={dayMoney} getOffDiff={getOffDiff} />
          <MonthScreen money={monthMoney} salaryDayDiff={salaryDayDiff} />
          <YearScreen money={yearMoney} negoDayDiff={negoDayDiff} />
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
