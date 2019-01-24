import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

import Images from "../../assets/images";
import { SAText, SAButton } from "../components/customs";
import { colors, fontStyles } from "../styles";
import { deviceSizes } from "../utils";

interface IProps {
  money: number;
  salaryDayDiff: number;
}

export default class MonthScreen extends React.PureComponent<IProps> {
  public render() {
    const { money, salaryDayDiff } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.absRedView} />
        <View style={styles.body}>
          <View style={styles.topView}>
            <SAText style={[fontStyles.anton26Pt, { color: colors.white }]}>
              1 MONTH
            </SAText>
            <SAText style={[fontStyles.anton14Pt, { color: colors.grey }]}>
              HOURLY PAY
            </SAText>
          </View>
          <View style={styles.bottomAbsView}>
            <SAText style={[fontStyles.spoqahansans20PtB]}>
              {"조금만 더 참아요 월급날까지\n"}
              <SAText
                style={[fontStyles.spoqahansans20PtB, { color: colors.red }]}
              >
                {`${salaryDayDiff}일`}
              </SAText>
              남았어요.
            </SAText>
            <SAText style={[fontStyles.anton28Pt, { marginTop: 44 }]}>
              {money.toLocaleString()}
            </SAText>
            <View style={styles.blackLine} />
            <Image source={Images.img_month} style={styles.img} />
            <View style={styles.wonView}>
              <SAText style={[fontStyles.anton14Pt, { color: colors.grey }]}>
                WON
              </SAText>
            </View>

            <SAButton
              onPress={() => alert("해성이형 도와줘요!")}
              style={styles.recommnedLine}
            >
              <SAText
                style={[
                  fontStyles.spoqahansans12Pt,
                  { color: colors.dark_grey }
                ]}
              >
                현재 돈으로 구매할 수 있는건 스타벅스 아메리카노 입니다.
              </SAText>
            </SAButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: deviceSizes.width,
    height: deviceSizes.height
  },
  body: {
    paddingHorizontal: 32,
    flex: 1
  },
  topView: {
    marginTop: getStatusBarHeight(true) + 41
  },
  bottomAbsView: {
    bottom: getBottomSpace() + 28,
    position: "absolute",
    paddingHorizontal: 32,
    width: deviceSizes.width
  },
  blackLine: {
    backgroundColor: colors.black,
    width: deviceSizes.width - 64,
    height: 4
  },
  recommnedLine: {
    marginTop: 50
  },
  img: {
    position: "absolute",
    right: 59,
    top: 103
  },
  absRedView: {
    position: "absolute",
    width: deviceSizes.width,
    height: getStatusBarHeight(true) + 124,
    backgroundColor: colors.red
  },
  wonView: {
    alignItems: "flex-end",
    justifyContent: "center"
  }
});
