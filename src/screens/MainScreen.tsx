import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  NativeScrollEvent,
  Dimensions
} from "react-native";
import { observer, inject } from "mobx-react";

import DayScreen from "../screens/DayScreen";
import MonthScreen from "../screens/MonthScreen";
import YearScreen from "../screens/YearScreen";
import { SalaryType } from "../stores/Salary";

interface IState {
  currentScreenIndex: number;
}

const { height: deviceHeight } = Dimensions.get("window");

// TODO: 레더링 최적화

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
export default class MainScreen extends React.Component<SalaryType, IState> {
  public state: IState = {
    currentScreenIndex: 0
  };

  public componentDidMount = async () => {
    await this.props.startCalDayMoney();
    await this.props.startCalMonthMoney();
    await this.props.startCalYearMoney();
  };

  private onMomentumScrollEnd = ({
    nativeEvent
  }: {
    nativeEvent: NativeScrollEvent;
  }) => {
    const currentScreenIndex = Math.floor(
      nativeEvent.contentOffset.y / deviceHeight
    );
    this.setState({ currentScreenIndex });
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
    const { currentScreenIndex } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          pagingEnabled
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
        >
          <DayScreen
            money={dayMoney}
            getOffDiff={getOffDiff}
            dayRecommendItems={[]}
            current={currentScreenIndex === 0}
          />
          <MonthScreen
            money={monthMoney}
            salaryDayDiff={salaryDayDiff}
            monthRecommendItems={[]}
            current={currentScreenIndex === 1}
          />
          <YearScreen
            money={yearMoney}
            negoDayDiff={negoDayDiff}
            yearRecommendItems={[]}
            current={currentScreenIndex === 2}
          />
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
