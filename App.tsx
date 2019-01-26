import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "mobx-react";

import stores from "./src/stores";
import AppNavigator from "./src/navigators/AppNavigator";
import NavigatoinService from "./src/NavigatoinService";
import { LocalStorage, USER } from "./src/utils/LocalStorage";

class App extends Component {
  componentDidMount = async () => {
    SplashScreen.hide();
    const userInfoExist: Array<any> = await Promise.all([
      LocalStorage.getItem(USER),
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 3000);
      })
    ]);

    if (userInfoExist[0]) {
      NavigatoinService.push("WithoutIntro");
      return;
    }

    NavigatoinService.push("WithIntro");
  };

  render() {
    return (
      <Provider {...stores}>
        <AppNavigator ref={NavigatoinService.setTopLevelNavigator} />
      </Provider>
    );
  }
}

export default App;
