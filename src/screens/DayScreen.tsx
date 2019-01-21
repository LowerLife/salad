import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

import Images from "../../assets/images";
import { BasicHeader } from "../components/headers";
import { SAText, SAButton } from "../components/customs";
import { colors, fontStyles } from "../styles";
import { deviceSizes } from "../utils";

export default class DayScreen extends React.Component<{}> {
  public componentDidMount = () => {};

  public render() {
    return (
      <View style={styles.container}>
        <BasicHeader textColor="white" />
        <View style={styles.body}>
          <View style={styles.topView}>
            <SAText style={[fontStyles.anton26Pt, { color: colors.white }]}>
              1 DAY
            </SAText>
            <SAText style={[fontStyles.anton14Pt, { color: colors.dark_grey }]}>
              HOURLY PAY
            </SAText>
          </View>
          <View style={styles.bottomAbsView}>
            <SAText
              style={[fontStyles.spoqahansans20PtB, { color: colors.white }]}
            >
              {"지옥의 회사에서 퇴근시간까지\n"}
              <SAText
                style={[fontStyles.spoqahansans20PtB, { color: colors.red }]}
              >
                {"1시간 40분"}
              </SAText>
              분 남았어요.
            </SAText>
            <SAText
              style={[
                fontStyles.anton28Pt,
                { color: colors.white, marginTop: 44 }
              ]}
            >
              24,000
            </SAText>
            <Image source={Images.img_day} style={styles.img} />
            <View style={styles.whiteLine} />
            <View style={styles.wonView}>
              <SAText
                style={[fontStyles.anton14Pt, { color: colors.dark_grey }]}
              >
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
    backgroundColor: colors.black,
    width: deviceSizes.width,
    height: deviceSizes.height
  },
  body: {
    paddingHorizontal: 32,
    flex: 1
  },
  topView: {
    marginTop: 41
  },
  bottomAbsView: {
    bottom: getBottomSpace() + 28,
    position: "absolute",
    paddingHorizontal: 32,
    width: deviceSizes.width
  },
  whiteLine: {
    backgroundColor: colors.white,
    width: deviceSizes.width - 64,
    height: 4
  },
  recommnedLine: {
    marginTop: 50
  },
  img: {
    position: "absolute",
    right: 59,
    top: 113.2
  },
  wonView: {
    alignItems: "flex-end",
    justifyContent: "center"
  }
});
