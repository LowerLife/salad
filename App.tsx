import React from "react";
import RNKakaoLogins from "react-native-kakao-logins";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface State {
  isKakaoLogging: boolean;
  token: string;
}

interface Props {}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isKakaoLogging: false,
      token: "token has not fetched"
    };
  }

  // 카카오 로그인 시작.
  kakaoLogin() {
    console.log("   kakaoLogin   ");
    RNKakaoLogins.login((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("kakaoLogin", result);
    });
  }

  kakaoLogout() {
    console.log("   kakaoLogout   ");
    RNKakaoLogins.logout((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("kakaoLogout", result);
    });
  }

  // 로그인 후 내 프로필 가져오기.
  getProfile() {
    console.log("getKakaoProfile");
    RNKakaoLogins.getProfile((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("getKakaoProfile", result);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => this.kakaoLogin()}
            activeOpacity={0.5}
          >
            <Text>LOGIN</Text>
          </TouchableOpacity>
          <Text>{this.state.token}</Text>
          <TouchableOpacity onPress={() => this.kakaoLogout()}>
            <Text>LOGOUT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getProfile()}>
            <Text>GETPROFILE</Text>
          </TouchableOpacity>
        </View>
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
