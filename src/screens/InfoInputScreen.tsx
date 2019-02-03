import React from "react";
import * as Animatable from "react-native-animatable";
import { StyleSheet, View, Image, Keyboard } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { observer, inject } from "mobx-react";

import Images from "../../assets/images";
import NavigatoinService from "../NavigatoinService";
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
  keyboardHide: boolean;
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
    workStartTime: "10:00",
    workEndTime: "19:00",
    keyboardHide: true
  };

  private joinDate = new Date();
  private salaryDate = new Date();
  private workStartDate = 10;
  private workEndDate = 19;
  private keyboardDidShowListener: any = null;
  private keyboardDidHideListener: any = null;

  public componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  };

  private keyboardWillShow = () => {
    this.setState({ keyboardHide: false });
  };

  private keyboardDidHide = () => {
    this.setState({ keyboardHide: true });
  };

  public componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

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
    this.workStartDate = date.getHours();
  };

  private onWorkEndTimeChange = (dateStr: string, date: Date) => {
    this.setState({ workEndTime: dateStr });
    this.workEndDate = date.getHours();
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

    NavigatoinService.replace("Main");
  };

  private onTouchStart = () => {
    Keyboard.dismiss();
    this.setState({ keyboardHide: true });
  };

  public render() {
    const {
      joinDate,
      salaryDate,
      monthSalary,
      workStartTime,
      workEndTime,
      keyboardHide
    } = this.state;

    const allFilled =
      joinDate.length *
        salaryDate.length *
        monthSalary.length *
        workStartTime.length *
        workEndTime.length !==
      0;

    return (
      <View style={styles.container}>
        <BasicHeader />
        <ScrollIfSmallView>
          <View style={styles.body}>
            <View style={styles.withImage}>
              <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
                안녕하세요
              </SAText>
              <Image source={Images.ico_hand} style={styles.handImage} />
            </View>
            <View style={styles.redContainer}>
              <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
                쥐꼬리만큼 얼마 되지않는
              </SAText>
              <View style={styles.redLine} />
            </View>
            <InfoTextInput
              placeholder="월급 실수령액 (원)"
              keyboardType="numeric"
              value={monthSalary}
              onChangeText={this.onMonthSalaryChange}
            />
            <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
              회사에 들어왔던 입사일
            </SAText>
            <DateInfoPikcer
              placeholder="0000년 00월 00일"
              onDateChange={this.onJoinDateChange}
              width={200}
              mode="date"
              format="YYYY년 MM월 DD일"
              date={joinDate}
              maxDate={new Date()}
            />
            <SAText style={[fontStyles.spoqahansans16PtB, styles.text]}>
              이 세상에서 가장 행복한 월급일
            </SAText>
            <DateInfoPikcer
              placeholder="0000년 00월 00일"
              onDateChange={this.onSalaryDateChange}
              width={200}
              mode="date"
              format="YYYY년 MM월 DD일"
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
        {allFilled && (
          <Animatable.View
            style={styles.bottomView}
            animation="fadeIn"
            duration={1000}
          >
            <SAButton onPress={this.onPressNext}>
              <SAText style={[fontStyles.anton18Pt, styles.white]}>OK</SAText>
            </SAButton>
          </Animatable.View>
        )}
        {!keyboardHide && (
          <View style={styles.overlayView} onTouchStart={this.onTouchStart} />
        )}
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
    width: 144,
    height: 76,
    marginTop: 40,
    marginRight: 0,
    marginLeft: "auto"
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
  },
  withImage: {
    flexDirection: "row",
    alignItems: "center"
  },
  handImage: {
    width: 24,
    height: 21
  },
  overlayView: {
    backgroundColor: "rgba(49,49,49,0.5)",
    ...StyleSheet.absoluteFillObject
  }
});
