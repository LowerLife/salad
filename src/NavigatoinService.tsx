import {
  StackActions,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

type RouteName = "Splash" | "WithIntro" | "WithoutIntro" | "InfoInput" | "Main";

let navigator: any;

const setTopLevelNavigator = (navigatorRef: any) => {
  navigator = navigatorRef;
};

const push = (
  routeName: RouteName,
  params?: NavigationScreenProp<NavigationState>
) => {
  navigator.dispatch(
    StackActions.push({
      routeName,
      params
    })
  );
};

const pop = (n = 1) => {
  navigator.dispatch(StackActions.pop({ n }));
};

const replace = (
  routeName: RouteName,
  params?: NavigationScreenProp<NavigationState>
) => {
  navigator.dispatch(StackActions.replace({ routeName, params }));
};

export default {
  push,
  pop,
  replace,
  setTopLevelNavigator
};
