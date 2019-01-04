import React, { Component } from "react";
import { Provider } from "mobx-react";

import stores from "./src/stores/";
import AppNavigator from "./src/navigators/AppNavigator";
import NavigatoinService from "./src/NavigatoinService";

class App extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      NavigatoinService.push("WithIntro");
    }, 1500);
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
