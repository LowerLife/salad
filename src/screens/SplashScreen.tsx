import React from "react";
import Splash from "react-native-splash-screen";
import codePush, { DownloadProgress } from "react-native-code-push";
import { StyleSheet, View, Image } from "react-native";

import NavigatoinService from "../NavigatoinService";
import Images from "../../assets/images";
import { LocalStorage, USER } from "../utils/LocalStorage";
import { colors } from "../styles";
import { SAText } from "../components/customs";

interface IState {
  updateSyncText: string;
}

export default class SplashScreen extends React.Component<{}, IState> {
  state = {
    updateSyncText: "업데이트 체크중입니다"
  };

  componentDidMount = async () => {
    Splash.hide();
    const userInfoExist: Array<any> = await Promise.all([
      LocalStorage.getItem(USER),
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 3000);
      })
    ]);

    const onSyncStatusChange = (status: codePush.SyncStatus) => {
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          this.setState({ updateSyncText: "업데이트 체크중입니다" });
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.setState({
            updateSyncText: "업데이트를 다운로드하고 하고 있습니다"
          });
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          this.setState({
            updateSyncText: "업데이트를 설치 하고 있습니다"
          });
        case codePush.SyncStatus.UP_TO_DATE:
          this.setState({
            updateSyncText: "최신버전입니다 :D"
          });
          break;
      }
    };

    const onError = (error: any) => {
      this.setState({ updateSyncText: "An error occurred. " + error });
    };

    const onDownloadProgress = (downloadProgress: DownloadProgress) => {
      console.log(downloadProgress.receivedBytes);
    };

    await codePush.sync(
      {
        installMode: codePush.InstallMode.ON_NEXT_RESUME,
        minimumBackgroundDuration: 60 * 2
      },
      onSyncStatusChange,
      onDownloadProgress,
      onError
    );

    if (userInfoExist[0]) {
      NavigatoinService.push("WithoutIntro");
      return;
    }

    NavigatoinService.push("WithIntro");
  };

  public render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Images.gif_logo} />
        <SAText style={{ color: "white" }}>{this.state.updateSyncText}</SAText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center"
  },
  blackLine: {
    backgroundColor: "black",
    width: 46,
    height: 4,
    marginLeft: 34
  },
  logo: {
    width: 120,
    height: 120
  }
});
