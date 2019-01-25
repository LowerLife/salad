import { Easing, Animated } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import SplashScreen from "../screens/SplashScreen";
import WithIntroNavi from "./WithIntroNavi";
import WithoutIntroNavi from "./WithoutIntroNavi";

const fadeIn = (duration: number = 300) => ({
  transitionSpec: {
    duration,
    easing: Easing.out(Easing.poly(2)),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: ({ position, scene }: any) => {
    const { index } = scene;
    const opacity = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [0, 1]
    });

    return { opacity };
  }
});

const AppNavigator = createStackNavigator(
  {
    Splash: SplashScreen,
    WithIntro: WithIntroNavi,
    WithoutIntro: WithoutIntroNavi
  },
  {
    headerMode: "none",
    transitionConfig: () => fadeIn(600),
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(AppNavigator);
