import { createStackNavigator } from "react-navigation";

import MainScreen from "../screens/MainScreen";

export default createStackNavigator(
  {
    Main: MainScreen
  },
  {
    headerMode: "none"
  }
);
