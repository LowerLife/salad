import { createStackNavigator } from "react-navigation";

import IntroScreen from "../screens/IntroScreen";
import InfoInputScreen from "../screens/InfoInputScreen";
import MainScreen from "../screens/MainScreen";

const WithIntroNavi = createStackNavigator(
  {
    WithIntro: IntroScreen,
    InfoInput: InfoInputScreen,
    Main: MainScreen
  },
  {
    headerMode: "none"
  }
);

export default WithIntroNavi;
