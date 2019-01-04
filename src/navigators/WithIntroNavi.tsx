import { createStackNavigator } from "react-navigation";

import IntroScreen from "../screens/IntroScreen";
import InfoInputScreen from "../screens/InfoInputScreen";

const WithIntroNavi = createStackNavigator(
  {
    WithIntro: IntroScreen,
    InfoInput: InfoInputScreen
  },
  {
    headerMode: "none"
  }
);

export default WithIntroNavi;
