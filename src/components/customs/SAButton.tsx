import React, { ReactNode } from "react";
import { TouchableHighlight, ViewStyle, RegisteredStyle } from "react-native";

interface IProps {
  style?:
    | RegisteredStyle<ViewStyle>
    | ViewStyle
    | Array<ViewStyle | RegisteredStyle<ViewStyle>>;
  children: ReactNode;
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
