import React from "react";
import Swiper from "react-native-swiper";
import * as Progress from "react-native-progress";
import * as Animatable from "react-native-animatable";
import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { getBottomSpace } from "react-native-iphone-x-helper";

import NavigatoinService from "../NavigatoinService";
import Images from "../../assets/images";
import { SAText, SAButton } from "../components/customs";
import { fontStyles } from "../styles";
import { deviceSizes } from "../utils";

interface IState {
  progress: number;
  currentIndex: number;
}

export default class IntroScreen extends React.Component<{}, IState> {
  public state: IState = {
    progress: deviceSizes.width,
    currentIndex: 0
  };

  private onScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const {
      contentOffset: { x }
    } = nativeEvent;

    this.setState({ progress: deviceSizes.width + x });
  };

  private onPressStart = () => {
    NavigatoinService.replace("InfoInput");
  };

  private onIndexChanged = (index: number) => {
    this.setState({ currentIndex: index });
  };

  public render() {
    const { progress, currentIndex } = this.state;
    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: "never" }}>
        <Progress.Bar
          useNativeDriver
          progress={progress / (deviceSizes.width * 3)}
          width={deviceSizes.width}
          borderRadius={0}
          color="#1a191d"
          borderWidth={0}
          height={4}
        />
        <Swiper
          loop={false}
          showsPagination={false}
          onScroll={this.onScroll}
          scrollEventThrottle={100}
          onIndexChanged={this.onIndexChanged}
        >
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <SAText
                style={[
                  fontStyles.spoqahansans18PtB,
                  styles.greyText,
                  styles.text
                ]}
              >
                월급쟁이로 살기
              </SAText>
              <SAText style={[fontStyles.spoqahansans18PtB, styles.text]}>
                참 힘들죠?
              </SAText>
            </View>
            <Image source={Images.img_1} style={styles.image} />
          </View>

          <View style={styles.container}>
            <View style={styles.textContainer}>
              <SAText
                style={[
                  fontStyles.spoqahansans18PtB,
                  styles.greyText,
                  styles.text
                ]}
              >
                <SAText style={[fontStyles.spoqahansans18PtB, styles.text]}>
                  얼마 안되는 월급
                </SAText>
                으로
              </SAText>
              <SAText
                style={[
                  fontStyles.spoqahansans18PtB,
                  styles.text,
                  styles.greyText
                ]}
              >
                미래를 계획하다가 한숨이 나오지만
              </SAText>
            </View>
            <Image source={Images.img_2} style={styles.image} />
          </View>

          <View style={styles.container}>
            <View style={styles.textContainer}>
              <SAText
                style={[
                  fontStyles.spoqahansans18PtB,
                  styles.greyText,
                  styles.text
                ]}
              >
                우리랑 함께 조금 더 나은 인생을
              </SAText>
              <SAText style={[fontStyles.spoqahansans18PtB, styles.text]}>
                확인해 보는 건 어떤가요?
              </SAText>
            </View>
            <Image source={Images.img_3} style={styles.image} />
            {currentIndex === 2 && (
              <Animatable.View
                style={styles.bottomView}
                animation="fadeIn"
                duration={700}
              >
                {currentIndex === 2 && (
                  <SAButton onPress={this.onPressStart}>
                    <SAText style={[fontStyles.anton18Pt, styles.white]}>
                      START
                    </SAText>
                  </SAButton>
                )}
              </Animatable.View>
            )}
          </View>
        </Swiper>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  textContainer: {
    top: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    marginBottom: 10
  },
  greyText: { color: "#e9e9e9" },
  image: {
    width: deviceSizes.width,
    height: 214,
    position: "absolute",
    bottom: getBottomSpace() + 60
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
