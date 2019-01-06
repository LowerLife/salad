import React, { ReactChild } from "react";
import { TouchableHighlight, ViewStyle, StyleProp } from "react-native";

interface IProps {
  style?: StyleProp<ViewStyle>;
  children: ReactChild;
  underlayColor?: string;
  onPress: () => void;
}

export class SAButton extends React.PureComponent<IProps> {
  public static defaultProps = {
    underlayColor: "rgba(49,49,49,0.5)",
    style: {}
  };

  public render() {
    const { style, children, underlayColor, onPress } = this.props;
    return (
      <TouchableHighlight
        style={style}
        underlayColor={underlayColor}
        onPress={onPress}
      >
        {children}
      </TouchableHighlight>
    );
  }
}
