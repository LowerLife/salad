import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { observer, inject } from "mobx-react";

import Images from "../../assets/images";
import { SAText, SAButton } from "../components/customs";
import { BasicHeader } from "../components/headers";
import {
  InfoTextInput,
  DoubleInfoTextInput,
  DateInfoPikcer,
  ScrollIfSmallView
} from "../components/views";
import { UserType } from "../stores/User";
import { fontStyles } from "../styles";
import { deviceSizes } from "../utils";

interface IState {
  joinDate: string;
  salaryDate: string;
  monthSalary: string;
  workStartTime: string;
  workEndTime: string;
}

@inject(({ User }: { User: UserType }) => ({
  setUserInfo: User.setUserInfo
}))
@observer
export default class InfoInputScreen extends React.Component<UserType, IState> {
  public state: IState = {
    joinDate: "",
    salaryDate: "",
    monthSalary: "",
    workStartTime: "",
    workEndTime: ""
  };

  private joinDate = new Date();
  private salaryDate = new Date();
  private workStartDate = 0;
  private workEndDate = 0;

  private onMonthSalaryChange = (text: string) => {
    this.setState({ monthSalary: text });
  };

  private onJoinDateChange = (dateStr: string, date: Date) => {
    this.setState({ joinDate: dateStr });
    this.joinDate = date;
  };

  private onSalaryDateChange = (dateStr: string, date: Date) => {
    this.setState({ salaryDate: dateStr });
    this.salaryDate = date;
  };

  private onWorkStartTimeChange = (dateStr: string, date: Date) => {
    this.setState({ workStartTime: dateStr });
    this.workStartDate = date.getTime();
  };

  private onWorkEndTimeChange = (dateStr: string, date: Date) => {
    this.setState({ workEndTime: dateStr });
    this.workEndDate = date.getTime();
  };

  private onPressNext = () => {
    const { monthSalary } = this.state;
    this.props.setUserInfo(
      parseInt(monthSalary, 10),
      this.joinDate,
      this.salaryDate,
      this.workStartDate,
      this.workEndDate
    );
  };

  render() {
    const {
      joinDate,
      salaryDate,
      monthSalary,
      workStartTime,
      workEndTime
    } = this.state;

    return (
      <View style={styles.container}>
        <BasicHeader />
        <ScrollIfSmallView>
          <View style={styles.body}>
            <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
              안녕하세요 🙌
            </SAText>
            <View style={styles.redContainer}>
              <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
                쥐꼬리만큼 얼마 되지않는
              </SAText>
              <View style={styles.redLine} />
            </View>
            <InfoTextInput
              placeholder="월급 실수령액"
              keyboardType="numeric"
              value={monthSalary}
              onChangeText={this.onMonthSalaryChange}
            />
            <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
              회사에 들어왔던 입사일
            </SAText>
            <DateInfoPikcer
              placeholder="00월 00일"
              onDateChange={this.onJoinDateChange}
              width={100}
              mode="datetime"
              format="MM월 DD일"
              date={joinDate}
              maxDate={new Date()}
            />
            <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
              이 세상에서 가장 행복한 월급일
            </SAText>
            <DateInfoPikcer
              placeholder="00일"
              onDateChange={this.onSalaryDateChange}
              width={100}
              mode="datetime"
              format="DD일"
              date={salaryDate}
            />
            <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
              마지막으로 출퇴근 시간
            </SAText>
            <DoubleInfoTextInput
              firstPlaceholder="00:00"
              secondPlaceholder="00:00"
              firstDate={workStartTime}
              secondDate={workEndTime}
              onFirstDateChange={this.onWorkStartTimeChange}
              onSecondDateChange={this.onWorkEndTimeChange}
            />
            <Image source={Images.img_4} style={styles.image} />
          </View>
        </ScrollIfSmallView>
        <View style={styles.bottomView}>
          <SAButton onPress={this.onPressNext}>
            <SAText style={[fontStyles.anton18Pt, styles.white]}>NEXT</SAText>
          </SAButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  text: {
    marginVertical: 4
  },
  body: {
    paddingHorizontal: 32,
    paddingTop: 40
  },
  redLine: {
    backgroundColor: "red",
    height: 4,
    width: 190,
    position: "absolute"
  },
  redContainer: {
    justifyContent: "center"
  },
  image: {
    width: deviceSizes.width,
    height: 68
  },
  bottomView: {
    backgroundColor: "black",
    width: deviceSizes.width,
    height: getBottomSpace() + 60,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 32
  },
  white: {
    color: "white"
  }
});
