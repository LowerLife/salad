import React, { ReactChild } from "react";
import { TouchableHighlight, ViewStyle, StyleProp } from "react-native";

interface IProps {
  style?: StyleProp<ViewStyle>;
  children: ReactChild;
  underlayColor?: string;
  onPress: () => void;
}

export const SAButton: React.SFC<IProps> = ({
  style,
  children,
  underlayColor,
  onPress
}) => (
  <TouchableHighlight
    style={style}
    underlayColor={underlayColor}
    onPress={onPress}
  >
    {children}
  </TouchableHighlight>
);

SAButton.defaultProps = {
  underlayColor: "rgba(49,49,49,0.5)",
  style: {}
};
