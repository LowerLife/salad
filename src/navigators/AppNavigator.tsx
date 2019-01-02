import React from "react";
import { Easing, Animated } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import NavigationService from "../NavigatoinService";
import SplashScreen from "../screens/SplashScreen";
import IntroScreen from "../screens/IntroScreen";

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
    InfoInput: IntroScreen
  },
  {
    headerMode: "none",
    transitionConfig: () => fadeIn(750),
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(AppNavigator);
