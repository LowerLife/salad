import React, { Component } from "react";
import { Provider } from "mobx-react";
import stores from "./src/stores/";
import MainScreen from "./src/screens/SplashScreen";

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <MainScreen />
      </Provider>
    );
  }
}

export default App;
